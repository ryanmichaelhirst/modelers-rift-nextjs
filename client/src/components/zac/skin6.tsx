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
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    BotSplitter_Skn: THREE.Bone
    TopSplitter_Follow_Skn: THREE.Bone
    C_Buffbone_Glb_Select_Loc: THREE.Bone
    R_Buffbone_Glb_Foot_Loc: THREE.Bone
    L_Buffbone_Glb_Foot_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    R_Buffbone_Glb_Hand_Loc: THREE.Bone
    L_Buffbone_Glb_Hand_Loc: THREE.Bone
    C_Buffbone_Glb_Head_Loc: THREE.Bone
    C_Buffbone_Glb_Chest_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Stretch1: THREE.Bone
    Stretch2: THREE.Bone
    Stretch3: THREE.Bone
    Stretch4: THREE.Bone
    Vertical: THREE.Bone
    Edge1: THREE.Bone
    Edge2: THREE.Bone
    Edge3: THREE.Bone
    Edge4: THREE.Bone
    Edge5: THREE.Bone
    Edge6: THREE.Bone
    Edge7: THREE.Bone
    Edge8: THREE.Bone
    Ult_Root: THREE.Bone
    Recall_Jelly1: THREE.Bone
    Recall_Jelly2: THREE.Bone
  }
  materials: {
    Orig_Helmet: THREE.MeshBasicMaterial
    Orig_L_ArmGuard: THREE.MeshBasicMaterial
    Orig_R_ArmGuard: THREE.MeshBasicMaterial
    Zac_upperBody_mat: THREE.MeshBasicMaterial
    Zac_Legs_mat: THREE.MeshBasicMaterial
    Orig_L_LegGuard: THREE.MeshBasicMaterial
    Orig_R_LegGuard: THREE.MeshBasicMaterial
    Zac_base_tail_mat: THREE.MeshBasicMaterial
    Zac_base_puddle_mat: THREE.MeshBasicMaterial
    Zac_base_ult_mat: THREE.MeshBasicMaterial
    Zac_SKT_Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zac_attack1'
  | 'zac_attack2'
  | 'zac_attack3'
  | 'zac_attack4'
  | 'zac_spell4'
  | 'zac_channel_windup'
  | 'Channel_WUp_LeadIn'
  | 'zac_channel_leadin'
  | 'Crit'
  | 'Death'
  | 'Death_Passive'
  | 'zac_death_unite'
  | 'Death_Unite'
  | 'Extras'
  | 'Idle2_Base'
  | 'zac_idle3'
  | 'zac_idle4'
  | 'zac_idle_in3'
  | 'Joke_Loop'
  | 'Joke_Windup'
  | 'zac_laugh2'
  | 'Pickup'
  | 'Recall'
  | 'Spell1_B1'
  | 'Spell1_B2'
  | 'Spell1_B3'
  | 'Spell1_Max'
  | 'Spell1_Min'
  | 'Spell1_Regrow_Idle'
  | 'Spell1_Regrow_Run'
  | 'Spell1_Slam'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3_BackRun'
  | 'zac_spell3_back'
  | 'Spell3_Flying'
  | 'Spell3_Windup'
  | 'Channel_Base'
  | 'Dance'
  | 'Idle1_Base'
  | 'zac_idle_in1'
  | 'zac_idle_in4'
  | 'zac_idle_in2'
  | 'zac_joke'
  | 'zac_laugh'
  | 'zac_respawn'
  | 'Run'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Taunt_Base'
  | 'Spell4'
  | 'zac_revert_spell4_2'
  | 'zac_spell4_3'
  | 'Spell4_Windup'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.BotSplitter_Skn} />
        <primitive object={nodes.TopSplitter_Follow_Skn} />
        <primitive object={nodes.C_Buffbone_Glb_Select_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Head_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Chest_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Stretch1} />
        <primitive object={nodes.Stretch2} />
        <primitive object={nodes.Stretch3} />
        <primitive object={nodes.Stretch4} />
        <primitive object={nodes.Vertical} />
        <primitive object={nodes.Edge1} />
        <primitive object={nodes.Edge2} />
        <primitive object={nodes.Edge3} />
        <primitive object={nodes.Edge4} />
        <primitive object={nodes.Edge5} />
        <primitive object={nodes.Edge6} />
        <primitive object={nodes.Edge7} />
        <primitive object={nodes.Edge8} />
        <primitive object={nodes.Ult_Root} />
        <primitive object={nodes.Recall_Jelly1} />
        <primitive object={nodes.Recall_Jelly2} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Orig_Helmet} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Orig_L_ArmGuard}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Orig_R_ArmGuard}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Zac_upperBody_mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Zac_Legs_mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Orig_L_LegGuard}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Orig_R_LegGuard}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Zac_base_tail_mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Zac_base_puddle_mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Zac_base_ult_mat}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Zac_SKT_Recall}
        skeleton={nodes.mesh_0_10.skeleton}
      />
    </group>
  )
}
