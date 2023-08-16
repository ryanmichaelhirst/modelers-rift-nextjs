import { logger } from '@/lib/logger'
import { BUCKET_NAME } from '@/lib/s3'
import { soundTypes } from '@/bin/types'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Average Runtime: 1449.12s
 */
export const uploadSounds = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/transformed')
  const champDirs = await fs.promises.readdir(inputDir)

  for (const champDir of champDirs) {
    for (const soundType of soundTypes) {
      const syncCmd = `aws s3 sync ${inputDir}/${champDir}/${soundType} s3://${BUCKET_NAME}/${soundType}/${champDir}`

      try {
        logger.info(syncCmd)
        const results = execSync(syncCmd)
        logger.info(results)
      } catch (err) {
        logger.info(err)
      }
    }
  }
}

export default uploadSounds
