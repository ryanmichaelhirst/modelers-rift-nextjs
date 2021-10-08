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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    mesh_0_14: THREE.SkinnedMesh
    mesh_0_15: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    Pearl_Body: THREE.Bone
  }
  materials: {
    Ezreal_Skin05_Head_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv1_Body_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv1_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv1_Glow_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv2_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv2_Glow_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv3_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv3_Glow_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_lv4_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Lv4_Glow_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Cannon_Lv4_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Pearl_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Recall_Stone_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Recall_LuckyPick_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Recall_HeartOfGold_Mat: THREE.MeshBasicMaterial
    Ezreal_Skin05_Map_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ezreal_skin05_attack1'
  | 'ezreal_skin05_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_Windup'
  | 'ezreal_skin05_spell3_exit'
  | 'Spell3_Exit_NoTarget_Idle'
  | 'Run_To_Idle'
  | 'ezreal_skin05_idle'
  | 'ezreal_skin05_run'
  | 'ezreal_skin05_attack2'
  | 'ezreal_skin05_attack4'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Run_Haste'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Spell3_Exit_NoTarget_Run'
  | 'Spell3_Exit_Run'
  | 'ezreal_skin05_recall'
  | 'Recall_Winddown'
  | 'Joke'
  | 'Spell3_Generic'
  | 'ezreal_skin05_spell3_exit_notarget'
  | 'Respawn'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Run_Haste_In'
  | 'ezreal_skin5_transform'
  | 'ezreal_skin5_transform_to_idle'
  | 'ezreal_skin5_transform_run'
  | 'ezreal_skin05_l3_homeguard_run_out_run'
  | 'ezreal_skin05_homeguard_run_loop'
  | 'ezreal_skin05_homeguard_l3_run_out_idle'
  | 'ezreal_skin05_homeguard_run_loop_in'
  | 'ezreal_skin05_homeguard_run_loop_turn_0'
  | 'ezreal_skin05_homeguard_run_loop_turn_right'
  | 'ezreal_skin05_homeguard_run_loop_turn_left'
  | 'Recall_LeadIn'
  | 'Recall_LeadOut_Heart'
  | 'ezreal_skin05_recall_leadout_pick'
  | 'Recall_LeadOut_Stone'
  | 'ezreal_skin5_homeguard_run_loop_roll_left'
  | 'ezreal_skin05_homeguard_run_out_idle'
  | 'ezreal_skin05_homeguard_run_loop_idle'
  | 'ezrealupdate_skin05_homeguard_run_idle_to_run_loop'
  | 'ezrealupdate_skin05_homeguard_run_loop_to_loop_idle'
  | 'ezreal_skin05_homeguard_run_idle_to_run_loop_out'
  | 'Teleport'
  | 'ezreal_skin05_run_lookaround'
  | 'ezreal_skin05_spell3_exit_run'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Pearl_Body} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ezreal_Skin05_Head_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ezreal_Skin05_Lv1_Body_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ezreal_Skin05_Lv1_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Ezreal_Skin05_Lv1_Glow_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Ezreal_Skin05_Lv2_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Ezreal_Skin05_Lv2_Glow_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Ezreal_Skin05_Lv3_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Ezreal_Skin05_Lv3_Glow_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Ezreal_Skin05_lv4_Mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Ezreal_Skin05_Lv4_Glow_Mat}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Ezreal_Skin05_Cannon_Lv4_Mat}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Ezreal_Skin05_Pearl_Mat}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Ezreal_Skin05_Recall_Stone_Mat}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Ezreal_Skin05_Recall_LuckyPick_Mat}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.Ezreal_Skin05_Recall_HeartOfGold_Mat}
        skeleton={nodes.mesh_0_14.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_15.geometry}
        material={materials.Ezreal_Skin05_Map_Mat}
        skeleton={nodes.mesh_0_15.skeleton}
      />
    </group>
  )
}
