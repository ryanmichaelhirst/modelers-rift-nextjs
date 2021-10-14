import { PutObjectCommand } from '@aws-sdk/client-s3'
import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import { prisma } from '../../prisma/queries/index'
import { BUCKET_NAME, getAwsChampionObject, s3 } from '../../server/aws'

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
  const glbDir = path.join(__dirname, '../../../../league_react_models')

  try {
    const champDirs = fs.readdirSync(glbDir)

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

      if (queue.size >= 100) new Promise((resolve) => setTimeout(resolve, 300))
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${glbDir}`)
  }

  await queue.onIdle()

  console.log('successfully seeded prisma db')

  prisma.$disconnect()
}

export const seedAws = async () => {
  const glbDir = path.join(__dirname, '../../../../league_react_models')

  try {
    const champDirs = fs.readdirSync(glbDir)

    for (const champDir of champDirs) {
      const files = fs.readdirSync(`${glbDir}/${champDir}`)

      for (const file of files) {
        queue.add(async () => {
          const data = fs.readFileSync(`${glbDir}/${champDir}/${file}`)
          console.log(`reading file ${glbDir}/${champDir}/${file}`)

          const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Body: data,
            Key: `${champDir}/${file}`,
          })

          const response = await s3.send(command)
          console.log(`uploaded ${champDir}/${file} to S3`, response)
        })
      }

      if (queue.size >= 100) await new Promise((resolve) => setTimeout(resolve, 100))
    }

    await queue.onIdle()
  } catch (err) {
    throw new Error(`Couldn't complete upload to aws s3`)
  }
}
