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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_BUFFBONE_CSTM_HEALTHBAR: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    L_CapeB1_Grnd: THREE.Bone
    R_CapeB1_Grnd: THREE.Bone
    R_CapeA1_Grnd: THREE.Bone
    L_CapeA1_Grnd: THREE.Bone
    Ult_Weapon_Main: THREE.Bone
    Suit_Root: THREE.Bone
    Recall_Platform: THREE.Bone
  }
  materials: {
    Vayne_Body_MAT: THREE.MeshBasicMaterial
    Vayne_Glassq_MAT: THREE.MeshBasicMaterial
    Vayne_Cape_MAT: THREE.MeshBasicMaterial
    Suit_Mat: THREE.MeshBasicMaterial
    Door_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack_Tumble'
  | 'Attack_Ult'
  | 'Attack_TumbleUlt'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Crit'
  | 'Dance_In'
  | 'Death_In'
  | 'Idle01'
  | 'Idle02'
  | 'idle_tumble.pie_c_legacy_bugs_2021'
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Laugh'
  | 'Run_Base'
  | 'Run_Tumble'
  | 'Run_Ult'
  | 'run_tumble_ult.pie_c_legacy_bugs_2021'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt_In'
  | 'Attack3'
  | 'Attack4'
  | 'Attack1_ToIdle'
  | 'attack_torun02.pie_c_legacy_bugs_2021'
  | 'Attack2_ToIdle'
  | 'attack_torun01.pie_c_legacy_bugs_2021'
  | 'attack03_toidle.pie_c_legacy_bugs_2021'
  | 'attack04_toidle.pie_c_legacy_bugs_2021'
  | 'attack_ult01_toidle.pie_c_legacy_bugs_2021'
  | 'Crit_ToIdle'
  | 'attack01_toidle.pie_c_legacy_bugs_2021'
  | 'attack_ult01_torun.pie_c_legacy_bugs_2021'
  | 'attack1_tumble_to_idle.pie_c_legacy_bugs_2021'
  | 'attack1_tumble_to_run.pie_c_legacy_bugs_2021'
  | 'Spell3_To_Idle'
  | 'Idle_In'
  | 'homeguard.pie_c_legacy_bugs_2021'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'ult_run_toidle.pie_c_legacy_bugs_2021'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'runtumble_to_idletumble.pie_c_legacy_bugs_2021'
  | 'runtumble_to_run.pie_c_legacy_bugs_2021'
  | 'idletumble_to_idle.pie_c_legacy_bugs_2021'
  | 'spell1_ult.pie_c_legacy_bugs_2021'
  | 'joke_mid.pie_c_legacy_bugs_2021'
  | 'Death_Loop'
  | 'attack1_tumble_to_idle_ult.pie_c_legacy_bugs_2021'
  | 'attack1_tumble_to_run_ult.pie_c_legacy_bugs_2021'
  | 'runtumble_to_idletumble_ult.pie_c_legacy_bugs_2021'
  | 'runtumble_to_run_ult.pie_c_legacy_bugs_2021'
  | 'idletumble_to_idle_ult.pie_c_legacy_bugs_2021'
  | 'spell1_to_run_tumble.pie_c_legacy_bugs_2021'
  | 'spell1_to_run_tumble_ult.pie_c_legacy_bugs_2021'
  | 'Spell3_To_Run'
  | 'spell3_to_idle_tumble.pie_c_legacy_bugs_2021'
  | 'spell3_to_run_tumble.pie_c_legacy_bugs_2021'
  | 'Taunt_loop'
  | 'Recall'
  | 'Recall_Winddown'
  | 'idle03.pie_c_legacy_bugs_2021'
  | 'Run_Homeguard_IN'
  | 'Spell4_Idle'
  | 'Spell4_Run'
  | 'Respawn'
  | 'Dance_Loop'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BUFFBONE_CSTM_HEALTHBAR} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.L_CapeB1_Grnd} />
        <primitive object={nodes.R_CapeB1_Grnd} />
        <primitive object={nodes.R_CapeA1_Grnd} />
        <primitive object={nodes.L_CapeA1_Grnd} />
        <primitive object={nodes.Ult_Weapon_Main} />
        <primitive object={nodes.Suit_Root} />
        <primitive object={nodes.Recall_Platform} />
      </group>
      <group position={[-174.09, -7.16, -119.33]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Vayne_Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Vayne_Glassq_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Vayne_Cape_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Suit_Mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Door_Mat}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}
