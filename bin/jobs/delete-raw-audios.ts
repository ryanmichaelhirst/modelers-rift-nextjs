import fs from 'fs'
import path from 'path'

const deleteFolderRecursive = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function (file, index) {
      const curPath = path.join(dirPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // recursive
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(dirPath)
  }
}

export const deleteRawAudios = async () => {
  const outputDir = path.join(process.env.APP_HOME || '', 'output/ogg_audios')
  const championDirs = await fs.promises.readdir(outputDir)

  for (const dir of championDirs) {
    deleteFolderRecursive(dir)
  }
}

export default deleteRawAudios
