import { useEffect } from 'react'

export const usePlayAnimation = ({
  actions,
  name,
  names,
  onAnimationChange,
  mixer,
}: {
  mixer: THREE.AnimationMixer
  actions: Record<string, THREE.AnimationAction | null>
  name?: string
  names: string[]
  onAnimationChange?: (animation: string) => void
}) => {
  const playAnimation = ({ animationName }: { animationName?: string }) => {
    if (!animationName || !actions) return
    const animation = actions[animationName]

    if (!animation) return

    animation.repetitions = 1
    animation.enabled = true
    animation.play()

    if (onAnimationChange) onAnimationChange(animationName)
  }

  const cycleAnimations = (e?: any) => {
    const curIdx = e ? names.indexOf(e?.action?.getClip()?.name) : 0
    let nextIdx = e ? curIdx + 1 : curIdx
    if (nextIdx >= names.length - 1) {
      nextIdx = 0
      mixer.setTime(0)
    }

    const animationName = names[nextIdx]
    playAnimation({ animationName })
  }

  useEffect(() => {
    mixer.addEventListener('finished', cycleAnimations)

    return () => mixer.removeEventListener('finished', cycleAnimations)
  }, [])

  return { playAnimation, cycleAnimations }
}

export default usePlayAnimation
