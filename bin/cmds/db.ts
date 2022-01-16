import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import { Asset, createAssets } from '../../prisma/queries/index'
import { BUCKET_NAME, s3 } from '../../server/aws'
import { soundTypes } from './sounds'

const queue = new PQueue({ concurrency: 30 })

export const createDb = async ({ type }: { type: 'postgresql' | 'sqlite' }) => {
  if (type === 'sqlite') {
    const dbPath = 'prisma/dev.db'

    try {
      // delete existing db
      fs.unlinkSync(dbPath)
    } catch (err) {
      console.error('error removing database, does not exist.')
    } finally {
      new Database(dbPath)
    }
  } else if (type === 'postgresql') {
  }

  // apply prisma schema
  execSync('npx prisma migrate dev --name init-db', { stdio: 'inherit' })
}

export const seedDb = async () => {
  console.time('seed-db')

  // upload glb files
  await uploadModels()

  console.log('done with models')

  // upload sfx and vo files
  await uploadSounds()

  console.log('done with sounds')

  console.timeEnd('seed-db')
}

const uploadModels = async () => {
  console.time('upload-models')
  const inputDir = path.join(process.env.APP_HOME, 'output/glb_models')
  const champDirs = fs.readdirSync(inputDir)

  for (const champDir of champDirs) {
    if (champDir !== 'aatrox' && champDir !== 'ahri') continue

    // TODO: there is a bug, not all assets are being processed
    // fs.readFile() callback not completing for every file
    queue.add(async () => {
      // upload to s3
      const assets = await new Promise<Asset[]>((resolve) => {
        fs.readdir(`${inputDir}/${champDir}`, async (filesErr, files) => {
          if (filesErr) resolve([])

          const results = []

          for (let ii = 0; ii < files.length; ii++) {
            const file = files[ii]
            const filePath = `${inputDir}/${champDir}/${file}`
            const fileName = path.basename(filePath, '.glb')
            const key = `${champDir}/model/${fileName}/default.glb`

            fs.readFile(filePath, async (readErr, data) => {
              if (readErr) return

              try {
                const command = new PutObjectCommand({
                  Bucket: BUCKET_NAME,
                  Body: data,
                  Key: key,
                })
                await s3.send(command)

                results.push({
                  type: 'model',
                  name: fileName,
                  skin: fileName,
                  path: key,
                })
              } catch (uploadErr) {
                console.error(uploadErr)
              } finally {
                if (ii === files.length - 1) {
                  console.log(`uploaded ${champDir}/model files`)
                  resolve(results)
                }
              }
            })
          }
        })
      })

      // TODO: with this line aws s3 errors no longer show? ("can't read byte length")
      // add to db
      await createAssets({ championName: champDir, assets })
    })
  }

  await queue.onIdle()

  console.timeEnd('upload-models')
}

const uploadSounds = async () => {
  console.time('upload-sounds')
  const inputDir = path.join(process.env.APP_HOME, 'output/generated')
  const champDirs = fs.readdirSync(inputDir)

  for (const champDir of champDirs) {
    if (champDir !== 'aatrox' && champDir !== 'ahri') continue

    for (const soundType of soundTypes) {
      // TODO: there is a bug, not all assets are being processed
      // fs.readFile() callback not completing for every file
      queue.add(async () => {
        // upload to s3
        const assets = await new Promise<Asset[]>((resolve) => {
          fs.readdir(`${inputDir}/${champDir}/${soundType}`, (skinErr, skinDirs) => {
            const results = []
            if (skinErr || skinDirs.length === 0 || !skinDirs) resolve(results)

            for (let ii = 0; ii < skinDirs.length; ii++) {
              const skinDir = skinDirs[ii]

              fs.readdir(`${inputDir}/${champDir}/${soundType}/${skinDir}`, (fileErr, files) => {
                if (fileErr || files.length === 0 || !files) resolve(results)

                for (let jj = 0; jj < files.length; jj++) {
                  const file = files[jj]
                  const key = `${champDir}/${soundType}/${skinDir}/${file}`
                  const filePath = `${inputDir}/${key}`
                  const fileName = path.basename(filePath, '.glb')

                  fs.readFile(filePath, async (readErr, data) => {
                    if (readErr) return

                    try {
                      const command = new PutObjectCommand({
                        Bucket: BUCKET_NAME,
                        Body: data,
                        Key: key,
                      })
                      await s3.send(command)
                      results.push({
                        type: soundType,
                        name: fileName,
                        skin: skinDir,
                        path: key,
                      })
                    } catch (uploadErr) {
                      console.error(uploadErr)
                    } finally {
                      if (ii === skinDirs.length - 1 && jj === files.length - 1) {
                        console.log(`uploaded ${champDir}/${soundType} files`)
                        resolve(results)
                      }
                    }
                  })
                }
              })
            }
          })
        })

        // TODO: with this line aws s3 errors no longer show? ("can't read byte length")
        // add to db
        await createAssets({ championName: champDir, assets })
      })
    }
  }

  await queue.onIdle()

  console.timeEnd('upload-sounds')
}
