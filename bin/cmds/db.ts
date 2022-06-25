import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Database } from '@leafac/sqlite'
import { BUCKET_NAME, s3 } from '@lib/s3'
import type { Asset } from '@utils/prisma'
import { createAssets, deleteAllTableData } from '@utils/prisma'
import { execSync } from 'child_process'
import fs from 'fs'
import { logger } from 'logger/index'
import PQueue from 'p-queue'
import path from 'path'
import { soundTypes } from './sounds'

const queue = new PQueue({ concurrency: 30 })

export const createDb = async ({ type }: { type: 'postgresql' | 'sqlite' }) => {
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
}

export const wipeDb = async () => {
  const result = await deleteAllTableData()
  logger.info(result)
}

export const seedDb = async () => {
  // upload glb files
  await uploadModels()
  // upload sfx and vo files
  await uploadSounds()
}

const uploadModels = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/glb_models')
  const champDirs = await fs.promises.readdir(inputDir)

  for (const champDir of champDirs) {
    queue.add(async () => {
      // upload to s3
      const files = await fs.promises.readdir(`${inputDir}/${champDir}`)
      const assets: Asset[] = []

      for (let ii = 0; ii < files.length; ii++) {
        const file = files[ii]
        const filePath = `${inputDir}/${champDir}/${file}`
        const fileName = path.basename(filePath, '.glb')
        const key = `${champDir}/model/${fileName}.glb`

        const data = await fs.promises.readFile(filePath)

        try {
          const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Body: data,
            Key: key,
          })
          await s3.send(command)

          assets.push({
            type: 'model',
            name: fileName,
            skin: fileName,
            path: key,
          })
          logger.info(`Uploaded s3 object with key: ${key}`)
        } catch (uploadErr) {
          logger.info(uploadErr)
        }
      }

      // add to postgres
      await createAssets({ characterName: champDir, assets })
    })
  }

  await queue.onIdle()
}

const uploadSounds = async () => {
  const inputDir = path.join(process.env.APP_HOME || '', 'output/generated')
  const champDirs = await fs.promises.readdir(inputDir)

  for (const champDir of champDirs) {
    for (const soundType of soundTypes) {
      queue.add(async () => {
        // upload to s3
        try {
          const skinDirs = await fs.promises.readdir(`${inputDir}/${champDir}/${soundType}`)
          const assets = []

          for (let ii = 0; ii < skinDirs.length; ii++) {
            const skinDir = skinDirs[ii]

            try {
              const files = await fs.promises.readdir(
                `${inputDir}/${champDir}/${soundType}/${skinDir}`,
              )
              for (let jj = 0; jj < files.length; jj++) {
                const file = files[jj]
                const key = `${champDir}/${soundType}/${skinDir}/${file}`
                const filePath = `${inputDir}/${key}`
                const fileName = path.basename(filePath, '.glb')

                try {
                  const data = await fs.promises.readFile(filePath)
                  const command = new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Body: data,
                    Key: key,
                  })
                  await s3.send(command)
                  assets.push({
                    type: soundType,
                    name: fileName,
                    skin: skinDir,
                    path: key,
                  })
                } catch (uploadErr) {
                  logger.info(uploadErr)
                }
              }
            } catch (err) {
              logger.info(err)
            }
          }

          await createAssets({ characterName: champDir, assets })
        } catch (err) {
          logger.info(err)
        }
      })
    }
  }

  await queue.onIdle()
}
