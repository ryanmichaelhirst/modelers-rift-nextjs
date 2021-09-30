import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { sampleUsers, createUser, prisma } from '../prisma/queries'

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

  fs.readdir(glbDir, (err, dirs) => {
    if (err) throw new Error('Could not get directory')

    dirs.forEach((champDir, dirIdx) => {
      if (dirIdx === 0) {
        fs.readdir(`${glbDir}/${champDir}`, (err, files) => {
          files.forEach((f, fIdx) => {
            if (fIdx < 4) {
              let jsxFile = f.substring(0, 1).toUpperCase() + f.substring(1)
              jsxFile = jsxFile.replace('glb', 'tsx')

              console.log(`gltfjsx ${glbDir}/${champDir}/${f} -t > ${jsxFile}`)
              execSync(`gltfjsx ${glbDir}/${champDir}/${f} -t`, {
                stdio: 'inherit',
              })
              execSync(`mv ${jsxFile} client/src/components/${champDir}/${jsxFile}`)
            }
          })
        })
      }
    })
  })
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
    default:
      throw new Error('command not recognized')
  }
}

run()
