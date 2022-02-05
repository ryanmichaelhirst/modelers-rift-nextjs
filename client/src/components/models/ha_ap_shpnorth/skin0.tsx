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
    ANIMATED_PROPS_ANIMATED_PROPS_fj_jeremy_shop_north_fj_jeremy_sh: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Close'
  | 'Closed'
  | 'Open'
  | 'Opened'
  | 'Wind'
  | 'Idle_Base'
  | 'wind'
  | 'close_annoyed'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        material={materials.ANIMATED_PROPS_ANIMATED_PROPS_fj_jeremy_shop_north_fj_jeremy_sh}
        skeleton={nodes.mesh_0.skeleton}
        position={[-241.65, 30.17, -229.06]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
