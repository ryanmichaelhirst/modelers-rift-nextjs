import { exec, execSync } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

dotenv.config()

type Sound = 'sfx' | 'vo'

const soundTypes = ['sfx', 'vo'] as Sound[]
const queue = new PQueue({ concurrency: 50 })

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
  const champDirs = fs.readdirSync(champDirPath)

  for (const cdir of champDirs) {
    if (cdir !== 'aatrox' && cdir !== 'ahri') continue

    queue.add(() => {
      // find all skin folders for each champion
      const skinDirPath = path.join(champDirPath, cdir, 'skins')
      const skinDirs = fs.readdirSync(skinDirPath)

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
        const bnkExe = path.join(process.env.APP_HOME, 'bin/executables/bnk-extract.exe')
        const extractCmd = `${bnkExe} --audio ${audioPath} --bin ${binPath} --events ${eventPath} -o ${outputPath} --oggs-only`

        // extract .ogg files from bnk sound files
        try {
          exec(extractCmd)
        } catch (err) {
          console.error(`Could not run bnk-extract for ${outputPath}`)
        }
      }

      console.log(`Extracted ${soundType} for ${cdir}`)
    })
  }

  await queue.onIdle()
}

const createOrWipeDir = (dirPath: string) => {
  const makeDirCmd = `mkdir -p ${dirPath}`

  try {
    // wipe directory if it exists
    fs.accessSync(dirPath)
    console.log(`${dirPath} exists so wiping it`)
    execSync(`rm -r ${dirPath}`)
  } catch (err) {
    // directory doesn't exist, create it
    console.log(`${dirPath} does not exist so creating it`)
  } finally {
    execSync(makeDirCmd)
  }
}

const extractSounds = async ({
  input,
  output,
  region = 'en_us',
}: {
  input?: string
  output?: string
  region?: string
}) => {
  console.time('extract-sounds')

  const inputDir = input || path.join(process.env.APP_HOME, 'input')
  const outputDir = output || path.join(process.env.APP_HOME, 'output/extracted')

  createOrWipeDir(outputDir)

  for (const soundType of soundTypes) {
    try {
      extractBnkContent({ inputDir, outputDir, region, soundType })
      console.log(`Finished extracting ${soundType} files`)
    } catch (err) {
      throw new Error(`Could not extract ${soundType} files`)
    }
  }

  console.timeEnd('extract-sounds')
}

// TODO: switch this to use async read / write callbacks
export const generateVoiceLines = async ({
  input,
  output,
  region,
}: {
  input?: string
  output?: string
  region?: string
}) => {
  // extract voice lines from extracted Obsidian assets
  await extractSounds({ input, output, region })

  console.time('generate-voice-lines')

  // get all champion directories
  const inputDir = output || path.join(process.env.APP_HOME, 'output/extracted')
  const outputDir = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = fs.readdirSync(inputDir)

  createOrWipeDir(outputDir)

  // iterate over each champion directory
  for (const cdir of champDirs) {
    // iterate over sfx and vo directories
    for (const soundType of soundTypes) {
      const skinDirPath = path.join(inputDir, cdir, soundType)
      const skinDirs = fs.readdirSync(skinDirPath)

      // iterate over each skin directory
      for (const sdir of skinDirs) {
        queue.add(() => {
          const soundDirPath = path.join(skinDirPath, sdir)
          const soundDirs = fs.readdirSync(soundDirPath)
          let errorCount = 0

          // iterate over each sound directory i.e. 'Play_vo_Aatrox_AatroxE_onCast'
          for (const soundDir of soundDirs) {
            const filesPath = path.join(soundDirPath, soundDir)
            const makeDirCmd = `mkdir -p ${outputDir}/${cdir}/${soundType}/${sdir}`

            // contents can either be files or directories
            try {
              const files = fs.readdirSync(filesPath)
              // rename each voice line file
              for (let ii = 0; ii < files.length; ii++) {
                const fileName = files[ii]
                const formattedName = formatVoiceLineFileName({ cdir, soundDir })
                const newFileName = ii === 0 ? formattedName : `${formattedName}_${ii}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`
                const copyCmd = `cp ${filesPath}/${fileName} ${newFilePath}`

                console.log(copyCmd)
                execSync(makeDirCmd)
                execSync(copyCmd)
              }
            } catch (err) {
              // TODO: this does not extract all the sound files
              // i.e. "output\extracted\aatrox\skin0\Play_vo_Aatrox_MoveOrder2DLong\416336519"
              console.error(`Could not read ${filesPath}, determing if it is a file`)
              const fileStat = fs.lstatSync(filesPath)
              const isFile = fileStat.isFile()

              if (isFile) {
                const newFileName = `unknown_${errorCount}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`
                const unknownCopyCmd = `cp ${filesPath} ${newFilePath}`

                console.log(unknownCopyCmd)
                execSync(makeDirCmd)
                execSync(unknownCopyCmd)
                errorCount++
              }
            }
          }
        })
      }

      if (queue.size >= 100) await new Promise((resolve) => resolve(100))
    }
  }

  await queue.onIdle()
  console.timeEnd('generate-voice-lines')
}

const formatVoiceLineFileName = ({ cdir, soundDir }: { cdir: string; soundDir: string }) => {
  const champName = cdir.charAt(0).toUpperCase() + cdir.substring(1, cdir.length)
  // converts 'Play_vo_ZyraSkin16_ZyraBasicAttack_cast3D' --> 'basic_attack_cast'
  // remove 'Play_vo_Zyra', 'SkinXX', and '3D' or '2D' or '_'

  var champRegex = new RegExp(champName, 'g')

  return soundDir
    .replace(`Play_vo_`, '')
    .replace(champRegex, '')
    .replace(/Skin\d+/, '')
    .replace(/3D|2D|_/g, '')
    .replace(/[A-Z]/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase(),
    )
}
