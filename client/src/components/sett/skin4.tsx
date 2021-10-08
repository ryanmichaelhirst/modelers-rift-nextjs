import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Photo: THREE.Bone
  }
  materials: {
    Sett_Skin01_MAT: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Idle_Base'
  | 'sett_attack2'
  | 'sett_attack1'
  | 'Spell4_Base'
  | 'IdleReady'
  | 'Death'
  | 'Run_Haste'
  | 'sett_spell2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Run_Slow'
  | 'Laugh'
  | 'sett_joke'
  | 'Dance_Base'
  | 'sett_spell2_into_run'
  | 'Crit'
  | 'Spell3'
  | 'Spell1_B'
  | 'Spell1_A'
  | 'sett_runboots'
  | 'sett_idlereadyin'
  | 'sett_attack1_passive'
  | 'Spell4_Dash'
  | 'Spell4_End'
  | 'Spell3_Back'
  | 'Spell3_Front'
  | 'sett_attack2_passive'
  | 'Run_Homeguard'
  | 'Run_Passive'
  | 'sett_rage'
  | 'sett_rage_add'
  | 'sett_idlevar1'
  | 'Idle_Variant2'
  | 'Spell3_Both'
  | 'Respawn'
  | 'Attack1_Passive_Into_Idle'
  | 'Spell4_Spin'
  | 'Spell4_PowerBomb'
  | 'Spell2_Strong'
  | 'Attack2_Passive_Into_Idle'
  | 'Spell2_Into_Idle'
  | 'Spell2_Into_Run_Left'
  | 'Spell2_Into_Run_Right'
  | 'Spell1_B_Into_Idle'
  | 'Spell3_Miss_Idle'
  | 'sett_passive_into_run'
  | 'Attack1_Passive_Start'
  | 'Attack2_Passive_Start'
  | 'Attack1_Start'
  | 'Attack2_Start'
  | 'Spell1_B_Into_Run'
  | 'Spell2_Strong_Into_Idle'
  | 'Spell4_CC_Immune'
  | 'Crit_Passive_Start'
  | 'sett_run_variation'
  | 'Spell3_Miss_Into_Run'
  | 'Spell4_Grab'
  | 'Spell3_Both_Into_Idle'
  | 'Spell3_Front_Into_Idle'
  | 'Spell3_Back_Into_Idle'
  | 'Spell2_Into_Run_Left180'
  | 'Spell2_Into_Run_Right180'
  | 'sett_run_into_boots'
  | 'Crit_Passive_Hit'
  | 'sett_dance_var'
  | 'Dance_Start'
  | 'Dance_Spam'
  | 'sett_dance'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Photo} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sett_Skin01_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Joke} skeleton={nodes.mesh_0_1.skeleton} />
    </group>
  )
}
