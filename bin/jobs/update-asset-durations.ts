import { readAudioDirs } from './get-audio-durations'

export default async () => {
  await readAudioDirs(true)
}
