import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import { prisma } from '../../prisma/queries/index'
import { BUCKET_NAME, getAwsChampionObject, s3 } from '../../server/aws'
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

export const seedDb = async ({ readDir }: { readDir: string }) => {
  console.time('seed-db')
  const inputDir = path.join(process.env.APP_HOME, 'output/glb_models')

  try {
    const champDirs = fs.readdirSync(inputDir)

    for (const champDir of champDirs) {
      queue.add(async () => {
        const { Contents } = await getAwsChampionObject({ name: champDir })

        await prisma.champion.create({
          data: {
            name: champDir,
            models: {
              create: Contents.map((c) => ({
                name: c.Key.split('/')[1],
                url: `https://${BUCKET_NAME}.s3.amazonaws.com/${c.Key}`,
              })),
            },
          },
        })
      })

      console.log(`inserted ${champDir} data`)
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${inputDir}`)
  }

  await queue.onIdle()

  console.log('successfully seeded prisma db')

  prisma.$disconnect()
  console.timeEnd('seed-db')
}

export const seedAws = async () => {
  console.time('seed-aws')

  // upload glb files
  await uploadModels()

  console.log('done with models')

  // upload sfx and vo files
  await uploadSounds()

  console.log('done with sounds')

  console.timeEnd('seed-aws')
}

const uploadModels = async () => {
  console.time('upload-models')
  const inputDir = path.join(process.env.APP_HOME, 'output/glb_models')
  const champDirs = fs.readdirSync(inputDir)

  for (const champDir of champDirs) {
    queue.add(async () => {
      await new Promise<void>((resolve) => {
        fs.readdir(`${inputDir}/${champDir}`, (filesErr, files) => {
          if (filesErr) resolve()

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
              } catch (uploadErr) {
                console.error(uploadErr)
              } finally {
                if (ii === files.length - 1) {
                  console.log(`uploaded ${champDir}/model files`)
                  resolve()
                }
              }
            })
          }
        })
      })
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
    for (const soundType of soundTypes) {
      queue.add(async () => {
        await new Promise<void>((resolve) => {
          fs.readdir(`${inputDir}/${champDir}/${soundType}`, (skinErr, skinDirs) => {
            if (skinErr || skinDirs.length === 0 || !skinDirs) resolve()

            for (let ii = 0; ii < skinDirs.length; ii++) {
              const skinDir = skinDirs[ii]

              fs.readdir(`${inputDir}/${champDir}/${soundType}/${skinDir}`, (fileErr, files) => {
                if (fileErr || files.length === 0 || !files) resolve()

                for (let jj = 0; jj < files.length; jj++) {
                  const file = files[jj]
                  const key = `${champDir}/${soundType}/${skinDir}/${file}`
                  const filePath = `${inputDir}/${key}`

                  fs.readFile(filePath, async (readErr, data) => {
                    if (readErr) return

                    try {
                      const command = new PutObjectCommand({
                        Bucket: BUCKET_NAME,
                        Body: data,
                        Key: key,
                      })
                      await s3.send(command)
                    } catch (uploadErr) {
                      console.error(uploadErr)
                    } finally {
                      if (ii === skinDirs.length - 1 && jj === files.length - 1) {
                        console.log(`uploaded ${champDir}/${soundType} files`)
                        resolve()
                      }
                    }
                  })
                }
              })
            }
          })
        })
      })
    }
  }

  await queue.onIdle()

  console.timeEnd('upload-sounds')
}
