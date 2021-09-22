import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'

export const cycleAnimations = <T>({
  animations,
  ref,
  timerLabel,
}: {
  animations: any
  ref: any
  timerLabel: string
}) => {
  const { mixer, names, actions, clips } = useAnimations(animations, ref)
  const aniActions = (actions as unknown) as T
  const aniNames = Object.keys(aniActions).map((key) => key)
  const lastClipName = aniNames[aniNames.length - 1]

  useEffect(() => {
    mixer.addEventListener('finished', playNextAnimation)

    return () => mixer.removeEventListener('finished', playNextAnimation)
  }, [])

  useEffect(() => {
    playNextAnimation()
  }, [])

  const playNextAnimation = (e?: any) => {
    const curIdx = aniNames.indexOf(e?.action?.getClip()?.name)
    const currentClipName = aniNames[curIdx]

    if (curIdx === 0 || curIdx === -1) console.time(`full-animation-cycle-${timerLabel}`)

    let nextIdx = curIdx === -1 ? 1 : curIdx + 1

    if (currentClipName === lastClipName) {
      console.timeEnd(`full-animation-cycle-${timerLabel}`)
      nextIdx = 0
      mixer.setTime(0)
    }

    const nextClipName = aniNames[nextIdx]
    const animation = aniActions[nextClipName]

    animation.repetitions = 1
    animation.enabled = true
    animation.play()
  }
}

export default cycleAnimations
