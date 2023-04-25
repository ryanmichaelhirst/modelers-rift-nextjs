import { logger } from '@/lib/logger'
import { fileService } from 'bin/services/file-service'
import type { Sound } from 'bin/types'
import { exec } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

const extractBnkContent = async ({
  inputDir,
  outputDir,
  soundType,
}: {
  inputDir: string
  outputDir: string
  soundType: Sound
}) => {
  const queue = new PQueue({ concurrency: 5 })

  const region = 'en_us'
  // read extracted champion assets from WAD files from Obsidian
  const champDirPath =
    soundType === 'sfx'
      ? path.join(inputDir, `assets/sounds/wwise2016/${soundType}/characters`)
      : path.join(inputDir, `assets/sounds/wwise2016/${soundType}/${region}/characters`)

  const champDirs = await fs.promises.readdir(champDirPath)

  for (const cdir of champDirs) {
    const skinDirPath = path.join(champDirPath, cdir, 'skins')
    const skinDirs = await fs.promises.readdir(skinDirPath)

    for (const sdir of skinDirs) {
      // get all sound files for each skin folder
      const filesPath = path.join(skinDirPath, sdir)
      let binFile = sdir === 'base' ? 'skin0' : 'skin'

      // converts input/assets/characters/aatrox/skins/skin01 into skin1.bin
      if (sdir !== 'base') {
        const parts = sdir.split('skin')
        binFile += parts[1].replace(/^0+/, '')
      }

      const binPath = path.join(inputDir, 'data/characters/', cdir, `skins/${binFile}.bin`)
      const audioPath =
        soundType === 'sfx'
          ? path.join(filesPath, `${cdir}_${sdir}_${soundType}_audio.bnk`)
          : path.join(filesPath, `${cdir}_${sdir}_${soundType}_audio.wpk`)
      const eventPath = path.join(filesPath, `${cdir}_${sdir}_${soundType}_events.bnk`)
      const outputPath = path.join(outputDir, cdir, soundType, binFile)
      const bnkExe = path.join(process.env.APP_HOME || '', 'bin/executables/bnk-extract.exe')
      const extractCmd = `${bnkExe} --audio ${audioPath} --bin ${binPath} --events ${eventPath} -o ${outputPath} --oggs-only`

      queue.add(() => {
        return new Promise<void>(async (resolve, reject) => {
          // extract .ogg files from bnk sound files
          exec(extractCmd, (err) => {
            if (err) {
              logger.info(`Could not run bnk-extract for ${outputPath}`)
              logger.info(err.message)
              reject(err)
            } else {
              logger.info(extractCmd)
              resolve()
            }
          })
        })
      })
    }
  }
}

export const extractSounds = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'input')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/ogg_audios')

  await fileService.createOrWipeDir(outputDir)

  const queue = new PQueue({ concurrency: 2 })

  queue.add(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await extractBnkContent({ inputDir, outputDir, soundType: 'vo' })
        resolve()
      } catch (err) {
        reject()
      }
    })
  })

  queue.add(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await extractBnkContent({ inputDir, outputDir, soundType: 'sfx' })
        resolve()
      } catch (err) {
        reject()
      }
    })
  })

  await queue.onIdle()
}

export default extractSounds
