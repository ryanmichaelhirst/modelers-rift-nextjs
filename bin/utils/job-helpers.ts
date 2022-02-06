import { exec } from 'child_process'

export const logToFile = ({ log, filePath }: { log: string; filePath: string }) =>
  exec(`echo '${log}' >> ${filePath}`)
