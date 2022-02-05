import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Chaos_Shield_Root: THREE.Bone
  }
  materials: {
    Tower_Palisades_Chaos_Broken_Part1_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Part1_Destruction'
  | 'Part2_Destruction'
  | 'Part3_Destruction'
  | 'Part4_Destruction'
  | 'Part5_Destruction'
  | 'chaos_shutdown'
  | 'Spawn'
  | 'Part1_Hit'
  | 'Part2_Hit'
  | 'Part3_Hit'
  | 'Part4_Hit'
  | 'Part5_Hit'
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
        <primitive object={nodes.Chaos_Shield_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tower_Palisades_Chaos_Broken_Part1_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-107.22, 81.93, -209.86]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
