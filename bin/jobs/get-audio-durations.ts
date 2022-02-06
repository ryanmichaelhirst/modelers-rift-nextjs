import { format } from 'date-fns'
import fs from 'fs'
import { getAudioDurationInSeconds } from 'get-audio-duration'
import PQueue from 'p-queue'
import path from 'path'
import { prisma } from '../../prisma/utils'
import { soundTypes } from '../cmds/sounds'
import { logToFile } from '../utils/job-helpers'

const getDuration = async ({
  jj,
  files,
  skinDirPath,
  inputDirPath,
  logFile,
}: {
  jj: number
  files: string[]
  inputDirPath: string
  skinDirPath: string
  logFile: string
}) => {
  const fileName = files[jj]
  const filePath = path.join(skinDirPath, fileName)

  // must wrap in function to match duration with correct filePath
  const duration = await getAudioDurationInSeconds(filePath)
  logToFile({ log: `${filePath}: ${duration}`, filePath: logFile })

  return {
    path: filePath.replace(`${inputDirPath}/`, ''),
    duration,
  }
}

interface DurationResult {
  path: string
  duration: number
}

// TODO: update all bin cmds to follow the fs.promises pattern
export const readAudioDirs = async ({
  logFile,
  updateDb = false,
}: {
  logFile: string
  updateDb?: boolean
}) => {
  const queue = new PQueue({ concurrency: 50 })
  const results: DurationResult[] = []

  const inputDirPath = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = await fs.promises.readdir(inputDirPath)

  // iterate over each champ directory
  for (const champDir of champDirs) {
    if (champDir !== 'aatrox') continue

    // iterate over sfx and vo directories
    for (let hh = 0; hh < soundTypes.length; hh++) {
      const audioType = soundTypes[hh]
      const audioDirPath = path.join(inputDirPath, champDir, audioType)

      queue.add(async () => {
        const skinDirs = await fs.promises.readdir(audioDirPath)

        for (let ii = 0; ii < skinDirs.length; ii++) {
          const skinDir = skinDirs[ii]
          const skinDirPath = path.join(audioDirPath, skinDir)

          const files = await fs.promises.readdir(skinDirPath)

          for (let jj = 0; jj < files.length; jj++) {
            const result = await getDuration({ jj, files, logFile, skinDirPath, inputDirPath })
            results.push(result)
          }
        }
      })
    }

    await queue.onIdle()
  }

  console.log(`r - ${results.length}`)
  console.log(results)

  // update assets in prisma
  if (updateDb) {
    const updates = results.map((dr) =>
      prisma.asset.update({
        where: {
          path: dr.path,
        },
        data: {
          duration: dr.duration,
        },
      }),
    )
    console.log(`u - ${updates.length}`)
    await prisma.$transaction(updates)
  }
}

export default async () => {
  console.time('get-audio-durations')
  const timestamp = format(new Date(), 'yyyyMMdd_hhmmss_aaa')
  const logFile = `logs/get_audio_durations_${timestamp}.txt`
  await readAudioDirs({ logFile })
  console.timeEnd('get-audio-durations')
}
