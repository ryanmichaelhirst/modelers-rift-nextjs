import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Smol_Root: THREE.Bone
    Smol_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Big_Root: THREE.Bone
    Big_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    lambert4207: THREE.MeshBasicMaterial
    lambert4208: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'poro_snowman_disassemble_stack'
  | 'poro_snowman_idle_stack'
  | 'poro_snowman_jump_stack'
  | 'Ground_Idle'
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
        <primitive object={nodes.Smol_Root} />
        <primitive object={nodes.Smol_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Big_Root} />
        <primitive object={nodes.Big_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-304.68, -3.27, -147.66]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert4207}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.lambert4208}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
