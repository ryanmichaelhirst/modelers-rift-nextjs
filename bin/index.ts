import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createDb, generateGlb, generateJsx, generateSounds, seedAws, seedDb } from './cmds'

dotenv.config()

const run = async () => {
  // Parse flags
  const argv = await yargs(hideBin(process.argv)).options({
    c: {
      type: 'string',
      alias: 'cmd',
      desc: 'Script command to execute',
      demandOption: 'Command is mandatory',
    },
    i: {
      type: 'string',
      alias: 'input',
      desc: 'Input directory to read files from',
    },
    o: {
      type: 'string',
      alias: 'output',
      desc: 'Output directory to write files to',
    },
    region: {
      type: 'string',
      alias: 'region',
      desc: 'Region for your Lol Client (i.e. en_us, ja_JP, etc etc)',
    },
  }).argv

  const { c: command, i: input, o: output, region } = argv

  switch (command) {
    case 'create-db':
      createDb({ type: 'postgresql' })
      break
    case 'seed-db':
      seedDb({ readDir: '' })
      break
    case 'seed-aws':
      seedAws()
      break
    case 'generate-glb':
      generateGlb()
      break
    case 'generate-jsx':
      generateJsx()
      break
    case 'generate-sounds':
      generateSounds({ input, output, region })
      break
    default:
      throw new Error('command not recognized')
  }
}

run()
