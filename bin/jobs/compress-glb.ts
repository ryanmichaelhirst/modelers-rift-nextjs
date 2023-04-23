import { logger } from '@/lib/logger'
import { exec } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'

// First run the rename-glb-files job, then run this job to compress the glb files
export const compressGlb = async () => {
  const sourceDir = path.join(process.env.APP_HOME || '', 'output/glb_models')
  const queue = new PQueue({ concurrency: 5 })

  try {
    const champDirs = await fs.promises.readdir(sourceDir)

    for (const cdir of champDirs) {
      const files = await fs.promises.readdir(`${sourceDir}/${cdir}`)

      for (const file of files) {
        const filename = path.parse(file).name
        const compressCmd = `npx gltfpack -i ${sourceDir}/${cdir}/${filename}.glb -o ${sourceDir}/${cdir}/${filename}.glb`

        if (!file.includes('.glb')) continue

        queue.add(() => {
          return new Promise<void>(async (resolve, reject) => {
            exec(compressCmd, (err) => {
              if (err) {
                logger.info(err.message)
                reject(err)
              } else {
                logger.info(compressCmd)
                resolve()
              }
            })
          })
        })
      }
    }

    await queue.onIdle()
  } catch (err) {
    throw new Error(`Could not read directory @ ${sourceDir}`)
  }
}

export default compressGlb
