import { Database } from '@leafac/sqlite'
import { deleteAllTableData } from '@utils/prisma'
import { execSync } from 'child_process'
import fs from 'fs'
import { logger } from 'logger/index'

class DbService {
  constructor() {}

  createDb = async ({ type }: { type: 'postgresql' | 'sqlite' }) => {
    try {
      if (type === 'sqlite') {
        const dbPath = 'prisma/dev.db'

        try {
          // delete existing db
          fs.unlinkSync(dbPath)
        } catch (err) {
          logger.info('error removing database, does not exist.')
        } finally {
          new Database(dbPath)
        }
      } else if (type === 'postgresql') {
      }

      // apply prisma schema
      execSync('npx prisma migrate dev --name init-db', { stdio: 'inherit' })
    } catch (err) {
      logger.info(`Error creating ${type} database`)
      logger.info(err)
    }
  }

  wipeDb = async () => {
    const result = await deleteAllTableData()
    logger.info(`Deleted db`)
    logger.info(result)
  }
}

export const dbService = new DbService()
