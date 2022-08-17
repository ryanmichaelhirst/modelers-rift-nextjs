import { logger } from '@lib/logger'
import { prismaService } from '@lib/prisma'
import { soundTypes } from 'bin/types'
import fs from 'fs'
import { getAudioDurationInSeconds } from 'get-audio-duration'
import PQueue from 'p-queue'
import path from 'path'

interface DurationResult {
  path: string
  duration: number
}

const getDuration = async ({
  jj,
  files,
  skinDirPath,
  inputDirPath,
}: {
  jj: number
  files: string[]
  inputDirPath: string
  skinDirPath: string
}) => {
  const fileName = files[jj]
  const filePath = path.join(skinDirPath, fileName)

  // must wrap in function to match duration with correct filePath
  const duration = await getAudioDurationInSeconds(filePath)
  logger.info(`Duration for ${filePath} is ${duration}`)

  return {
    path: filePath.replace(`${inputDirPath}/`, ''),
    duration,
  }
}

export const readAudioDirs = async (updateDb = false) => {
  const queue = new PQueue({ concurrency: 50 })
  const results: DurationResult[] = []

  const inputDirPath = path.join(process.env.APP_HOME || '', 'output/transformed')
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
            const result = await getDuration({ jj, files, skinDirPath, inputDirPath })
            results.push(result)
          }
        }
      })
    }

    await queue.onIdle()
  }

  logger.info(`Number of durations calculated ${results.length}`)

  // update assets in prisma
  if (updateDb) {
    const updates = results.map((dr) =>
      prismaService.client.asset.update({
        where: {
          // TODO: does this work?
          uri: dr.path,
        },
        data: {
          duration: dr.duration,
        },
      }),
    )
    logger.info(`Number of durations updated in db ${updates.length}`)
    await prismaService.client.$transaction(updates)
  }
}

export default async () => {
  await readAudioDirs()
}
