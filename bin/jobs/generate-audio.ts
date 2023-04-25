// import deleteRawAudios from './delete-raw-audios'
import extractSounds from './extract-sounds'
import renameOggFiles from './rename-ogg-files'

export const generateAudio = async () => {
  await extractSounds()
  await renameOggFiles()
  // await deleteRawAudios()
}

export default generateAudio
