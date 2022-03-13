import { GlassCard } from '@components/glass-card'
import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION, SET_CURRENT_SOUND } from '@customtypes/index'
import type { Asset } from '@graphql/generated/types'
import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { getAssetDisplayName } from '../utils'

export const AssetPlayer: FC<{
  assetType: 'animation' | 'audio'
  assets?: (Asset | null | undefined)[]
  durationEnabled?: boolean
  duration?: number
  placeholder: string
}> = ({ assetType, assets, duration, durationEnabled, placeholder }) => {
  const [{ currentSound, currentAnimation, animations }, dispatch] = useAppContext()
  const [audioEl, setAudioEl] = useState<HTMLAudioElement>()

  const asset = assetType === 'animation' ? currentAnimation : currentSound
  const isPlaying = audioEl && !audioEl.paused

  useEffect(() => {
    if (currentSound) {
      // pause previous audio
      audioEl?.pause()
      fetch(`/api/audio/${currentSound}`)
        .then((res) => {
          const htmlAudio = new Audio(res.url)
          htmlAudio.play()
          setAudioEl(htmlAudio)
        })
        .catch((err) => {
          console.debug(`failed to play sound ${err}`)
        })
    }
  }, [currentSound])

  const onPrevAnimation = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === currentAnimation)
    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  const onPrevAudio = () => {
    if (!asset || !assets) return

    const curIndex = assets.findIndex((s) => s?.path === asset)
    const prevIndex = curIndex === assets.length - 1 ? 0 : curIndex - 1
    const prevSound = assets[prevIndex]
    if (!prevSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: prevSound.path })
  }

  const onPrev = () => {
    if (assetType === 'animation') onPrevAnimation()
    if (assetType === 'audio') onPrevAudio()
  }

  const onNextAnimation = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === currentAnimation)
    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  const onNextAudio = () => {
    if (!asset || !assets) return

    const curIndex = assets.findIndex((s) => s?.path === asset)
    const nextIndex = curIndex === assets.length - 1 ? 0 : curIndex + 1
    const nextSound = assets[nextIndex]
    if (!nextSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: nextSound.path })
  }

  const onNext = () => {
    if (assetType === 'animation') onNextAnimation()
    if (assetType === 'audio') onNextAudio()
  }

  const onPause = () => {
    if (assetType !== 'audio') return
    audioEl?.pause()
  }

  const onPlay = () => {
    if (assetType !== 'audio') return
    audioEl?.play()
  }

  return (
    <GlassCard>
      <div className='flex justify-center w-full truncate text-sunset-900 font-nunito'>
        {asset ? getAssetDisplayName(asset) : placeholder}
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
