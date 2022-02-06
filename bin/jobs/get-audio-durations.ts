import { format } from 'date-fns'
import fs from 'fs'
import { getAudioDurationInSeconds } from 'get-audio-duration'
import PQueue from 'p-queue'
import path from 'path'
import { soundTypes } from '../cmds/sounds'
import { logToFile } from '../utils/job-helpers'

export const getDuration = async (filePath: string) => {
  return {
    filePath,
    duration: await getAudioDurationInSeconds(filePath),
  }
}

export default async () => {
  console.time('get-audio-durations')
  const timestamp = format(new Date(), 'yyyyMMdd_hhmmss_aaa')
  const logFile = `logs/get_audio_durations_${timestamp}.txt`
  const inputDir = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = fs.readdirSync(inputDir)
  const queue = new PQueue({ concurrency: 50 })

  // iterate over each champ directory
  for (const cdir of champDirs) {
    if (cdir !== 'aatrox') continue

    // iterate over sfx and vo directories
    for (let hh = 0; hh < soundTypes.length; hh++) {
      const soundType = soundTypes[hh]
      const soundDirPath = path.join(inputDir, cdir, soundType)

      queue.add(async () => {
        await new Promise<void>((resolve, reject) => {
          fs.readdir(soundDirPath, async (soundErr, skinDirs) => {
            if (soundErr) reject()

            for (let ii = 0; ii < skinDirs.length; ii++) {
              const lastSkinDir = skinDirs[skinDirs.length - 1]
              const skinDir = skinDirs[ii]
              const skinDirPath = path.join(soundDirPath, skinDir)

              fs.readdir(skinDirPath, async (fileErr, files) => {
                if (fileErr) reject()

                for (let jj = 0; jj < files.length; jj++) {
                  const fileName = files[jj]
                  const fPath = path.join(skinDirPath, fileName)
                  const lastFilePath = path.join(skinDirPath, files[files.length - 1])

                  // must wrap in function to match duration with correct filePath
                  const { filePath, duration } = await getDuration(fPath)
                  logToFile({ log: `${filePath}: ${duration}`, filePath: logFile })

                  if (skinDir === lastSkinDir && filePath === lastFilePath) {
                    console.log(`resolved @ ${cdir}, ${skinDir}, ${filePath}, ${lastFilePath}`)
                    resolve()
                  }
                }
              })
            }
          })
        })
      })
    }

    await queue.onIdle()
  }

  console.timeEnd('get-audio-durations')
}
