import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Cloth_root: THREE.Bone
    Root: THREE.Bone
    BuffBones: THREE.Bone
  }
  materials: {
    Cloth1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sruap_chaosturret1_idle1.trueshot'
  | 'Destroyed'
  | 'sruap_chaosturret1_idle2.trueshot'
  | 'sruap_chaosturret1_idle1_seq.trueshot'
  | 'sruap_turret_chaos_cloth_stage1.trueshot'
  | 'sruap_turret_chaos_cloth_stage2.trueshot'
  | 'Idle1_Base'
  | 'Attack1'
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
        <primitive object={nodes.Cloth_root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.BuffBones} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Cloth1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-135.8, -486.88, -135.8]}
        scale={0.07}
      />
    </group>
  )
}, areEqual)

export default Model
