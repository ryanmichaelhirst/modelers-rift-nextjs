import { useAnimationResult } from '@customtypes/index'
import { useAnimations } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const ModelGltf = ({
  url,
  onSetAnimationMixer,
}: {
  url: string
  onSetAnimationMixer?: ({ mixer, names, actions, clips }: useAnimationResult) => void
}) => {
  const ref = useRef<THREE.Group>(null)
  // use s3 accelerate endpoint
  const model = useLoader(GLTFLoader, url.replace('s3.amazonaws', 's3-accelerate.amazonaws'))
  const { mixer, names, actions, clips } = useAnimations(model.animations, ref)

  useEffect(() => {
    if (onSetAnimationMixer) {
      onSetAnimationMixer({ mixer, names, actions, clips })
    }
  }, [])

  return (
    <group ref={ref}>
      <primitive object={model.scene} scale={[-1, 1, 1]} />
    </group>
  )
}
