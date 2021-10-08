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
    Root: THREE.Bone
    L_Cape1_Ground: THREE.Bone
    R_Cape1_Ground: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    EnergySnake_Main: THREE.Bone
    C_Scroll1: THREE.Bone
    SpeakerA_Main: THREE.Bone
    Guitar: THREE.Bone
    SpeakerB_Main: THREE.Bone
  }
  materials: {
    Pyke_Skin16_MAT: THREE.MeshBasicMaterial
    Pyke_Skin16_ShoulderProjection_MAT: THREE.MeshBasicMaterial
    Cape_Projection_MAT: THREE.MeshBasicMaterial
    Pyke_Base_Scroll_Mat: THREE.MeshBasicMaterial
    Skin16_WeaponHandle_MAT: THREE.MeshBasicMaterial
    Pyke_Skin16_EnergySnake_MAT: THREE.MeshBasicMaterial
    Skin16_DefaultWeapon_Mat: THREE.MeshBasicMaterial
    Skin16_Q_Harpoon_VariantWeapon_MAT: THREE.MeshBasicMaterial
    Skin16_Q_SpearWeapon_MAT: THREE.MeshBasicMaterial
    Skin16_ChainA_MAT: THREE.MeshBasicMaterial
    Skin16_ChainB_MAT: THREE.MeshBasicMaterial
    Pyke_Skin16_EmoteProps_MAT: THREE.MeshBasicMaterial
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
  | 'Laugh'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Idle_In'
  | 'Spell2_Move'
  | 'Spell2_Idle'
  | 'pyke_spell2_exit2move'
  | 'Spell1_Long_NoMove'
  | 'Spell1_Long_Move'
  | 'Spell1_Short_Hit'
  | 'Spell1_Long_Hit'
  | 'Spell1_Short_Hit_ToRun'
  | 'pyke_spell4_hit'
  | 'Spell1_Long_Hook_ToRun'
  | 'Spell1_Short_Hit_ToIdle'
  | 'Spell1_Long_Hook_ToIdle'
  | 'Spell1_Long_Hook_Move'
  | 'pyke_spell1_long_hook'
  | 'Run_In'
  | 'Spell4_ToRun'
  | 'Run_Haste'
  | 'Spell4_Hit_ToRun'
  | 'Spell4_ToIdle'
  | 'Spell4_Hit_ToIdle'
  | 'Spell4_Hit_Move'
  | 'pyke_skin16_recall'
  | 'Spell3_Move'
  | 'Spell3_Hit'
  | 'Spell3_Hit_ToRun'
  | 'Spell3_Idle'
  | 'pyke_spell2_exit2idle'
  | 'Respawn'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Spell3_hit_toIdle'
  | 'Recall_Winddown'
  | 'Spell1_Long_Hit_ToIdle'
  | 'Spell1_Long_NoMove_ToIdle'
  | 'Spell1_Long_Move_ToRun'
  | 'Spell2_Move2Idle'
  | 'Spell2_Exit2Spell1'
  | 'Spell1_Long_Hook_Move_ToRun'
  | 'Spell1_Long_Hit_ToRun'
  | 'Run_Slow'
  | 'Taunt'
  | 'Joke'
  | 'Run_In_Switch'
  | 'Run_Switch_Back'
  | 'pyke_idle_in_switchback'
  | 'pyke_skin16_turn_l'
  | 'pyke_skin16_turn_0'
  | 'pyke_skin16_turn_r'
  | 'Spell3_Hit_ToRunFast'
  | 'pyke_spell2_exit2runfast'
  | 'Spell1_Long_Hook_ToRun_Fast'
  | 'Spell1_Long_Move_ToRun_Fast'
  | 'Spell1_Short_Hit_ToRun_Fast'
  | 'Spell1_Long_Hit_ToRun_Fast'
  | 'Spell1_Long_Hook_Move_ToRun_Fast'
  | 'Spell4_Hit_toRunFast'
  | 'Spell4_Torunfast'
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
        <primitive object={nodes.L_Cape1_Ground} />
        <primitive object={nodes.R_Cape1_Ground} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.EnergySnake_Main} />
        <primitive object={nodes.C_Scroll1} />
        <primitive object={nodes.SpeakerA_Main} />
        <primitive object={nodes.Guitar} />
        <primitive object={nodes.SpeakerB_Main} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Pyke_Skin16_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Pyke_Skin16_ShoulderProjection_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Cape_Projection_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Pyke_Base_Scroll_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin16_WeaponHandle_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Pyke_Skin16_EnergySnake_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Skin16_DefaultWeapon_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Skin16_Q_Harpoon_VariantWeapon_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Skin16_Q_SpearWeapon_MAT}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Skin16_ChainA_MAT}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Skin16_ChainB_MAT}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Pyke_Skin16_EmoteProps_MAT}
        skeleton={nodes.mesh_0_11.skeleton}
      />
    </group>
  )
}
