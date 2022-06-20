import { exec, execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

type Sound = 'sfx' | 'vo'

export const soundTypes = ['sfx', 'vo'] as Sound[]
const queue = new PQueue({ concurrency: 10 })

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
    queue.add(async () => {
      await new Promise<void>(async (resolve) => {
        // find all skin folders for each champion
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
          exec(extractCmd, (extractErr) => {
            if (extractErr) console.error(`Could not run bnk-extract for ${outputPath}`)
            else console.log(extractCmd)

            resolve()
          })
        }
      })
    })
  }
}

const createOrWipeDir = async (dirPath: string) => {
  await new Promise<void>(async (resolve, reject) => {
    const makeDirCmd = `mkdir -p ${dirPath}`

    try {
      // wipe directory if it exists
      await fs.promises.access(dirPath)
      console.log(`${dirPath} exists so wiping it`)
      execSync(`rm -r ${dirPath}`)
    } catch (err) {
      // directory doesn't exist, create it
      console.log(`${dirPath} does not exist so creating it`)
    } finally {
      exec(makeDirCmd, (err) => {
        if (err) {
          console.log('Failed to wipe & create output directory')
          reject()
        } else resolve()
      })
    }
  })
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

  const inputDir = input || path.join(process.env.APP_HOME || '', 'input')
  const outputDir = output || path.join(process.env.APP_HOME || '', 'output/extracted')

  await createOrWipeDir(outputDir)

  for (const soundType of soundTypes) {
    console.log(`queued ${soundType} extraction`)
    queue.add(async () => await extractBnkContent({ inputDir, outputDir, region, soundType }))
  }

  await queue.onIdle()

  console.timeEnd('extract-sounds')
}

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
  const inputDir = output || path.join(process.env.APP_HOME || '', 'output/extracted')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/generated')
  const champDirs = await fs.promises.readdir(inputDir)

  await createOrWipeDir(outputDir)

  // iterate over each champ directory
  for (const cdir of champDirs) {
    // iterate over sfx and vo directories
    for (const soundType of soundTypes) {
      const skinDirPath = path.join(inputDir, cdir, soundType)

      queue.add(async () => {
        const skinDirs = await fs.promises.readdir(skinDirPath)

        for (const sdir of skinDirs) {
          const soundDirPath = path.join(skinDirPath, sdir)
          await createDirectory(`${outputDir}/${cdir}/${soundType}/${sdir}`)

          const soundDirs = await fs.promises.readdir(soundDirPath)
          let errorCount = 0

          for (const soundDir of soundDirs) {
            const filesPath = path.join(soundDirPath, soundDir)
            const files = await fs.promises.readdir(filesPath)

            try {
              // rename each voice line file
              for (let kk = 0; kk < files.length; kk++) {
                const fileName = files[kk]
                const formattedName = formatVoiceLineFileName({ cdir, soundDir })
                const newFileName = kk === 0 ? formattedName : `${formattedName}_${kk}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                await copyFile({ src: `${filesPath}/${fileName}`, dest: newFilePath })
              }
            } catch (err) {
              // TODO: this does not extract all the sound files
              // i.e. "output\extracted\aatrox\skin0\Play_vo_Aatrox_MoveOrder2DLong\416336519"
              console.error(`Could not read ${filesPath}, determing if it is a file`)

              const stats = await fs.promises.lstat(filesPath)
              if (stats.isFile()) {
                const newFileName = `unknown_${errorCount++}`
                const newFilePath = `${outputDir}/${cdir}/${soundType}/${sdir}/${newFileName}.ogg`

                await copyFile({ src: filesPath, dest: newFilePath })
              }
            }
          }
        }
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
  try {
    await fs.promises.mkdir(dir, { recursive: true })
    console.log(`Created ${dir}`)
  } catch (err) {
    console.log(`Failed to create ${dir}`)
  }
}

const copyFile = async ({ src, dest }: { src: string; dest: string }) => {
  try {
    await fs.promises.copyFile(src, dest)
    console.log(`Copied ${dest}`)
  } catch (err) {
    console.log(`Failed to copy ${src} to ${dest}`)
  }
}
