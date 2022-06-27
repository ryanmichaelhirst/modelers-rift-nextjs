import { GlassCard } from '@components/glass-card'
import { useAppContext } from '@context/index'
import { SET_CURRENT_AUDIO } from '@customtypes/index'
import type { Asset } from '@graphql/generated/types'
import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { getAssetDisplayName } from '../utils'

export const AssetPlayer: FC<{
  assets?: (Asset | null | undefined)[]
  durationEnabled?: boolean
  duration?: number
}> = ({ assets, duration, durationEnabled }) => {
  const [{ currentAudio }, dispatch] = useAppContext()
  const [audioEl, setAudioEl] = useState<HTMLAudioElement>()

  const isPlaying = audioEl && !audioEl.paused

  useEffect(() => {
    if (currentAudio) {
      // pause previous audio
      audioEl?.pause()
      fetch(currentAudio)
        .then((res) => {
          const htmlAudio = new Audio(res.url)
          htmlAudio.play()
          setAudioEl(htmlAudio)
        })
        .catch((err) => {
          console.debug(`failed to play sound ${err}`)
        })
    }
  }, [currentAudio])

  const onPrev = () => {
    if (!currentAudio || !assets) return

    const curIndex = assets.findIndex((s) => s?.url === currentAudio)
    const prevIndex = curIndex === assets.length - 1 ? 0 : curIndex - 1
    const prevSound = assets[prevIndex]
    if (!prevSound?.url) return

    dispatch({ type: SET_CURRENT_AUDIO, payload: prevSound.url })
  }

  const onNext = () => {
    if (!currentAudio || !assets) return

    const curIndex = assets.findIndex((s) => s?.url === currentAudio)
    const nextIndex = curIndex === assets.length - 1 ? 0 : curIndex + 1
    const nextSound = assets[nextIndex]
    if (!nextSound?.url) return

    dispatch({ type: SET_CURRENT_AUDIO, payload: nextSound.url })
  }

  const onPause = () => {
    audioEl?.pause()
  }

  const onPlay = () => {
    audioEl?.play()
  }

  return (
    <GlassCard>
      <div className='flex justify-center w-full truncate text-sunset-900 font-nunito'>
        {currentAudio ? getAssetDisplayName(currentAudio) : 'Pick an audio'}
      </div>
      {durationEnabled && (
        <div>
          <Slider aria-label='track-time' size='small' value={0} max={0} />
          <div className='flex justify-between'>
            {duration && <p>0</p>}
            {/* TODO: use date-fns here */}
            {duration && <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>}
          </div>
        </div>
      )}

      <div className='text-sunset-500 flex justify-center'>
        <SkipPrevious className='cursor-pointer mr-4 hover:text-sunset-900' onClick={onPrev} />
        {isPlaying ? (
          <PauseOutlined className='cursor-pointer mr-4 hover:text-sunset-900' onClick={onPause} />
        ) : (
          <PlayArrow className='cursor-pointer mr-4 hover:text-sunset-900' onClick={onPlay} />
        )}
        <SkipNext className='cursor-pointer mr-4 hover:text-sunset-900' onClick={onNext} />
      </div>
    </GlassCard>
  )
}
