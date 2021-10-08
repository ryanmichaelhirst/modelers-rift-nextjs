import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    runPython: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    Skin09_Hat_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Attack1_InCombat_Bwd'
  | 'Attack1_InCombat_Fwd'
  | 'Attack1_InCombat_Left'
  | 'Attack1_InCombat_Right'
  | 'Attack2_Bwd'
  | 'Attack2_Fwd'
  | 'Attack2_Left'
  | 'Attack2_Right'
  | 'CounterAnim_-135'
  | 'CounterAnim_-179'
  | 'CounterAnim_-45'
  | 'CounterAnim_135'
  | 'CounterAnim_179'
  | 'CounterAnim_45'
  | 'Crit_Bwd'
  | 'Crit_Fwd'
  | 'Crit_Left'
  | 'Crit_Right'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Idle1_Base'
  | 'urgot_idle_fidget_01'
  | 'Idle_Fidget_02'
  | 'urgot_idle_in'
  | 'urgot_skin09_joke'
  | 'urgot_kneecapdown_loop'
  | 'urgot_kneecapup_loop'
  | 'Knockup_Base'
  | 'KnockUp_Loop'
  | 'urgot_laugh'
  | 'urgot_passive'
  | 'Recall'
  | 'urgot_recall_winddown'
  | 'Respawn'
  | 'urgot_attack1_incombat_fwd'
  | 'urgot_runhaste_bwd_02'
  | 'urgot_runhaste_fwd_02'
  | 'urgot_runhaste_left_02'
  | 'urgot_runhaste_right_02'
  | 'RunSlow_Bwd'
  | 'RunSlow_Fwd'
  | 'RunSlow_Left'
  | 'RunSlow_Right'
  | 'RunVar_Bwd'
  | 'RunVar_Fwd'
  | 'RunVar_Left'
  | 'RunVar_Right'
  | 'Run_Bwd'
  | 'Run_Fwd'
  | 'Run_Left'
  | 'Run_Right'
  | 'Run_To_Idle'
  | 'Spell1_Bwd'
  | 'Spell1_Fwd'
  | 'Spell1_Left'
  | 'Spell1_Right'
  | 'Spell2Cast'
  | 'urgot_spell2_fwd_-180'
  | 'urgot_spell2_fwd_180'
  | 'urgot_spell2_fwd'
  | 'urgot_spell3_grabthrow_bwd'
  | 'urgot_spell3_grabthrow_fwd'
  | 'urgot_spell3_grabthrow_left'
  | 'urgot_spell3_grabthrow_right'
  | 'Spell3_Move_Bwd'
  | 'Spell3_Move_Fwd'
  | 'Spell3_Move_Left'
  | 'Spell3_Move_Right'
  | 'urgot_spell3_recovery_bwd'
  | 'urgot_spell3_recovery_fwd'
  | 'urgot_spell3_recovery_left'
  | 'urgot_spell3_recovery_right'
  | 'Spell3_Recovery_Moving_Bwd'
  | 'urgot_spell3_recovery_moving'
  | 'Spell3_Recovery_Moving_Left'
  | 'Spell3_Recovery_Moving_Right'
  | 'urgot_spell3_bwd'
  | 'urgot_spell3'
  | 'urgot_spell3_left'
  | 'urgot_spell3_right'
  | 'Spell4_Bwd'
  | 'urgot_spell4_execute_laugh'
  | 'Spell4_Fwd'
  | 'urgot_spell4_fwd'
  | 'Spell4_Left'
  | 'urgot_spell4_additve_intro'
  | 'urgot_spell4_additve_loop'
  | 'Spell4_Right'
  | 'Stunned'
  | 'TRANS_Attack_To_Idle'
  | 'urgot_taunt'
  | 'TurnLeft_180'
  | 'TurnLeft_90'
  | 'TurnRight_180'
  | 'TurnRight_90'
  | 'Turn_0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.runPython} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Skin09_Hat_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
