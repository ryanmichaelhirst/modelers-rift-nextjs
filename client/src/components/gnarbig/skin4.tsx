import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Rock: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Cstm_Ground: THREE.Bone
    R_Buffbone_Cstm_Ground: THREE.Bone
  }
  materials: {
    Gnar: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'gnarbig_spell1'
  | 'gnarbig_attack1'
  | 'gnarbig_attack2'
  | 'Crit_Base'
  | 'Spell3'
  | 'Rage_Stop'
  | 'Rage_Move'
  | 'Taunt_Base'
  | 'Joke'
  | 'Idle1_Alt_A'
  | 'Rage_Scale'
  | 'Rage_Scale_Base'
  | 'gnarbig_spell3_trans'
  | 'gnarbig_spell1_trans'
  | 'Spell1_Scale'
  | 'Spell1_Scale_Base'
  | 'gnarbig_spell2_tran'
  | 'Spell4_Base'
  | 'gnarbig_spell4_trans'
  | 'gnarbig_spell2'
  | 'gnarbig_spell4'
  | 'Run_Base'
  | 'Idle1_In'
  | 'Run_ALT_A'
  | 'Run_ALT_B'
  | 'Spell2_Back'
  | 'Dance_Base'
  | 'Laugh'
  | 'Channel_In'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'gnarbig_crit'
  | 'Run_In'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'Spell1_0'
  | 'Recall_Windup'
  | 'Recall_Loop'
  | 'Dance_In'
  | 'gnarbig_turret_attack_fast'
  | 'gnarbig_turret_attack01'
  | 'gnarbig_death'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Rock} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Cstm_Ground} />
        <primitive object={nodes.R_Buffbone_Cstm_Ground} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Gnar} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
