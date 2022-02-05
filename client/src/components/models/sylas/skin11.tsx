import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Statue_Root: THREE.Bone
  }
  materials: {
    Sylas_Base_Mat: THREE.MeshBasicMaterial
    hoodoff: THREE.MeshBasicMaterial
    gauntlet_left: THREE.MeshBasicMaterial
    statue: THREE.MeshBasicMaterial
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
  | 'skin08_sylas_recall.pie_c_legacy_bugs_10_6'
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
  | 'Recall_Start'
  | 'Recall_End'
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
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Statue_Root} />
      </group>
      <group position={[-75.33, -2.21, -198.89]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Sylas_Base_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.hoodoff}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.gauntlet_left}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.statue}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
