import { useEffect } from 'react'
import { useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const cycleAnimations = <T>({
  animations,
  ref,
  timerLabel,
  baseMaterial,
}: {
  animations: any
  ref: any
  timerLabel: string
  baseMaterial?: THREE.MeshBasicMaterial
}) => {
  const { mixer, names, actions, clips } = useAnimations(animations, ref)
  const aniActions = (actions as unknown) as T
  const aniNames = Object.keys(aniActions).map((key) => key)
  const lastClipName = aniNames[aniNames.length - 1]

  // rotate the model by 180deg to match the flipped normals
  // 45 == Math.PI / 4, 90 == Math.PI / 2 and 180 == Math.P
  useFrame(() => {
    if (baseMaterial) {
      ref.current.rotation.y = Math.PI
    }
  })

  // flip normals and rotate model
  if (baseMaterial) {
    baseMaterial.side = THREE.BackSide
  }

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
