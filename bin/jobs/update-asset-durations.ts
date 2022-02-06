import { format } from 'date-fns'
import { readAudioDirs } from './get-audio-durations'

export default async () => {
  console.time('update-asset-durations')
  const timestamp = format(new Date(), 'yyyyMMdd_hhmmss_aaa')
  const logFile = `logs/update_asset_durations_${timestamp}.txt`
  await readAudioDirs({ logFile, updateDb: true })
  console.timeEnd('update-asset-durations')
}
