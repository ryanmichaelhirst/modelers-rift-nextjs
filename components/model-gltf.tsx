import { useAnimationResult } from '@customtypes/index'
import { useAnimations } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const ModelGltf = ({
  url,
  onSetAnimationMixer,
}: {
  url: string
  onSetAnimationMixer?: ({ mixer, names, actions, clips }: useAnimationResult) => void
}) => {
  const ref = useRef()
  const model = useLoader(GLTFLoader, url)
  const { mixer, names, actions, clips } = useAnimations(model.animations, ref)

  useEffect(() => {
    if (onSetAnimationMixer) {
      onSetAnimationMixer({ mixer, names, actions, clips })
    }
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <primitive object={model.scene} scale={[-1, 1, 1]} />
    </group>
  )
}
