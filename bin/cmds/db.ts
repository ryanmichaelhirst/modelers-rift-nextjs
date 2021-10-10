import { ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import PQueue from 'p-queue'
import path from 'path'
import { prisma } from '../../prisma/queries/index'

const queue = new PQueue({ concurrency: 30 })
const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

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
  const data = []
  let counter = true

  try {
    const champDirs = fs.readdirSync(glbDir)

    for (const champDir of champDirs) {
      if (!counter) continue

      const command = new ListObjectsV2Command({
        Bucket: 'league-glb-models',
        Prefix: `${champDir}`,
      })

      const response = await s3.send(command)
      console.log(response)

      data.push({ name: champDir })
      counter = false
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${glbDir}`)
  }

  return

  await prisma.champion.createMany({
    data,
  })

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
            Bucket: 'league-glb-models',
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
