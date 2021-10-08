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
    Train_Middle: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Recall_Root: THREE.Bone
    Weapon_World: THREE.Bone
    Weapon_Body_Skin05_World: THREE.Bone
  }
  materials: {
    Train: THREE.MeshBasicMaterial
    Armor: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Platform: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sion_skin05_spell4_run'
  | 'Idle_In'
  | 'Attack_Tower'
  | 'Spell4'
  | 'Spell4_Hit'
  | 'sion_skin05_spell4_runin'
  | 'Spell4_Stop'
  | 'Run_Slow'
  | 'sion_skin05_spell4_override_shake'
  | 'Crit'
  | 'Death'
  | 'Joke'
  | 'Spell1'
  | 'Spell3'
  | 'Attack2'
  | 'Run'
  | 'Attack1'
  | 'Idle1_Base'
  | 'Spell1_Chrg'
  | 'Passive_Attack1'
  | 'Passive_Attack2'
  | 'Passive_Idle1'
  | 'Passive_Run'
  | 'Spell1_Hit1'
  | 'Spell1_Hit2'
  | 'Attack3'
  | 'Run_Fast'
  | 'Run_Homeguard'
  | 'Passive_Death'
  | 'Stunned'
  | 'sion_skin05_passive_run'
  | 'Laugh'
  | 'sion_knockedup'
  | 'Passive_Dash'
  | 'Recall'
  | 'Attack_Tower2'
  | 'Spell2_B'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Idle2_Base'
  | 'KnockedUp_In'
  | 'Passive_Dance_IN'
  | 'Passive_Dance_LOOP'
  | 'Respawn'
  | 'EngineSpin'
  | 'sion_skin05_channel_windup_in'
  | 'sion_skin05_channel_windup'
  | 'Channel_In'
  | 'Channel_Base'
  | 'Recall_Winddown'
  | 'sion_skin05_idlespine_base'
  | 'sion_skin05_idlespinedummy_base'
  | 'Run_Haste_In'
  | 'sion_skin05_haste_torun'
  | 'sion_skin05_haste_toidle'
  | 'Run_In'
  | 'Taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Train_Middle} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Weapon_Body_Skin05_World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Train} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Armor} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Body} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Platform}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
