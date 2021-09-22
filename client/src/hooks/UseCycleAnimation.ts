import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'

export const cycleAnimations = <T>({ animations, ref }: { animations: any; ref: any }) => {
  const { mixer, names, actions, clips } = useAnimations(animations, ref)
  const modelActions = (actions as unknown) as T
  const animationNames = Object.keys(modelActions).map((key) => key)

  const playNextAnimation = (e?: unknown) => {
    const name = animationNames.shift()
    animationNames.push(name)
    const animation = modelActions[name]
    animation.repetitions = 3
    animation.enable = true
    animation.play()
  }

  useEffect(() => {
    if (mixer) {
      mixer.addEventListener('finished', playNextAnimation)
      playNextAnimation()
    }

    return () => mixer.removeEventListener('finished', playNextAnimation)
  }, [mixer])
}

export default cycleAnimations
