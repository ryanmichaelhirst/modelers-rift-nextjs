import { format } from 'date-fns'
import fs from 'fs'

class Logger {
  private fileStream: fs.WriteStream

  constructor(filename: string) {
    this.fileStream = fs.createWriteStream(this.createLogFilename(filename))
  }

  createLogFilename(filename: string) {
    const timestamp = format(new Date(), 'yyyyMMdd_hhmmss_aaa')

    return `logs/${filename}_${timestamp}.txt`
  }

  info(message: string) {
    const formattedMsg = `${message}\n`
    process.stdout.write(formattedMsg)
    this.fileStream.write(formattedMsg)
  }
}

export default Logger
