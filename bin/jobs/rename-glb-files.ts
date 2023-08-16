import { logger } from '@/lib/logger'
import fs from 'fs'
import path from 'path'

export const renameGlbFiles = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')
  const champDirs = await fs.promises.readdir(inputDir)

  for (const champDir of champDirs) {
    const champDirPath = path.join(inputDir, champDir)
    const filenames = await fs.promises.readdir(champDirPath)

    for (const currentFilename of filenames) {
      const newFilename = currentFilename.replace(/(^|\D)0+(?=\d)/, '$1') // replaces leading 0 with empty string
      const currentFilePath = path.join(champDirPath, currentFilename)
      const newFilePath = path.join(champDirPath, newFilename)
      const renameCmd = `mv ${currentFilePath} ${newFilePath}`
      logger.info(renameCmd)

      await fs.promises.rename(currentFilePath, newFilePath)
    }
  }
}

export default renameGlbFiles
