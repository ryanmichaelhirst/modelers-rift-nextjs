import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    MAT_Chains: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Wind_Strong'
  | 'fall_left'
  | 'fall_right'
  | 'fall_down_left'
  | 'Wind_Low'
  | 'wind_low_left'
  | 'wind_low_right'
  | 'wind_strong_left'
  | 'wind_strong_right'
  | 'fall_down_right'
  | 'fallen_left'
  | 'fallen_right'
  | 'Idle1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MAT_Chains}
        skeleton={nodes.mesh_0.skeleton}
        position={[-799.36, -205.02, -187.83]}
        scale={0.1}
      />
    </group>
  )
}, areEqual)

export default Model
