import { logger } from '@/lib/logger'
import type { Sound } from 'bin/types'
import { exec, execSync } from 'child_process'
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
  const queue = new PQueue({ concurrency: 10 })
  const region = 'en_us'

  // determine whether to read from "sfx" or "vo" directory
  const champDirPath =
    soundType === 'sfx'
      ? path.join(inputDir, `assets/sounds/wwise2016/${soundType}/characters`)
      : path.join(inputDir, `assets/sounds/wwise2016/${soundType}/${region}/characters`)

  // get champion directories i.e. "/aatrox", "/ahri", "/akali
  const champDirs = await fs.promises.readdir(champDirPath)

  for (const cdir of champDirs) {
    // get skin directories for each champion
    // i.e. "../sounds/wwise2016/sfx/characters/aatrox/skins/base", "../sounds/wwise2016/sfx/characters/aatrox/skins/skin01"
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
              logger.debug(`Could not run bnk-extract for ${outputPath}`)
              logger.debug(err.message)
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

  await queue.onIdle()
}

const createOrWipeDir = async (dirPath: string) => {
  await new Promise<void>(async (resolve, reject) => {
    const makeDirCmd = `mkdir -p ${dirPath}`

    try {
      // wipe directory if it exists
      await fs.promises.access(dirPath)
      logger.info(`rm -r ${dirPath}`)
      execSync(`rm -r ${dirPath}`)
    } catch (err) {
      // directory doesn't exist, create it
      logger.debug(`[Failed] rm -r ${dirPath}`, err)
    } finally {
      exec(makeDirCmd, (err) => {
        if (err) {
          logger.debug(`[Failed] ${makeDirCmd}`, err)
          reject()
        } else {
          logger.info(`[Succeeded] ${makeDirCmd}`)
          resolve()
        }
      })
    }
  })
}

// read extracted champion assets from WAD files from Obsidian
export const extractSounds = async () => {
  const inputDir = path.join(process.env.APP_HOME ?? '', 'input')
  const outputDir = path.join(process.env.APP_HOME ?? '', 'output/ogg_audios')

  await createOrWipeDir(outputDir)

  const queue = new PQueue({ concurrency: 2 })

  queue.add(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await extractBnkContent({ inputDir, outputDir, soundType: 'vo' })
        resolve()
      } catch (err) {
        logger.debug('Failed to schedule vo extraction', err)
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
        logger.debug('Failed to schedule sfx extraction', err)
        reject()
      }
    })
  })

  await queue.onIdle()
}

export default extractSounds
