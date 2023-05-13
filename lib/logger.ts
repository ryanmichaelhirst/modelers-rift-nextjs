import chalk from 'chalk'
import { format } from 'date-fns'
import fs from 'fs'
import util from 'util'

class Logger {
  private fileStream: fs.WriteStream | undefined

  constructor() {}

  setLogFile(name: string) {
    const timestamp = format(new Date(), 'yyyyMMdd_hhmmss_aaa')
    const filename = `logs/${name}_${timestamp}.txt`

    this.fileStream = fs.createWriteStream(filename)
  }

  info(message: any) {
    const formattedMsg = `${util.format(message)}\n`
    const greenMsg = chalk.green(formattedMsg)
    process.stdout.write(greenMsg)

    this.fileStream?.write(formattedMsg)
  }

  debug(message: any, error?: any) {
    const formattedMsg = util.inspect(message, false, null, true /* enable colors */)
    const redMsg = chalk.red(formattedMsg)
    process.stdout.write(`${redMsg}\n`)

    if (error) {
      const errorMsg = chalk.red(error.toString())
      process.stdout.write(errorMsg)
      this.fileStream?.write(error.toString())
    }

    this.fileStream?.write(formattedMsg)
  }
}

export const logger = new Logger()
