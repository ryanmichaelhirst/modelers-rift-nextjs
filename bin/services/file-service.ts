import { logger } from '@/lib/logger'
import { exec, execSync } from 'child_process'
import fs from 'fs'

class FileService {
  constructor() {}

  createOrWipeDir = async (dirPath: string) => {
    await new Promise<void>(async (resolve, reject) => {
      const makeDirCmd = `mkdir -p ${dirPath}`

      try {
        // wipe directory if it exists
        await fs.promises.access(dirPath)
        logger.info(`rm -r ${dirPath}`)
        execSync(`rm -r ${dirPath}`)
      } catch (err) {
        // directory doesn't exist, create it
        logger.info(`[Failed] rm -r ${dirPath}`)
      } finally {
        exec(makeDirCmd, (err) => {
          if (err) {
            logger.info(`[Failed] ${makeDirCmd}`)
            reject()
          } else {
            resolve()
          }
        })
      }
    })
  }

  createDir = async (dir: string) => {
    try {
      await fs.promises.mkdir(dir, { recursive: true })
      logger.info(`mkdir ${dir}`)
    } catch (err) {
      logger.info(`[Failed] mkdir ${dir}`)
    }
  }

  copyFile = async ({ src, dest }: { src: string; dest: string }) => {
    try {
      await fs.promises.copyFile(src, dest)
      logger.info(`cp ${dest}`)
    } catch (err) {
      logger.info(`[Failed] cp ${src} ${dest}`)
    }
  }
}

export const fileService = new FileService()
