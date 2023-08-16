import { logger } from '@/lib/logger'
// import { soundTypes } from 'bin/types'
import fs from 'fs'
import path from 'path'

const findFilesInFolder = async (folderPath: string): Promise<string[]> => {
  let fileList: string[] = []
  const items = await fs.promises.readdir(folderPath)

  // Map the items to an array of promises that resolve to file paths
  const promises = items.map(async (item) => {
    const itemPath = path.join(folderPath, item)

    // Check if item is a file
    const itemStat = await fs.promises.stat(itemPath)
    if (itemStat.isFile()) {
      fileList.push(itemPath)
    }
    // If item is a directory, recursively call this function
    else {
      const files = await findFilesInFolder(itemPath)
      fileList = fileList.concat(files)
    }
  })

  // Wait for all promises to resolve
  await Promise.all(promises)

  return fileList
}

const formatVoiceLineFileName = (filePath: string, champName: string, counter: number) => {
  // get all parts of the file path
  // given /output/ogg_audios/aatrox/vo/skin21/Play_vo_AatroxSkin21_Taunt3DGeneral/70443218.gg
  // returns ["output", "ogg_audios", "aatrox", .... "70443218.gg"]
  const fileParts = filePath.split('/')
  // the name of the sound will always be the second to last folder
  const item = fileParts.find((p) => p.includes('skin'))
  if (!item) return
  const nameIndex = fileParts.indexOf(item)
  if (!nameIndex) return

  const capitalizedChampName =
    champName.substring(0, 1).toUpperCase() + champName.substring(1).toLowerCase()

  const namedDir = fileParts[nameIndex + 1]
  let newFileName = namedDir
    .replace('Play_sfx_', '')
    .replace(`Play_vo_`, '')
    .replaceAll(capitalizedChampName, '')
    .replace(/Skin\d+/, '')
    .replace(/_/g, '')

  if (counter !== 0) {
    newFileName += ` ${counter}`
  }

  // get the path that contains /output/ogg_audios/aatrox/vo/skin21
  const startIndex = filePath.indexOf(namedDir)
  const outputPath = filePath.slice(0, startIndex)

  return outputPath + `${newFileName}.ogg`
}

export const renameOggFiles = async () => {
  // get all champion directories
  const inputDir = path.join(process.env.APP_HOME || '', 'output/ogg_audios')
  const champDirs = await fs.promises.readdir(inputDir)

  // iterate over each champ directory
  for (const cdir of champDirs) {
    const files = await findFilesInFolder(path.join(inputDir, cdir))
    // logger.info('list of files')
    // logger.debug(files)

    let counter = 0
    let directory = ''
    for (const filePath of files) {
      const fileParts = filePath.split('/')
      const currentDirectory = fileParts[fileParts.length - 2]
      if (directory !== currentDirectory) {
        counter = 0
      }
      if (directory === currentDirectory) {
        counter++
      }

      const formattedName = formatVoiceLineFileName(filePath, cdir, counter)
      if (!formattedName) continue

      logger.debug(formattedName)
      directory = currentDirectory
      // await fs.promises.rename(file, formattedName)
    }
  }
}

export default renameOggFiles
