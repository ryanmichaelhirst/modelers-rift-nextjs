import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Teacup: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    ___Default7: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Spell2'
  | 'Attack3'
  | 'Recall'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Crit'
  | 'Spell1'
  | 'Spell1_Run'
  | 'Spell4_Hit'
  | 'Spell4_Run'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'vi_idle_in'
  | 'Spell3'
  | 'vi_idle1_in_b'
  | 'Attack_AfterUlt'
  | 'Spell2_A'
  | 'vi_spell1_idle'
  | 'vi_spell1_idleintro'
  | 'Dance_Base'
  | 'vi_dance_in'
  | 'vi_idle1_in_c'
  | 'vi_joke'
  | 'vi_joke2'
  | 'vi_laugh'
  | 'Taunt_Base'
  | 'Spell4'
  | 'vi_run1'
  | 'vi_run1_in'
  | 'vi_run2'
  | 'vi_run2_in'
  | 'vi_spell4'
  | 'Stunned'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.Teacup} />
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.___Default7}
        skeleton={nodes.mesh_0.skeleton}
        position={[-73.79, -0.28, -20.61]}
        scale={0.01}
      />
    </group>
  )
}
