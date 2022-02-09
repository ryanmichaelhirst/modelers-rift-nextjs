import { AssetPlayer } from '@components/asset-player'
import { Asset, SET_CURRENT_SOUND } from '@customtypes/index'
import { CloseOutlined } from '@mui/icons-material'
import { Fade, Paper, Popper } from '@mui/material'
import { bindPopover, bindToggle, usePopupState } from 'material-ui-popup-state/hooks'
import { FC, useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { SoundList } from './sound-list'

export const AudioPlayer: FC<{ audios?: Asset[] }> = ({ audios }) => {
  const [{ currentSound }, dispatch] = useAppContext()
  const [audioEl, setAudioEl] = useState<HTMLAudioElement>()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'animation-player-popup',
  })

  useEffect(() => {
    if (currentSound) {
      // pause previous audio
      audioEl?.pause()
      fetch(`/api/getAudio/${currentSound}`)
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

  const onPrev = () => {
    if (!currentSound || !audios) return

    const curIndex = audios.findIndex((s) => s?.path === currentSound)
    const prevIndex = curIndex === audios.length - 1 ? 0 : curIndex - 1
    const prevSound = audios[prevIndex]
    if (!prevSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: prevSound.path })
  }

  const onNext = () => {
    if (!currentSound || !audios) return

    const curIndex = audios.findIndex((s) => s?.path === currentSound)
    const nextIndex = curIndex === audios.length - 1 ? 0 : curIndex + 1
    const nextSound = audios[nextIndex]
    if (!nextSound?.path) return

    dispatch({ type: SET_CURRENT_SOUND, payload: nextSound.path })
  }

  const audio = audios?.find((a) => a?.path === currentSound)

  return (
    <>
      <AssetPlayer
        asset={audio?.name}
        placeholder={'Pick a sound'}
        onPrev={onPrev}
        onNext={onNext}
        popupState={popupState}
      />
      <Popper {...bindPopover(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className='h-72 overflow-y-scroll p-4'>
              <div className='flex justify-end'>
                <CloseOutlined className='cursor-pointer' {...bindToggle(popupState)} />
              </div>
              <SoundList audios={audios} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}
