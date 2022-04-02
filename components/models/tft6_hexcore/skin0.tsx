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
    pasted__HexCore_A_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spawn'
  | 'tft6_augment_hexcore_deactivated.tft_set6'
  | 'tft6_augment_hexcore_loop1.tft_set6'
  | 'tft6_augment_hexcore_loop2.tft_set6'
  | 'tft6_augment_hexcore_lookat_179.tft_set6'
  | 'tft6_augment_hexcore_lookat_0.tft_set6'
  | 'tft6_augment_hexcore_lookat_-179.tft_set6'
  | 'tft6_augment_hexcore_lookat_90.tft_set6'
  | 'tft6_augment_hexcore_lookat_-90.tft_set6'
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
        material={materials.pasted__HexCore_A_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-66.56, -42.61, -66.58]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
