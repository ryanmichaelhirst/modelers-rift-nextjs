import { useCallback } from 'react'
import * as THREE from 'three'

export const usePlayAnimation = ({
  actions,
  names,
  mixer,
}: {
  mixer?: THREE.AnimationMixer
  actions?: Record<string, THREE.AnimationAction | null>
  name?: string
  names?: string[]
}) => {
  const playAnimation = useCallback(
    (animationName: string) => {
      if (!animationName || !actions || !mixer) return
      const animation = actions[animationName]

      if (!animation) return

      animation.repetitions = 1
      animation.enabled = true
      animation.play()
      mixer.setTime(0)
    },
    [names],
  )

  return playAnimation
}

export default usePlayAnimation
