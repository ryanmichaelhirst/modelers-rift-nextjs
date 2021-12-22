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
  const inputDir = input || path.resolve(process.env.APP_HOME, 'input')
  const outputDir = output || path.resolve(process.env.APP_HOME, 'output')

  try {
    const champDirPath = path.join(inputDir, `assets/sounds/wwise2016/vo/${region}/characters`)
    const champDirs = fs.readdirSync(champDirPath)

    for (const cdir of champDirs) {
      const skinDirPath = path.join(champDirPath, cdir, 'skins')
      const skinDirs = fs.readdirSync(skinDirPath)

      for (const sdir of skinDirs) {
        const filesPath = path.join(skinDirPath, sdir)
        const files = fs.readdirSync(filesPath)
        console.log(files)
      }
    }
  } catch (err) {
    throw new Error('Could not get champion directories')
  }
}
