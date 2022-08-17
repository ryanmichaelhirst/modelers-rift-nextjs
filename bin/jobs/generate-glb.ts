import { logger } from '@lib/logger'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

export const generateGlb = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'input/export')
  const outputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')

  try {
    const champDirs = await fs.promises.readdir(inputDir)

    for (const cdir of champDirs) {
      const skinDirs = await fs.promises.readdir(`${inputDir}/${cdir}`)

      for (const sdir of skinDirs) {
        const files = await fs.promises.readdir(`${inputDir}/${cdir}/${sdir}`)

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
          })
        }
      }
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${outputDir}`)
  }
}

export default generateGlb
