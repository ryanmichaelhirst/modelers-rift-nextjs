import { exec } from 'child_process'

export const logToFile = ({ log, filePath }: { log: string; filePath: string }) => {
  process.stdout.write(`${log}\n`)
  exec(`echo '${log}' >> ${filePath}`)
}
