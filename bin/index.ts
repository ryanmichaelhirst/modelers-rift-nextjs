import { Database } from '@leafac/sqlite'
import { execSync } from 'child_process'
import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { sampleUsers, createUser, prisma } from '../prisma/queries'

const createDatabase = async () => {
  const dbPath = 'prisma/dev.db'

  try {
    // delete existing db
    fs.unlinkSync(dbPath)
  } catch (err) {
    console.error('error removing database, does not exist.')
  } finally {
    // create db
    new Database(dbPath)

    // apply prisma schema
    execSync('npx prisma migrate dev', { stdio: 'inherit' })

    // load user data
    for (let ii = 0; ii < sampleUsers.length; ii++) {
      try {
        console.log(await createUser(sampleUsers[ii]))
      } catch (err) {
        throw err
      }
    }
  }

  prisma.$disconnect()
}

const run = async () => {
  // Parse flags
  const argv = await yargs(hideBin(process.argv)).options({
    c: {
      type: 'string',
      alias: 'cmd',
      desc: 'Database command to execute',
      demandOption: 'Command is mandatory',
    },
  }).argv

  const command = argv.c

  switch (command) {
    case 'db':
      createDatabase()
      break
    default:
      throw new Error('command not recognized')
  }
}

run()
