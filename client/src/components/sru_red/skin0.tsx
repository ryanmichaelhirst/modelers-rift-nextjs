import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Attack: THREE.Bone
  }
  materials: {
    RedBuff_TX: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_red_idle1'
  | 'Attack1'
  | 'sru_red_idle2'
  | 'Death'
  | 'Run'
  | 'Attack3'
  | 'Attack2'
  | 'sru_red_idle1_aggro'
  | 'sru_red_idle_n2a'
  | 'sru_red_idle1_aggro2'
  | 'sru_red_spawn'
  | 'sru_red_idle_a2n'
  | 'Idle_Lookat_R45'
  | 'Idle_Lookat_L45'
  | 'Idle_Lookat_0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Attack} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.RedBuff_TX} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
