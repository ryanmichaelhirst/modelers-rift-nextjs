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
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    True_World: THREE.Bone
    Buffbone_CSTM_Orb_Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
    RecallBook_Book_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    TongueTeeth: THREE.MeshBasicMaterial
    BodyBook: THREE.MeshBasicMaterial
    Hat: THREE.MeshBasicMaterial
    Glass: THREE.MeshBasicMaterial
    Zoe_Base_Yoyo_Mat: THREE.MeshBasicMaterial
    Zoe_Base_IceCream_Mat: THREE.MeshBasicMaterial
    Zoe_Base_Jumprope_Mat: THREE.MeshBasicMaterial
    Zoe_Base_TennisRac_Mat: THREE.MeshBasicMaterial
    Book_Cover: THREE.MeshBasicMaterial
    Book_Page: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'zoe_attack1'
  | 'Empowered_Attack'
  | 'zoe_empowered_to_idle'
  | 'Empowered_Attack_to_Run'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'zoe_idle3'
  | 'Idle_In1'
  | 'Idle_to_HasteRun'
  | 'Idle_To_Run'
  | 'Joke_Loop'
  | 'Joke_Start'
  | 'Laugh'
  | 'Orbs'
  | 'Orbs_Into'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run01'
  | 'Runhomeguard_Out'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Slow'
  | 'Run_Variant01'
  | 'Run_Variant01_to_Run'
  | 'Run_Variant02'
  | 'Run_Variant02_to_Run'
  | 'Runhomeguard_Into'
  | 'zoe_skippingrope_idle01'
  | 'zoe_skippingrope_idle02'
  | 'zoe_skippingrope_into'
  | 'SkippingRope_Run01'
  | 'Spell1_-180'
  | 'Spell1_-90'
  | 'Spell1_180'
  | 'Spell1_90'
  | 'spell1_b_-180'
  | 'spell1_b_-90'
  | 'spell1_b_180'
  | 'spell1_b_90'
  | 'spell1_b_base'
  | 'spell1_b_to_idle'
  | 'spell1_b_to_run'
  | 'spell1_base'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Spell2'
  | 'Spell2_Missile2_-180'
  | 'Spell2_Missile2_-90'
  | 'Spell2_Missile2_180'
  | 'Spell2_Missile2_90'
  | 'zoe_spell2_missile2'
  | 'Spell2_Missile2_To_HasteRun'
  | 'Spell2_Missile2_To_Idle'
  | 'Spell2_Missile_-180'
  | 'Spell2_Missile_-90'
  | 'Spell2_Missile_180'
  | 'Spell2_Missile_90'
  | 'zoe_spell2_missile'
  | 'zoe_spell2_missile1_to_hasterun'
  | 'Spell2_Missile_To_Idle'
  | 'Spell3'
  | 'Spell3_To_Run'
  | 'Spell3_To_Idle'
  | 'Spell4'
  | 'Spell4_Exit'
  | 'Spell4_Exit_to_Run'
  | 'Taunt'
  | 'Tpose'
  | 'YoYo_Attack1'
  | 'YoYo_Idlein01'
  | 'zoe_into_yoyo_idle1'
  | 'YoYo_Idle_To_Run'
  | 'Dance_Loop'
  | 'Dance_Start'
  | 'Idle_In2'
  | 'Idle_In3'
  | 'Spell4_Enter'
  | 'YoYo_Idle02'
  | 'YoYo_Idle01'
  | 'zoe_yoyo_run01'
  | 'Spell4_B'
  | 'Spell4_Exit_B'
  | 'zoe_taunt'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Buffbone_CSTM_Orb_Root} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.RecallBook_Book_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.TongueTeeth}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.BodyBook}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Hat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Glass}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Zoe_Base_Yoyo_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Zoe_Base_IceCream_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Zoe_Base_Jumprope_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Zoe_Base_TennisRac_Mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Book_Cover}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Book_Page}
        skeleton={nodes.mesh_0_10.skeleton}
      />
    </group>
  )
}
