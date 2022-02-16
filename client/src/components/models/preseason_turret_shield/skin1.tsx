import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Chaos_Shield_Root: THREE.Bone
  }
  materials: {
    Tower_Palisades_Order_Unbroken_Part1_Mat: THREE.MeshBasicMaterial
    Tower_Palisades_Order_Broken_Part1_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Part1_Destruction'
  | 'Part2_Destruction'
  | 'Part3_Destruction'
  | 'Part4_Destruction'
  | 'Part5_Destruction'
  | 'order_shutdown'
  | 'Spawn'
  | 'Part1_Hit'
  | 'Part2_Hit'
  | 'Part3_Hit'
  | 'Part4_Hit'
  | 'Part5_Hit'
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
        <primitive object={nodes.Chaos_Shield_Root} />
      </group>
      <group position={[-100.36, 86.23, -194.91]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Tower_Palisades_Order_Unbroken_Part1_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tower_Palisades_Order_Broken_Part1_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
