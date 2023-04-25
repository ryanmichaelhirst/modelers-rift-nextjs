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
    process.stdout.write(formattedMsg)
    // allow the user to set the name of the logfile, if it isn't set manually set a generic name
    if (!this.fileStream) {
      this.setLogFile('runtime')
    }

    if (this.fileStream) {
      this.fileStream.write(formattedMsg)
    }
  }

  debug(message: any, error?: any) {
    const formattedMsg = util.inspect(message, false, null, true /* enable colors */)
    process.stdout.write(`${formattedMsg}\n`)

    this.fileStream?.write(formattedMsg)
  }
}

export const logger = new Logger()
