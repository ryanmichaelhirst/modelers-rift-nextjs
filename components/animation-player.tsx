import { GlassCard } from '@components/glass-card'
import { useAppContext } from '@context/index'
import { SET_CURRENT_ANIMATION } from '@customtypes/index'
import { PauseOutlined, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { FC } from 'react'
import { getAssetDisplayName } from '../utils'

export const AnimationPlayer: FC<{
  selectedAnimation: string
  animations: string[]
  durationEnabled?: boolean
  duration?: number
}> = ({ selectedAnimation, animations, duration, durationEnabled }) => {
  const [, dispatch] = useAppContext()

  const isPlaying = true
  const onPrev = () => {
    if (!selectedAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === selectedAnimation)
    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  const onNext = () => {
    if (!selectedAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === selectedAnimation)
    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  const onPause = () => {}

  const onPlay = () => {}

  return (
    <GlassCard>
      <div className='flex justify-center w-full truncate text-sunset-900 font-nunito'>
        {selectedAnimation ? getAssetDisplayName(selectedAnimation) : 'Pick an animation'}
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
