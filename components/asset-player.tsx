import { GlassCard } from '@components/glass-card'
import { useAppContext } from '@context/index'
import { SET_CURRENT_AUDIO } from '@customtypes/index'
import type { Asset } from '@graphql/generated/types'
import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { getAssetDisplayName, uriToUrl } from '../utils'

const iconClass = classNames('cursor-pointer mr-4 opacity-50 hover:opacity-100')

export const AssetPlayer: FC<{
  className?: string
  assets?: (Asset | null | undefined)[]
  durationEnabled?: boolean
  duration?: number
}> = ({ className, assets, duration, durationEnabled }) => {
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

    const curIndex = assets.findIndex((s) => uriToUrl(s?.uri) === currentAudio)
    const prevIndex = curIndex === assets.length - 1 ? 0 : curIndex - 1
    const prevSound = assets[prevIndex]
    if (!prevSound?.uri) return

    dispatch({ type: SET_CURRENT_AUDIO, payload: uriToUrl(prevSound.uri) })
  }

  const onNext = () => {
    if (!currentAudio || !assets) return

    const curIndex = assets.findIndex((s) => uriToUrl(s?.uri) === currentAudio)
    const nextIndex = curIndex === assets.length - 1 ? 0 : curIndex + 1
    const nextSound = assets[nextIndex]
    if (!nextSound?.uri) return

    dispatch({ type: SET_CURRENT_AUDIO, payload: uriToUrl(nextSound.uri) })
  }

  const onPause = () => {
    audioEl?.pause()
  }

  const onPlay = () => {
    audioEl?.play()
  }

  return (
    <GlassCard className={className}>
      <div className='flex justify-center w-full truncate text-primary font-nunito'>
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

      <div className='text-primary flex justify-center'>
        <SkipPrevious className={iconClass} onClick={onPrev} />
        {isPlaying ? (
          <PauseOutlined className={iconClass} onClick={onPause} />
        ) : (
          <PlayArrow className={iconClass} onClick={onPlay} />
        )}
        <SkipNext className={iconClass} onClick={onNext} />
      </div>
    </GlassCard>
  )
}
