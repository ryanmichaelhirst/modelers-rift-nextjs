import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { prisma } from '../../prisma/queries/index'

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

  try {
    const champDirs = fs.readdirSync(glbDir)

    for (const champDir of champDirs) {
      const files = fs.readdirSync(`${glbDir}/${champDir}`)

      data.push({ name: champDir })
      for (const file of files) {
        // queue.add(async () => {
        //   await new Promise<void>((resolve) => {
        //     exec(`npx gltfjsx ${glbDir}/${champDir}/${file} -t`, async (err, stdout, stderr) => {
        //       console.log(`gltfjsx ${glbDir}/${champDir}/${file} -t > ${jsxFile}`)
        //       console.log(stdout)
        //       exec(
        //         `mv ${jsxFile} client/src/components/${champDir}/${jsxFile}`,
        //         async (err, stdout, stderr) => {
        //           console.log(`mv ${jsxFile} client/src/components/${champDir}/${jsxFile} `)
        //           resolve()
        //         },
        //       )
        //     })
        //   })
        // })
      }
    }
  } catch (err) {
    throw new Error(`Could not read directory @ ${glbDir}`)
  }

  await prisma.champion.createMany({
    data,
  })

  prisma.$disconnect()
}
