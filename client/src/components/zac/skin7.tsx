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
    Buffbone_Cstm_Healthbar: THREE.Bone
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
    Skull: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    L_Arm: THREE.MeshBasicMaterial
    L_Armblade: THREE.MeshBasicMaterial
    Legs: THREE.MeshBasicMaterial
    R_Arm: THREE.MeshBasicMaterial
    Puddle: THREE.MeshBasicMaterial
    Tail: THREE.MeshBasicMaterial
    Ult: THREE.MeshBasicMaterial
    Skull: THREE.MeshBasicMaterial
    ArmbladeRecall: THREE.MeshBasicMaterial
    Prop: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zac_attack1'
  | 'zac_attack2'
  | 'zac_channel_windup'
  | 'Crit'
  | 'Idle2_Base'
  | 'zac_idle3'
  | 'zac_idle4'
  | 'Spell3'
  | 'Idle1_Base'
  | 'Spell3_Flying'
  | 'zac_idle_in1'
  | 'zac_idle_in2'
  | 'zac_attack3'
  | 'zac_attack4'
  | 'zac_idle_in3'
  | 'Channel_Base'
  | 'zac_respawn'
  | 'Recall'
  | 'zac_recall_back'
  | 'zac_laugh'
  | 'zac_joke'
  | 'Death_Passive'
  | 'Death'
  | 'Dance'
  | 'zac_channel_leadin'
  | 'Channel_WUp_LeadIn'
  | 'zac_laugh2'
  | 'Spell2'
  | 'Pickup'
  | 'Joke_Loop'
  | 'Joke_Windup'
  | 'Run_Fast'
  | 'Run'
  | 'Run_Haste'
  | 'Death_Unite'
  | 'zac_death_unite'
  | 'Spell3_Windup'
  | 'zac_spell4'
  | 'zac_idle_in4'
  | 'Spell1_B1'
  | 'Spell1_B2'
  | 'Spell1_B3'
  | 'Spell1_Max'
  | 'Spell1_Min'
  | 'Spell1_Regrow_Idle'
  | 'Spell1_Regrow_Run'
  | 'Spell1_Slam'
  | 'Spell3_BackRun'
  | 'zac_spell3_back'
  | 'Taunt_Base'
  | 'Spell4'
  | 'zac_revert_spell4_2'
  | 'zac_spell4_3'
  | 'Spell4_Windup'
  | 'Spell4_ToRun'
  | 'Spell4_ToIdle'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
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
        <primitive object={nodes.Skull} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.L_Arm} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.L_Armblade}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Legs} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.R_Arm} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Puddle} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Tail} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.Ult} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Skull} skeleton={nodes.mesh_0_8.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.ArmbladeRecall}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_10.geometry} material={materials.Prop} skeleton={nodes.mesh_0_10.skeleton} />
    </group>
  )
}
