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
    Root: THREE.Bone
    L_TailA1_Grnd: THREE.Bone
    R_TailA1_Grnd: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Evelynn_Shadow_MAT: THREE.MeshBasicMaterial
    Eve_Mask_MAT: THREE.MeshBasicMaterial
    Eve_Mask_Regular_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'evelynn_giggle'
  | 'Idle1_Base'
  | 'IdleIn'
  | 'evelynn_stealth_idle01_to_stealth_idle'
  | 'evelynn_idle_var01'
  | 'Joke'
  | 'Knockup_Base'
  | 'KnockUp_Loop'
  | 'evelynn_laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Respawn_Idle_Hookup'
  | 'Respawn_StealthIdle_Hookup'
  | 'evelynn_run2'
  | 'Run_Base'
  | 'evelynn_run_empower_active'
  | 'Run_Homeguard'
  | 'Run_Hurt'
  | 'Spell1'
  | 'evelynn_spell1_b_stand_lh'
  | 'evelynn_spell1_b_stand_rh'
  | 'evelynn_spell1_b_walking_lh'
  | 'evelynn_spell1_b_walking_rh'
  | 'Spell1_To_Run'
  | 'Spell2'
  | 'evelynn_spell2_trans_idle'
  | 'evelynn_spell2_trans_nslow_run'
  | 'evelynn_spell2_trans_stea_slrun'
  | 'evelynn_spell2_trans_stea_idle'
  | 'evelynn_spell2_trans_stea_run'
  | 'Spell3'
  | 'Spell3_Empowered'
  | 'Spell3_Empowered_Attack'
  | 'Spell4'
  | 'Spell4_Out'
  | 'Spell4_To_Run'
  | 'evelynn_stealth_idle01_in'
  | 'evelynn_stealth_idle_to_steath_run'
  | 'evelynn_stealth_idle01_var_01'
  | 'evelynn_stealth_idle01_var_02'
  | 'evelynn_slow_stealth_run'
  | 'evelynn_stealth_runhaste'
  | 'evelynn_run_turn_0'
  | 'evelynn_stealth_run_transition'
  | 'Stealth_Run_Haste_Transition'
  | 'Stunned'
  | 'Taunt'
  | 'Taunt_Hookup_Idle'
  | 'evelynn_taunt_hookup_stealth'
  | 'Turn_0'
  | 'TURN_L_360'
  | 'TURN_R_360'
  | 'Stealth_Idle01_IN_Slow'
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
        <primitive object={nodes.L_TailA1_Grnd} />
        <primitive object={nodes.R_TailA1_Grnd} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Evelynn_Shadow_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Eve_Mask_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Eve_Mask_Regular_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
