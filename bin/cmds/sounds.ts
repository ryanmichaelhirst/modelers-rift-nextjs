import { exec, execSync } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

dotenv.config()

const queue = new PQueue({ concurrency: 300 })

export const generateVoiceLines = async ({
  input,
  output,
  region = 'en_us',
}: {
  input?: string
  output?: string
  region?: string
}) => {
  console.time('generate-voice-lines')

  const inputDir = input || path.join(process.env.APP_HOME, 'input')
  const outputDir = output || path.join(process.env.APP_HOME, 'output')

  // create input directory if it doesn't exist
  try {
    execSync(`mkdir ${inputDir}`)
  } catch (err) {
    console.error(`Input dir @ ${inputDir} already exists`)
  }

  // create output directory if it doesn't exist, or wipe if it does exist
  try {
    execSync(`mkdir ${outputDir}`)
  } catch (err) {
    try {
      console.error(`Ouput dir @ ${inputDir} already exists, wiping the directory`)
      execSync(`rm -r ${outputDir}`)
      execSync(`mkdir ${outputDir}`)
    } catch (e) {
      throw new Error(`Failed to wipe ${outputDir}`)
    }
  }

  try {
    // read extracted champion assets from WAD files from Obsidian
    const champDirPath = path.join(inputDir, `assets/sounds/wwise2016/vo/${region}/characters`)
    const champDirs = fs.readdirSync(champDirPath)

    for (const cdir of champDirs) {
      // find all skin folders for each champion
      const skinDirPath = path.join(champDirPath, cdir, 'skins')
      const skinDirs = fs.readdirSync(skinDirPath)

      for (const sdir of skinDirs) {
        // get all sound files for each skin folder
        const filesPath = path.join(skinDirPath, sdir)
        const files = fs.readdirSync(filesPath)

        const execPath = path.join(process.env.APP_HOME, 'bin/executables/bnk-extract.exe')

        let binFile = sdir === 'base' ? 'skin0' : 'skin'

        // converts input/assets/characters/aatrox/skins/skin01 into skin1.bin
        if (sdir !== 'base') {
          const parts = sdir.split('skin')
          binFile += parts[1].replace(/^0+/, '')
        }

        const binPath = path.join(inputDir, 'data/characters/', cdir, `skins/${binFile}.bin`)
        const audioPath = path.join(filesPath, `${cdir}_${sdir}_vo_audio.wpk`)
        const eventPath = path.join(filesPath, `${cdir}_${sdir}_vo_events.bnk`)
        const outputPath = path.join(outputDir, cdir, binFile)

        // extract .ogg files from bnk sound files
        try {
          queue.add(() => {
            exec(
              `${execPath} --audio ${audioPath} --bin ${binPath} --events ${eventPath} -o ${outputPath} --oggs-only`,
            )
          })
        } catch (err) {
          console.error(`Could not run bnk-extract for ${outputPath}`)
        }
      }

      console.log(`Extracted voice lines for ${cdir}`)
    }

    // wait until queue empties before completing script
    await queue.onIdle()

    console.log('Finished extracting voice lines')
  } catch (err) {
    throw new Error('Could not find champion directories')
  }

  console.timeEnd('generate-voice-lines')
}
