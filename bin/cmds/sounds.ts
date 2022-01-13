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

  for (let ii = 0; ii < champDirs.length; ii++) {
    queue.add(async () => {
      const cdir = champDirs[ii]

      // find all skin folders for each champion
      const skinDirPath = path.join(champDirPath, cdir, 'skins')

      await new Promise((resolve) => {
        fs.readdir(skinDirPath, (err, skinDirs) => {
          for (let jj = 0; jj < skinDirs.length; jj++) {
            const sdir = skinDirs[jj]
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
            exec(extractCmd, (extractErr) => {
              if (extractErr) console.error(`Could not run bnk-extract for ${outputPath}`)
              else console.log(`Extracted ${soundType} for ${cdir}@${sdir}`)

              // complete after last file is extracted
              if (jj === skinDirs.length - 1) {
                console.log(`Completed ${soundType} for ${cdir}`)
                resolve('completed')
              }
            })
          }
        })
      })
    })
  }
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
    console.log(`queued ${soundType} extraction`)
    queue.add(async () => await extractBnkContent({ inputDir, outputDir, region, soundType }))
  }

  await queue.onIdle()

  console.timeEnd('extract-sounds')
}

// TODO: switch this to use async read / write callbacks
export const generateSounds = async ({
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

  console.time('generate-sounds')

  // get all champion directories
  const inputDir = output || path.join(process.env.APP_HOME, 'output/extracted')
  const outputDir = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = fs.readdirSync(inputDir)

  createOrWipeDir(outputDir)

  // iterate over each champ directory
  for (const cdir of champDirs) {
    // iterate over sfx and vo directories
    for (let hh = 0; hh < soundTypes.length; hh++) {
      const soundType = soundTypes[hh]
      const skinDirPath = path.join(inputDir, cdir, soundType)

      queue.add(async () => {
        await new Promise((resolve) => {
          fs.readdir(skinDirPath, async (err, skinDirs) => {
            // iterate over each skin directory
            for (let ii = 0; ii < skinDirs.length; ii++) {
              const sdir = skinDirs[ii]
              const soundDirPath = path.join(skinDirPath, sdir)

              await createDirectory(`${outputDir}/${cdir}/${soundType}/${sdir}`)

              fs.readdir(soundDirPath, (err, soundDirs) => {
                let errorCount = 0

                // iterate over each sound directory i.e. 'Play_vo_Aatrox_AatroxE_onCast'
                for (let jj = 0; jj < soundDirs.length; jj++) {
                  const soundDir = soundDirs[jj]
                  const filesPath = path.join(soundDirPath, soundDir)

                  // contents can either be files or directories
                  fs.readdir(filesPath, async (err, files) => {
                    try {
                      // rename each voice line file
                      for (let kk = 0; kk < files.length; kk++) {
                        const fileName = files[kk]
                        const formattedName = formatVoiceLineFileName({ cdir, soundDir })
                        const newFileName = kk === 0 ? formattedName : `${formattedName}_${kk}`
                        const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                        await copyFile({ src: `${filesPath}/${fileName}`, dest: newFilePath })

                        if (
                          ii === skinDirs.length - 1 &&
                          jj === soundDirs.length - 1 &&
                          kk === files.length - 1
                        ) {
                          console.log(`Completed for ${cdir} - try`)
                          resolve('Completed')
                        }
                      }
                    } catch (err) {
                      // TODO: this does not extract all the sound files
                      // i.e. "output\extracted\aatrox\skin0\Play_vo_Aatrox_MoveOrder2DLong\416336519"
                      console.error(`Could not read ${filesPath}, determing if it is a file`)

                      fs.lstat(filesPath, async (statErr, stats) => {
                        if (stats.isFile()) {
                          const newFileName = `unknown_${errorCount++}`
                          const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                          await copyFile({ src: filesPath, dest: newFilePath })

                          if (ii === skinDirs.length - 1 && jj === soundDirs.length - 1) {
                            console.log(`Completed for ${cdir} - catch`)
                            resolve('Completed')
                          }
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        })
      })
    }
  }

  await queue.onIdle()

  console.log('DONE WITH GENERATION')

  console.timeEnd('generate-sounds')
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

const createDirectory = async (dir: string) => {
  await new Promise<void>((resolve) => {
    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) console.log(`Failed to create ${dir}`)
      else console.log(`Created ${dir}`)

      resolve()
    })
  })
}

const copyFile = async ({ src, dest }: { src: string; dest: string }) => {
  await new Promise<void>((resolve) => {
    fs.copyFile(src, dest, (err) => {
      if (err) console.error(`Failed to copy ${src} to ${dest}`)
      else console.log(`Copied ${dest}`)

      resolve()
    })
  })
}
