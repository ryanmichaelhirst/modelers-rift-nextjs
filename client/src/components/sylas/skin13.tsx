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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    ChainHolder_Root: THREE.Bone
    Recall_Building1: THREE.Bone
    Recall_Building2: THREE.Bone
    Recall_Building3: THREE.Bone
    Recall_Building4: THREE.Bone
    Recall_Building5: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Chain_R: THREE.MeshBasicMaterial
    Chain_L: THREE.MeshBasicMaterial
    Helmet: THREE.MeshBasicMaterial
    Gauntlet_L: THREE.MeshBasicMaterial
    Gauntlet_R: THREE.MeshBasicMaterial
    Lock: THREE.MeshBasicMaterial
    Recall_Building01: THREE.MeshBasicMaterial
    Recall_Building02: THREE.MeshBasicMaterial
    Recall_Building03: THREE.MeshBasicMaterial
    Recall_Building04: THREE.MeshBasicMaterial
    Recall_Building05: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1_Start'
  | 'Attack2_Start'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle_In'
  | 'Joke'
  | 'Laugh'
  | 'RunBase'
  | 'Spell2_Cast'
  | 'Spell3'
  | 'Spell4_Cast'
  | 'Taunt'
  | 'sylas_closeattack_01'
  | 'sylas_closeattack_02'
  | 'sylas_spell3_bhit_cast'
  | 'sylas_sp4channel'
  | 'sylas_into_sp4channel'
  | 'sylas_attack_01_to_runfast'
  | 'sylas_attack_1_to_run'
  | 'sylas_spell1_to_run'
  | 'Into_Run'
  | 'sylas_into_walk_2'
  | 'sylas_spell3_dash_into_run'
  | 'Spell2_Into_Run'
  | 'Spell3_Bhit'
  | 'Spell2_B'
  | 'Spell3_Bdash'
  | 'sylas_idle_var_1'
  | 'Spell3_Dash'
  | 'Spell3_Into_IDLE'
  | 'sylas_sp4channelb'
  | 'sylas_spell4_channelrun'
  | 'Spell3_Dash_Into_Run'
  | 'sylas_channel'
  | 'Spell2_Attack'
  | 'Spell1_Into_Idle'
  | 'RunFast'
  | 'Homeguard_Run'
  | 'sylas_attack_passive'
  | 'Spell2_C_TO_Run'
  | 'Spell2_C_TO_Idle'
  | 'Spell2_Into_Passive'
  | 'Spell1_Cast'
  | 'sylas_spell3_lookat_0'
  | 'sylas_spell3_lookat_90'
  | 'sylas_spell3_lookat_-90'
  | 'sylas_spell3_lookat_180'
  | 'sylas_spell3_lookat_-180'
  | 'sylas_into_sp4channelb'
  | 'sylas_attack_2_to_run'
  | 'sylas_attack_02_to_runfast'
  | 'sylas_idle_to_run'
  | 'sylas_spell4_spinult_into_run'
  | 'sylas_spell4_spinult_into_idle'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'sylas_sp4channel_into_run'
  | 'Spell4_INTO_Idle'
  | 'Spell4_Idle'
  | 'sylas_spell4_2_spell4_idle'
  | 'Attack1_End'
  | 'Attack2_End'
  | 'sylas_spell3_bhit_cast_torun'
  | 'sylas_spell3_bhit_cast_toidle'
  | 'sylas_spell4_to_run_idle'
  | 'Spell3_BHit_Close'
  | 'sylas_attack_passive_intro_default'
  | 'sylas_attack_passive_intro_passive'
  | 'sylas_recall_into_walk'
  | 'Recall_Into_FastRun'
  | 'sylas_attack_02_end'
  | 'sylas_attack_01_end'
  | 'Recall_Into_Homeguard'
  | 'Into_RunFast'
  | 'sylas_idle'
  | 'Attack2_Into_Idle'
  | 'Attack1_Into_Idle'
  | 'Dance_Windup'
  | 'Dance_Loop'
  | 'sylas_close_attack_01_to_runfast'
  | 'sylas_close_attack_02_to_runfast'
  | 'KnockUp'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.ChainHolder_Root} />
        <primitive object={nodes.Recall_Building1} />
        <primitive object={nodes.Recall_Building2} />
        <primitive object={nodes.Recall_Building3} />
        <primitive object={nodes.Recall_Building4} />
        <primitive object={nodes.Recall_Building5} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Chain_R}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Chain_L}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Helmet}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Gauntlet_L}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Gauntlet_R}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Lock}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Recall_Building01}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Recall_Building02}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Recall_Building03}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Recall_Building04}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Recall_Building05}
        skeleton={nodes.mesh_0_11.skeleton}
      />
    </group>
  )
}
