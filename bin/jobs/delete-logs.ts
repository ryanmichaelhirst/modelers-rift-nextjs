import { logger } from '@/lib/logger'
import fs from 'fs'
import path from 'path'

export const deleteLogs = async () => {
  const logs = await (
    await fs.promises.readdir('logs')
  ).filter((filename) => filename !== '.gitignore')

  for (const log of logs) {
    try {
      const file = path.join('logs', log)
      await fs.promises.rm(file)
      logger.info(`removed log @ ${file}`)
    } catch (err) {
      logger.info(`Failed to delete ${log}`)
    }
  }
}

export default deleteLogs
