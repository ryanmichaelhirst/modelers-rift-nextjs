import Logger from 'bin/utils/logger'
import { exec } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

const queue = new PQueue({ concurrency: 10 })

// TODO: update this to follow other pattern in cmds
export const generateGlb = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'input/export')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')
  const logger = new Logger('generate_glb')

  console.time('generate-glb')

  try {
    const champDirs = await fs.promises.readdir(inputDir)

    for (const cdir of champDirs) {
      queue.add(async () => {
        const skinDirs = await fs.promises.readdir(`${inputDir}/${cdir}`)

        for (const sdir of skinDirs) {
          const files = await fs.promises.readdir(`${inputDir}/${cdir}/${sdir}`)

          await new Promise<void>((resolve) => {
            for (let ii = 0; ii < files.length; ii++) {
              const file = files[ii]
              const filename = path.parse(file).name
              const glbCmd = `npx gltf-pipeline -i ${inputDir}/${cdir}/${sdir}/${file} -o ${outputDir}/${cdir}/${filename}.glb`
              const compressCmd = `npx gltfpack -i ${outputDir}/${cdir}/${filename}.glb -o ${outputDir}/${cdir}/${filename}.glb`
              const cmd = `${glbCmd}; ${compressCmd}`
              if (!file.includes('.gltf')) continue

              exec(cmd, (err) => {
                if (err) logger.info(err.message)
                else logger.info(cmd)

                resolve()
              })
            }
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
