import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { copyAssets, createDb, generateGlb, generateJsx } from './cmds'

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
    case 'create-db':
      createDb({ type: 'postgresql' })
      break
    case 'seed-db':
      break
    case 'generate-glb':
      generateGlb()
      break
    case 'generate-jsx':
      generateJsx()
      break
    case 'copy-assets':
      copyAssets()
      break
    default:
      throw new Error('command not recognized')
  }
}

run()
