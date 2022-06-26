import { BUCKET_NAME } from '@lib/s3'
import { execSync } from 'child_process'
import fs from 'fs'
import { logger } from 'logger/index'
import path from 'path'

const getSkippedDirectories = (type?: 'rift' | 'tft') => {
  if (!type) return []
  if (type === 'rift') return ['tft', 'sru', 'slime', 'ha_ap', 'bw_', 'brush', 'sightward']
}

export const uploadModels = async (type?: 'rift' | 'tft') => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')

  const champDirs = await fs.promises.readdir(inputDir)
  const skippedDirectories = getSkippedDirectories(type)

  for (const champDir of champDirs) {
    if (type === 'tft') {
      if (!champDir.includes('tft')) continue
    } else if (type === 'rift') {
      if (skippedDirectories?.find((dir) => champDir.includes(dir))) continue
    }

    // const syncCmd = `aws s3 cp ${inputDir}/${champDir} s3://${BUCKET_NAME}/${champDir} --recursive --exclude '*' --include '*.glb'`
    const syncCmd = `aws s3 sync ${inputDir}/${champDir} s3://${BUCKET_NAME}/${champDir}/model`

    try {
      logger.info(syncCmd)
      const results = execSync(syncCmd)
      logger.info(results)
    } catch (err) {
      if (err) logger.info(err)
    }
  }
}

export default uploadModels
