import { logger } from '@/lib/logger'
import { fileService } from 'bin/services/file-service'
import { soundService } from 'bin/services/sound-service'
import { soundTypes } from 'bin/types'
import fs from 'fs'
import path from 'path'

export const transformSounds = async ({
  input,
  output,
  region,
}: {
  input?: string
  output?: string
  region?: string
}) => {
  // get all champion directories
  const inputDir = output || path.join(process.env.APP_HOME || '', 'output/extracted')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/transformed')
  const champDirs = await fs.promises.readdir(inputDir)

  await fileService.createOrWipeDir(outputDir)

  // iterate over each champ directory
  for (const cdir of champDirs) {
    // iterate over sfx and vo directories
    for (const soundType of soundTypes) {
      const skinDirPath = path.join(inputDir, cdir, soundType)
      const skinDirs = await fs.promises.readdir(skinDirPath)

      for (const sdir of skinDirs) {
        const soundDirPath = path.join(skinDirPath, sdir)
        await fileService.createDir(`${outputDir}/${cdir}/${soundType}/${sdir}`)

        try {
          const soundDirs = await fs.promises.readdir(soundDirPath)
          let errorCount = 0

          for (const soundDir of soundDirs) {
            const filesPath = path.join(soundDirPath, soundDir)
            const files = await fs.promises.readdir(filesPath)

            try {
              // rename each voice line file
              for (let kk = 0; kk < files.length; kk++) {
                const fileName = files[kk]
                const formattedName = soundService.formatVoiceLineFileName({ cdir, soundDir })
                const newFileName = kk === 0 ? formattedName : `${formattedName}_${kk}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                await fileService.copyFile({ src: `${filesPath}/${fileName}`, dest: newFilePath })
              }
            } catch (err) {
              // TODO: this does not extract all the sound files
              // i.e. "output\extracted\aatrox\skin0\Play_vo_Aatrox_MoveOrder2DLong\416336519"
              logger.info(`Could not read ${filesPath}, determing if it is a file`)

              const stats = await fs.promises.lstat(filesPath)
              if (stats.isFile()) {
                const newFileName = `unknown_${errorCount++}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                await fileService.copyFile({ src: filesPath, dest: newFilePath })
              }
            }
          }
        } catch (err) {
          logger.info(`[Failed] readdir ${soundDirPath}`)
        }
      }
    }
  }

  logger.info('Finished generating sounds')
}

export default transformSounds
