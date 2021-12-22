import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { createDb, generateGlb, generateJsx, seedAws, seedDb } from './cmds'
import { generateVoiceLines } from './cmds/sounds'

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
    case 'generate-voice-lines':
      generateVoiceLines({ input, output, region })
      break
    case 'copy-assets':
      throw new Error('copy-assets cmd is not deprecated. GLB files will be hosted on aws s3.')
    default:
      throw new Error('command not recognized')
  }
}

run()
