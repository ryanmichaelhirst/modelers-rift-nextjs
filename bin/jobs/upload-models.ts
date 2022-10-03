import { logger } from '@/lib/logger'
import { BUCKET_NAME } from '@/lib/s3'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

type UploadType = 'rift' | 'tft' | undefined

const miscDirs = [
  'brush',
  'bw_',
  'destroyed',
  'domination',
  'doom',
  'ha_',
  'heimert',
  'hexgate',
  'illaoiminion',
  'inhibitor',
  'nexus',
  'pet',
  'perk',
  'sightward',
  'slime',
  'sru',
  'tft',
  'tutorial',
]

export const uploadModels = async (type: UploadType = 'rift') => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')
  const champDirs = await fs.promises.readdir(inputDir)

  for (const champDir of champDirs) {
    if (champDir !== 'akali') continue

    if (type === 'tft') {
      if (!champDir.includes('tft')) continue
    } else if (type === 'rift') {
      const ignoreDir = miscDirs?.some((dir) => champDir.includes(dir))
      if (ignoreDir) continue
    }

    // const syncCmd = `aws s3 cp ${inputDir}/${champDir} s3://${BUCKET_NAME}/${champDir} --recursive --exclude '*' --include '*.glb'`
    const syncCmd = `aws s3 sync ${inputDir}/${champDir} s3://${BUCKET_NAME}/models/${champDir}`

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
