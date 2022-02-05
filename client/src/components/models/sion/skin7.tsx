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
      <group position={[-138.22, -47.77, -157.76]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Train}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Armor}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Platform}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
