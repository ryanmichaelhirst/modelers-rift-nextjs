import { GlassCard } from '@components/GlassCard'
import { Asset, SET_CURRENT_SOUND } from '@customtypes/index'
import { PauseCircleOutline, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useAppContext } from '../context'

export const AudioPlayer: FC<{ sounds?: Asset[] }> = ({ sounds }) => {
  const [{ currentSound }, dispatch] = useAppContext()
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const duration = sounds?.find((s) => s?.path === currentSound)?.duration

  const isPlaying = false

  useEffect(() => {
    if (currentSound) {
      // pause previous audio
      audio?.pause()
      fetch(`/api/getAudio/${currentSound}`)
        .then((res) => {
          const htmlAudio = new Audio(res.url)
          htmlAudio.play()
          setAudio(htmlAudio)
        })
        .catch((err) => {
          console.debug(`failed to play sound ${err}`)
        })
    }
  }, [currentSound])

  const onPrev = () => {
    if (!currentSound || !sounds) return

    const curIndex = sounds.findIndex((s) => s?.path === currentSound)
    if (!curIndex) return

    const prevIndex = curIndex === sounds.length - 1 ? 0 : curIndex - 1
    const prevSound = sounds[prevIndex]
    if (!prevSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: prevSound.path })
  }

  const onNext = () => {
    if (!currentSound || !sounds) return

    const curIndex = sounds.findIndex((s) => s?.path === currentSound)
    if (!curIndex) return

    const nextIndex = curIndex === sounds.length - 1 ? 0 : curIndex + 1
    const nextSound = sounds[nextIndex]
    if (!nextSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: nextSound.path })
  }

  console.log({ currentSound, duration })

  return (
    <GlassCard classes='text-white font-nunito'>
      <div className='flex justify-center mb-2'>Current sound</div>
      <div>
        <Slider aria-label='track-time' size='small' value={0} max={0} />
        <div className='flex justify-between'>
          {duration && <p>0</p>}
          {/* TODO: use date-fns here */}
          {duration && <p>{new Date(duration * 1000).toISOString().substr(14, 5)}</p>}
        </div>
      </div>

      <div className='flex justify-center'>
        <SkipPrevious className='cursor-pointer hover:text-gum-400' onClick={onPrev} />
        {isPlaying ? (
          <PauseCircleOutline className='cursor-pointer mx-4 hover:text-gum-400' />
        ) : (
          <PlayArrow className='cursor-pointer mx-4 hover:text-gum-400' />
        )}
        <SkipNext className='cursor-pointer hover:text-gum-400' onClick={onNext} />
      </div>
    </GlassCard>
  )
}
