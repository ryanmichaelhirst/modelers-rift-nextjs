import { exec } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

const queue = new PQueue({ concurrency: 30 })

// TODO: update this to follow other pattern in cmds
export const generateGlb = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'input/export')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')

  console.time('generate-glb')

  try {
    const champDirs = fs.readdirSync(inputDir)

    for (const cdir of champDirs) {
      fs.readdir(`${inputDir}/${cdir}`, async (err, skinDirs) => {
        for (const sdir of skinDirs) {
          fs.readdir(`${inputDir}/${cdir}/${sdir}`, async (err, files) => {
            queue.add(async () => {
              await new Promise<void>((resolve) => {
                for (let ii = 0; ii < files.length; ii++) {
                  const file = files[ii]
                  const filename = path.parse(file).name
                  const glbCmd = `npx gltf-pipeline -i ${inputDir}/${cdir}/${sdir}/${file} -o ${outputDir}/${cdir}/${filename}.glb`
                  const compressCmd = `npx gltfpack -i ${outputDir}/${cdir}/${filename}.glb -o ${outputDir}/${cdir}/${filename}.glb`

                  if (!file.includes('.gltf')) continue

                  exec(`${glbCmd}; ${compressCmd}`, (err) => {
                    if (err) console.error(err.message)
                    else console.log(`Completed ${compressCmd}`)

                    resolve()
                  })
                }
              })
            })
          })
        }
      })
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${outputDir}`)
  }

  await queue.onIdle()

  console.timeEnd('generate-glb')
}
