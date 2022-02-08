import { AnimationList } from '@components/animation-list'
import { AssetPlayer } from '@components/asset-player'
import { SET_CURRENT_ANIMATION } from '@customtypes/index'
import { CloseOutlined } from '@mui/icons-material'
import { Fade, Paper, Popper } from '@mui/material'
import { bindPopover, bindToggle, usePopupState } from 'material-ui-popup-state/hooks'
import { useAppContext } from '../context'

export const AnimationPlayer = () => {
  const [{ currentAnimation, animations }, dispatch] = useAppContext()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'animation-player-popup',
  })

  const onPrev = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => currentAnimation)
    if (!curIndex) return

    const prevIndex = curIndex === animations.length - 1 ? 0 : curIndex - 1
    const prevAnimation = animations[prevIndex]
    if (!prevAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: prevAnimation })
  }

  const onNext = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === currentAnimation)
    if (!curIndex) return

    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  return (
    <>
      <AssetPlayer
        asset={currentAnimation}
        placeholder={'Pick an animation'}
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
              <AnimationList />
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}
