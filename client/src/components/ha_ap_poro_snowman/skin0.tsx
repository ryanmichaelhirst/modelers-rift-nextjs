import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
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
    pasted__pasted__pasted__pasted__lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'poro_snowman_disassemble_stack'
  | 'poro_snowman_idle_stack'
  | 'poro_snowman_jump_stack'
  | 'Ground_Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Smol_Root} />
        <primitive object={nodes.Smol_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Big_Root} />
        <primitive object={nodes.Big_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
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
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.pasted__pasted__pasted__pasted__lambert2}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
