import { AnimationList } from '@components/animation-list'
import { AssetPlayer } from '@components/asset-player'
import { SET_CURRENT_ANIMATION } from '@customtypes/index'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { useAppContext } from '../context'
import { EnhancedPopper } from './popper'

export const AnimationPlayer = () => {
  const [{ currentAnimation, animations }, dispatch] = useAppContext()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'animation-player-popup',
  })

  const onPrev = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => currentAnimation)
    const prevIndex = curIndex === animations.length - 1 ? 0 : curIndex - 1
    const prevAnimation = animations[prevIndex]
    if (!prevAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: prevAnimation })
  }

  const onNext = () => {
    if (!currentAnimation || !animations) return

    const curIndex = animations.findIndex((a) => a === currentAnimation)
    const nextIndex = curIndex === animations.length - 1 ? 0 : curIndex + 1
    const nextAnimation = animations[nextIndex]
    if (!nextAnimation) return

    dispatch({ type: SET_CURRENT_ANIMATION, payload: nextAnimation })
  }

  return (
    <div>
      <AssetPlayer
        asset={currentAnimation}
        placeholder={'Pick an animation'}
        onPrev={onPrev}
        onNext={onNext}
        popupState={popupState}
      />
      <EnhancedPopper popupState={popupState}>
        <AnimationList />
      </EnhancedPopper>
    </div>
  )
}
