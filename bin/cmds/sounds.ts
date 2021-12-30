import { exec, execSync } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

dotenv.config()

const queue = new PQueue({ concurrency: 50 })

export const extractVoiceLines = async ({
  input,
  output,
  region = 'en_us',
}: {
  input?: string
  output?: string
  region?: string
}) => {
  console.time('extract-voice-lines')

  const inputDir = input || path.join(process.env.APP_HOME, 'input')
  const outputDir = output || path.join(process.env.APP_HOME, 'output/extracted')

  // create output directory if it doesn't exist, or wipe if it does exist
  // mkdir -p --> creates parent directories
  try {
    execSync(`mkdir -p ${outputDir}`)
  } catch (err) {
    try {
      console.error(`Ouput dir @ ${outputDir} already exists, wiping the directory`)
      execSync(`rm -r ${outputDir}`)
      execSync(`mkdir -p ${outputDir}`)
    } catch (e) {
      throw new Error(`Failed to wipe ${outputDir}`)
    }
  }

  try {
    // read extracted champion assets from WAD files from Obsidian
    const champDirPath = path.join(inputDir, `assets/sounds/wwise2016/vo/${region}/characters`)
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
            exec(
              `${execPath} --audio ${audioPath} --bin ${binPath} --events ${eventPath} -o ${outputPath} --oggs-only`,
            )
          } catch (err) {
            console.error(`Could not run bnk-extract for ${outputPath}`)
          }
        }

        console.log(`Extracted voice lines for ${cdir}`)
      })
    }

    // wait until queue empties before completing script
    await queue.onIdle()

    console.log('Finished extracting voice lines')
  } catch (err) {
    throw new Error('Could not find champion directories')
  }

  console.timeEnd('extract-voice-lines')
}

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
  await extractVoiceLines({ input, output, region })

  console.time('generate-voice-lines')

  // get all champion directories
  const inputDir = output || path.join(process.env.APP_HOME, 'output/extracted')
  const outputDir = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = fs.readdirSync(inputDir)

  // create output directory if it doesn't exist, or wipe if it does exist
  // mkdir -p --> creates parent directories
  try {
    execSync(`mkdir -p ${outputDir}`)
  } catch (err) {
    try {
      console.error(`Ouput dir @ ${outputDir} already exists, wiping the directory`)
      execSync(`rm -r ${outputDir}`)
      execSync(`mkdir -p ${outputDir}`)
    } catch (e) {
      throw new Error(`Failed to wipe ${outputDir}`)
    }
  }

  // iterate over each champion directory
  for (const cdir of champDirs) {
    const skinDirPath = path.join(inputDir, cdir)
    const skinDirs = fs.readdirSync(skinDirPath)

    if (cdir !== 'aatrox' && cdir !== 'ahri') continue

    // iterate over each skin directory
    for (const sdir of skinDirs) {
      const voiceLinePath = path.join(skinDirPath, sdir)
      const voiceLineDirs = fs.readdirSync(voiceLinePath)
      let errorCount = 0

      // iterate over voice lines
      // contents can either be files or directories
      for (const vdir of voiceLineDirs) {
        const filesPath = path.join(voiceLinePath, vdir)

        try {
          const files = fs.readdirSync(filesPath)
          // console.log(files)
          // rename each voice line file
          for (let ii = 0; ii < files.length; ii++) {
            const fileName = files[ii]
            const formattedName = formatVoiceLineFileName({ cdir, vdir })
            const newFileName = ii === 0 ? formattedName : `${formattedName}_${ii}`
            const newFilePath = `${outputDir}/${cdir}/${sdir}/${newFileName}.ogg`
            console.log(`cp ${filesPath}/${fileName} ${newFilePath}`)
            execSync(`mkdir -p output/generated/${cdir}/${sdir}`)
            execSync(`cp ${filesPath}/${fileName} ${newFilePath}`)
          }
        } catch (err) {
          console.error(`Could not read ${filesPath}, determing if it is a file`)
          const fileStat = fs.lstatSync(filesPath)
          const isFile = fileStat.isFile()

          if (isFile) {
            const newFileName = `unknown_${errorCount}`
            const newFilePath = `${outputDir}/${cdir}/${sdir}/${newFileName}.ogg`
            console.log(`cp ${filesPath} ${newFilePath}`)
            execSync(`mkdir -p output/generated/${cdir}/${sdir}`)
            execSync(`cp ${filesPath} ${newFilePath}`)
            errorCount++
          }
        }
      }
    }
  }

  console.timeEnd('generate-voice-lines')
}

const formatVoiceLineFileName = ({ cdir, vdir }: { cdir: string; vdir: string }) => {
  const champName = cdir.charAt(0).toUpperCase() + cdir.substring(1, cdir.length)
  // converts 'Play_vo_ZyraSkin16_ZyraBasicAttack_cast3D' --> 'basic_attack_cast'
  // remove 'Play_vo_Zyra', 'SkinXX', and '3D' or '2D' or '_'

  var champRegex = new RegExp(champName, 'g')

  return vdir
    .replace(`Play_vo_`, '')
    .replace(champRegex, '')
    .replace(/Skin\d+/, '')
    .replace(/3D|2D|_/g, '')
    .replace(/[A-Z]/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase(),
    )
}
