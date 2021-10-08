import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    R_Arm_Ground_Root: THREE.Bone
    Sword: THREE.Bone
    ArmSet1_Root: THREE.Bone
    ArmSet2_Root: THREE.Bone
    ArmSet3_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Default: THREE.MeshBasicMaterial
    Crown: THREE.MeshBasicMaterial
    Sword: THREE.MeshBasicMaterial
    Sword_Metal: THREE.MeshBasicMaterial
    Wraith: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Joke'
  | 'Laugh'
  | 'viego_passive_ranged_attack.ruinedking'
  | 'Run_Base'
  | 'Spell1'
  | 'viego_spell2_charge.ruinedking'
  | 'Spell3_0'
  | 'Spell4'
  | 'viego_taunt_intro.ruinedking'
  | 'Recall'
  | 'viego_double_attacks_1.ruinedking'
  | 'viego_double_attacks_2.ruinedking'
  | 'viego_spell2_dash.ruinedking'
  | 'Passive_Attack'
  | 'Spell4_Hit'
  | 'Walk'
  | 'IdleIn'
  | 'Spell3_ToIdle'
  | 'Spell3_Run'
  | 'viego_spell2_dash_toidle.ruinedking'
  | 'Passive_Attack2'
  | 'viego_double_attacks_2_toidle.ruinedking'
  | 'viego_double_attacks_2_torun.ruinedking'
  | 'viego_spell4_landing.ruinedking'
  | 'viego_spell4_landingtoidle.ruinedking'
  | 'viego_spell4_landing_torun.ruinedking'
  | 'Spell4_Hit_ToIdle'
  | 'Spell4_Hit_ToRun'
  | 'viego_spell4_landing_towalk.ruinedking'
  | 'viego_spell4_hit_towalk.ruinedking'
  | 'viego_attack_close.ruinedking'
  | 'viego_attack1_towalk.ruinedking'
  | 'viego_attack1_torun.ruinedking'
  | 'viego_attack2_towalk.ruinedking'
  | 'viego_attack2_torun.ruinedking'
  | 'viego_attackclose_towalk.ruinedking'
  | 'viego_attackclose_torun.ruinedking'
  | 'Spell3_90'
  | 'Spell3_-90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Crit2'
  | 'viego_spell1_torun.ruinedking'
  | 'viego_spell1_towalk.ruinedking'
  | 'viego_double_attacks_2_towalk.ruinedking'
  | 'viego_spell2_charge_move.ruinedking'
  | 'viego_spell2_dash_towalk.ruinedking'
  | 'viego_spell2_dash_torun.ruinedking'
  | 'viego_spell2_charge_toidle.ruinedking'
  | 'viego_spell2_charge_move_towalk.ruinedking'
  | 'viego_spell2_charge_move_torun.ruinedking'
  | 'viego_walkin.ruinedking'
  | 'RunIn'
  | 'Run_Variation'
  | 'viego_spell1_towalk_-90.ruinedking'
  | 'viego_spell1_towalk_90.ruinedking'
  | 'viego_spell1_towalk_180.ruinedking'
  | 'viego_spell1_towalk_-180.ruinedking'
  | 'viego_spell1_torun_90.ruinedking'
  | 'viego_spell1_torun_180.ruinedking'
  | 'viego_spell1_torun_-90.ruinedking'
  | 'viego_spell1_torun_-180.ruinedking'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Dance_Intro'
  | 'Dance_Loop'
  | 'Taunt_loop'
  | 'Run_Homeguard'
  | 'viego_idlein_into_homeguard.ruinedking'
  | 'Spell1_ToIdle'
  | 'Stunned'
  | 'KnockUp_Loop'
  | 'knockup_start.ruinedking'
  | 'viego_spell3_tospell3run.ruinedking'
  | 'viego_idlein_forwalk.ruinedking'
  | 'viego_runtowalk.ruinedking'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.R_Arm_Ground_Root} />
        <primitive object={nodes.Sword} />
        <primitive object={nodes.ArmSet1_Root} />
        <primitive object={nodes.ArmSet2_Root} />
        <primitive object={nodes.ArmSet3_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Default} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Crown} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Sword} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Sword_Metal}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Wraith} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Recall} skeleton={nodes.mesh_0_6.skeleton} />
    </group>
  )
}
