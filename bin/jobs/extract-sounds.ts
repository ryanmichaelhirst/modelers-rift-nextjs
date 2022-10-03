import { logger } from '@/lib/logger'
import { fileService } from 'bin/services/file-service'
import type { Sound } from 'bin/types'
import { soundTypes } from 'bin/types'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const extractBnkContent = async ({
  inputDir,
  outputDir,
  region,
  soundType,
}: {
  inputDir: string
  outputDir: string
  region: string
  soundType: Sound
}) => {
  // read extracted champion assets from WAD files from Obsidian
  const champDirPath =
    soundType === 'sfx'
      ? path.join(inputDir, `assets/sounds/wwise2016/${soundType}/characters`)
      : path.join(inputDir, `assets/sounds/wwise2016/${soundType}/${region}/characters`)

  const champDirs = await fs.promises.readdir(champDirPath)

  for (const cdir of champDirs) {
    if (cdir !== 'aatrox') continue

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

      // extract .ogg files from bnk sound files
      try {
        execSync(extractCmd)
        logger.info(extractCmd)
      } catch (err) {
        logger.info(`Could not run bnk-extract for ${outputPath}`)
      }
    }
  }
}

export const extractSounds = async ({
  input,
  output,
  region = 'en_us',
}: {
  input?: string
  output?: string
  region?: string
}) => {
  const inputDir = input || path.join(process.env.APP_HOME || '', 'input')
  const outputDir = output || path.join(process.env.APP_HOME || '', 'output/extracted')

  await fileService.createOrWipeDir(outputDir)

  for (const soundType of soundTypes) {
    logger.info(`queued ${soundType} extraction`)
    await extractBnkContent({ inputDir, outputDir, region, soundType })
  }
}

export default extractSounds
