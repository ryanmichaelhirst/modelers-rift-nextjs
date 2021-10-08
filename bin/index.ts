import { Database } from '@leafac/sqlite'
import { exec, execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createUser, prisma, sampleUsers } from '../prisma/queries'

const queue = new PQueue({ concurrency: 30 })

const createDatabase = async () => {
  const dbPath = 'prisma/dev.db'

  try {
    // delete existing db
    fs.unlinkSync(dbPath)
  } catch (err) {
    console.error('error removing database, does not exist.')
  } finally {
    // create db
    new Database(dbPath)

    // apply prisma schema
    execSync('npx prisma migrate dev', { stdio: 'inherit' })

    // load user data
    for (let ii = 0; ii < sampleUsers.length; ii++) {
      try {
        console.log(await createUser(sampleUsers[ii]))
      } catch (err) {
        throw err
      }
    }
  }

  prisma.$disconnect()
}

const generateGlb = async () => {
  const gltfDir = path.join(__dirname, '..', '..', '..', '/league_raw_models')
  const outDir = path.join(__dirname, '..', '..', '..', '/league_react_models')

  console.log({
    gltfDir,
    outDir,
  })

  fs.readdir(gltfDir, (err, dirs) => {
    if (err) throw new Error('Could not get directory')

    dirs.forEach((champDir, idx) => {
      fs.readdir(`${gltfDir}/${champDir}`, (err, skinDirs) => {
        skinDirs.forEach((skinDir) => {
          fs.readdir(`${gltfDir}/${champDir}/${skinDir}`, (err, files) => {
            files.forEach((f) => {
              const filename = path.parse(f).name

              if (f.includes('.gltf')) {
                console.log({
                  idx,
                  champDir,
                  filename,
                  cmd: `gltf-pipeline -i ${gltfDir}/${champDir}/${skinDir}/${f} -o ${outDir}/${champDir}/${filename}.glb`,
                })

                execSync(
                  `gltf-pipeline -i ${gltfDir}/${champDir}/${skinDir}/${f} -o ${outDir}/${champDir}/${filename}.glb`,
                  {
                    stdio: 'inherit',
                  },
                )
              }
            })
          })
        })
      })
    })
  })
}

const generateJsx = async () => {
  const glbDir = path.join(__dirname, '../../../league_react_models')
  console.time('generate-jsx')

  try {
    const champDirs = fs.readdirSync(glbDir)

    for (const champDir of champDirs) {
      const files = fs.readdirSync(`${glbDir}/${champDir}`)

      if (!fs.existsSync(`client/src/components/${champDir}`)) {
        fs.mkdirSync(`client/src/components/${champDir}`)
      }

      for (const file of files) {
        const jsxFile = file.replace('glb', 'tsx')

        queue.add(async () => {
          await new Promise<void>((resolve) => {
            exec(`npx gltfjsx ${glbDir}/${champDir}/${file} -t`, async (err, stdout, stderr) => {
              console.log(`gltfjsx ${glbDir}/${champDir}/${file} -t > ${jsxFile}`)
              console.log(stdout)
              exec(
                `mv ${jsxFile} client/src/components/${champDir}/${jsxFile}`,
                async (err, stdout, stderr) => {
                  console.log(`mv ${jsxFile} client/src/components/${champDir}/${jsxFile} `)
                  resolve()
                },
              )
            })
          })
        })

        // pause when queue gets large
        if (queue.size >= 50) await new Promise((resolve) => setTimeout(resolve, 100))
      }

      await queue.onIdle()
      console.log(`queue size: ${queue.size}`)
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${glbDir}`)
  }

  console.timeEnd('generate-jsx')
}

const copyAssets = async () => {
  const assetDir = path.join(__dirname, '../../../league_react_models')

  try {
    const champDirs = fs.readdirSync(assetDir)
    let counter = 0

    for (const champDir of champDirs) {
      if (counter >= 5) break
      const files = fs.readdirSync(`${assetDir}/${champDir}`)

      for (const file of files) {
        if (file.includes('.glb')) {
          if (!fs.existsSync(`client/src/assets/${champDir}`)) {
            fs.mkdirSync(`client/src/assets/${champDir}`)
          }

          execSync(`cp ${assetDir}/${champDir}/${file} client/src/assets/${champDir}/${file}`)
        }
      }
      counter++
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${assetDir}`)
  }
}

const run = async () => {
  // Parse flags
  const argv = await yargs(hideBin(process.argv)).options({
    c: {
      type: 'string',
      alias: 'cmd',
      desc: 'Database command to execute',
      demandOption: 'Command is mandatory',
    },
  }).argv

  const command = argv.c

  switch (command) {
    case 'db':
      createDatabase()
      break
    case 'generate-glb':
      generateGlb()
      break
    case 'generate-jsx':
      generateJsx()
      break
    case 'copy-assets':
      copyAssets()
      break
    default:
      throw new Error('command not recognized')
  }
}

run()
