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
    Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Sheath: THREE.Bone
    Bow: THREE.Bone
    Azakana_Head: THREE.Bone
    Azakana_L_Hand: THREE.Bone
    Azakana_R_Hand: THREE.Bone
    Plate: THREE.Bone
    Instrument: THREE.Bone
    Fish: THREE.Bone
    Stool: THREE.Bone
    Recall_Mask: THREE.Bone
  }
  materials: {
    GhostKatana: THREE.MeshBasicMaterial
    Skirt: THREE.MeshBasicMaterial
    Skirt_Inner: THREE.MeshBasicMaterial
    Sheath: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Katana: THREE.MeshBasicMaterial
    Katana_Smear: THREE.MeshBasicMaterial
    GhostKatana_Smear: THREE.MeshBasicMaterial
    Azakana: THREE.MeshBasicMaterial
    Sushi: THREE.MeshBasicMaterial
    Fish: THREE.MeshBasicMaterial
    Instrument: THREE.MeshBasicMaterial
    Bow_Smear: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'Attack2'
  | 'yone_walk01_toidle_var01.yone'
  | 'Run_Base'
  | 'Attack3'
  | 'Attack4'
  | 'Spell1_Dash'
  | 'Death'
  | 'Run_Fast'
  | 'Spell2'
  | 'yone_spell1c_in.yone'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Joke_In'
  | 'Taunt_In'
  | 'Laugh_In'
  | 'Recall'
  | 'Dance_In'
  | 'Run_Homeguard'
  | 'Attack1'
  | 'Spell3_Dash'
  | 'Spell3_Out'
  | 'yone_attacks_fast01.yone'
  | 'yone_attacks_fast02.yone'
  | 'yone_attacks_fast03.yone'
  | 'yone_attacks_fast04.yone'
  | 'yone_attacks_fast01_torun.yone'
  | 'yone_attacks_fast01_toidle.yone'
  | 'yone_attacks_fast02_torun.yone'
  | 'yone_attacks_fast02_toidle.yone'
  | 'yone_attacks_fast03_toidle.yone'
  | 'yone_attacks_fast03_torun.yone'
  | 'yone_attacks_fast04_toidle.yone'
  | 'yone_attacks_fast04_torun.yone'
  | 'Attack1_ToIdle'
  | 'yone_attack01_towalk01.yone'
  | 'Attack2_ToIdle'
  | 'yone_attack02_towalk01.yone'
  | 'yone_attack03_toidle01.yone'
  | 'yone_attack03_towalk01.yone'
  | 'yone_attack04_toidle01.yone'
  | 'yone_attack04_towalk01.yone'
  | 'yone_walk01_turn_0.yone'
  | 'yone_walk01_turn_90.yone'
  | 'yone_walk01_turn_-90.yone'
  | 'yone_idle01_tosheath.yone'
  | 'yone_idle01_tosheath_loop.yone'
  | 'Spell2_ToIdle'
  | 'Spell2_ToRun'
  | 'yone_spell1c_toidle.yone'
  | 'yone_spell1c_towalk_0.yone'
  | 'yone_spell1a_towalk01.yone'
  | 'yone_spell3_bodyin.yone'
  | 'yone_spell3_bodyloop.yone'
  | 'yone_spell1_a_01.yone'
  | 'yone_spell1_a_02.yone'
  | 'yone_spell1c_dash.yone'
  | 'yone_spell1c_out.yone'
  | 'yone_spell3_spiritin.yone'
  | 'Spell4'
  | 'Spell4_Out'
  | 'yone_run01.yone'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'yone_spell3_end1.yone'
  | 'yone_spell3_end2.yone'
  | 'yone_spell3_spiritin_toidle.yone'
  | 'Spell3_Out_toIdle'
  | 'yone_spell1c_towalk_90.yone'
  | 'yone_spell1c_towalk_-90.yone'
  | 'Dance_Loop'
  | 'yone_homeguard01_toidle01.yone'
  | 'Run_Homeguard_IN'
  | 'yone_homeguard_towalk01.yone'
  | 'yone_run01_toidle.yone'
  | 'yone_spell4_out_moving.yone'
  | 'Laugh_Loop'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Taunt_loop'
  | 'Joke_Loop'
  | 'yone_attacks_fast_toidle.yone'
  | 'yone_idle01_torun01.yone'
  | 'yone_idlesheathed_torun01.yone'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Sheath} />
        <primitive object={nodes.Bow} />
        <primitive object={nodes.Azakana_Head} />
        <primitive object={nodes.Azakana_L_Hand} />
        <primitive object={nodes.Azakana_R_Hand} />
        <primitive object={nodes.Plate} />
        <primitive object={nodes.Instrument} />
        <primitive object={nodes.Fish} />
        <primitive object={nodes.Stool} />
        <primitive object={nodes.Recall_Mask} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.GhostKatana}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Skirt}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skirt_Inner}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Sheath}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Katana}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Katana_Smear}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.GhostKatana_Smear}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Azakana}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Sushi}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Fish}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Instrument}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Bow_Smear}
        skeleton={nodes.mesh_0_12.skeleton}
      />
    </group>
  )
}
