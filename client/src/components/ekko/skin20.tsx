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
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Bat2World: THREE.Bone
    Weapon2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Stair_Main: THREE.Bone
  }
  materials: {
    Ekko_Skin19_Body_Mat: THREE.MeshBasicMaterial
    Ekko_Skin19_Weapon_TX: THREE.MeshBasicMaterial
    Ekko_Skin19_BackHair_Mat: THREE.MeshBasicMaterial
    Ekko_Skin19_QProp_TX: THREE.MeshBasicMaterial
    Ekko_Skin19_Recall_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Laugh'
  | 'Spell3'
  | 'Taunt_Base'
  | 'Joke'
  | 'Run_Fast'
  | 'ekko_skin19_walk'
  | 'Attack1'
  | 'Attack2'
  | 'Spell4'
  | 'Spell2_Cast'
  | 'Run_Haste'
  | 'Attack_P_1'
  | 'Attack_P_2'
  | 'Attack_P_3'
  | 'Idle_Base'
  | 'Spell4_End'
  | 'Spell4_End_To_Idle'
  | 'Spell4_End_To_Run'
  | 'Spell3_Attack'
  | 'Spell1'
  | 'Run_In'
  | 'Spell3_Dash_to_Idle'
  | 'Spell3_Run'
  | 'Spell3_Dash_to_Run'
  | 'Spell1_To_Idle'
  | 'Attack_Tower'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'Recall'
  | 'Respawn'
  | 'Attack3'
  | 'Dance_Loop'
  | 'Crit'
  | 'Taunt_loop'
  | 'ekko_skin19_spell1_catch'
  | 'Run_Variant1'
  | 'Run_Homeguard_IN'
  | 'Run_Variant2'
  | 'ekko_skin19_idlein_fromrun03'
  | 'Run_Variant3'
  | 'ekko_skin19_idlein'
  | 'ekko_skin19_idlein_02'
  | 'Idle_Variant01'
  | 'Idle_Variant02'
  | 'ekko_skin19_dance_2'
  | 'Recall_Winddown'
  | 'ekko_skin19_run_to_walk'
  | 'ekko_skin19_run_variant01'
  | 'Run_Spell3_to_Fast'
  | 'Spell2_To_Run'
  | 'Spell2_To_Idle'
  | 'ekko_skin19_spell2_cast_to_walk'
  | 'ekko_skin19_attack_p_2_end'
  | 'Spell1_To_Walk'
  | 'Spell4_end_to_walk'
  | 'Idle_IN_homeguard'
  | 'Run_Passive_In'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Bat2World} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Stair_Main} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ekko_Skin19_Body_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ekko_Skin19_Weapon_TX}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ekko_Skin19_BackHair_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Ekko_Skin19_QProp_TX}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Ekko_Skin19_Recall_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
