import { execSync } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

dotenv.config()

const queue = new PQueue({ concurrency: 30 })

export const generateVoiceLines = async ({
  input,
  output,
  region = 'en_us',
}: {
  input?: string
  output?: string
  region?: string
}) => {
  const inputDir = input || path.join(process.env.APP_HOME, 'input')
  const outputDir = output || path.join(process.env.APP_HOME, 'output')

  try {
    const champDirPath = path.join(inputDir, `assets/sounds/wwise2016/vo/${region}/characters`)
    const champDirs = fs.readdirSync(champDirPath)

    for (const cdir of champDirs) {
      const skinDirPath = path.join(champDirPath, cdir, 'skins')
      const skinDirs = fs.readdirSync(skinDirPath)

      for (const sdir of skinDirs) {
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

        // console.log({ binPath, audioPath, eventPath })

        if (!cdir.includes('aatrox')) continue

        try {
          execSync(
            `${execPath} --audio ${audioPath} --bin ${binPath} --events ${eventPath} -o ${outputPath} --oggs-only`,
          )
        } catch (err) {
          throw new Error('Could not run bnk-extract')
        }
      }
    }
  } catch (err) {
    throw new Error('Could not get champion directories')
  }
}
