import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Rocket_Launcher_World: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Train_Root: THREE.Bone
    Gift1: THREE.Bone
    Gift2: THREE.Bone
    Fat_Root: THREE.Bone
    Thin_Root: THREE.Bone
    Track_Root: THREE.Bone
  }
  materials: {
    Skin13_MAT: THREE.MeshBasicMaterial
    Skin13_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack5'
  | 'Attack6'
  | 'Channel_Wndup'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Death'
  | 'jinx_rlauncher_drecall'
  | 'jinx_rlauncher_drecall_in'
  | 'jinx_rlauncher_drecall_out'
  | 'Emote_Enter_Minigun'
  | 'Emote_Enter_Rocket'
  | 'Emote_Exit_Minigun'
  | 'Emote_Exit_Rocket'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'jinx_minigun_idle3'
  | 'jinx_joke3'
  | 'Laugh_Breath'
  | 'Laugh_In'
  | 'Laugh_Loop'
  | 'jinx_buffbone_swap'
  | 'jinx_rlauncher_attack1'
  | 'jinx_rlauncher_attack2'
  | 'jinx_rlauncher_death'
  | 'jinx_rlauncher_run'
  | 'jinx_rlauncher_idle1'
  | 'jinx_rlauncher_idle2'
  | 'jinx_rlauncher_idle3'
  | 'jinx_rlauncher_run2'
  | 'jinx_rlauncher_runhaste'
  | 'jinx_rlauncher_run_in'
  | 'jinx_rlauncher_spell2'
  | 'jinx_rlauncher_spell3'
  | 'jinx_rlauncher_spell4'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Rlauncher_Death'
  | 'Rlauncher_Idlein1'
  | 'Rlauncher_Spell3'
  | 'Run_Base'
  | 'Run_Homeguard'
  | 'Run_Homeguard_OUT'
  | 'Run_Fast'
  | 'jinx_minigun_run_in'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3_Run'
  | 'Spell4'
  | 'Stunned'
  | 'Taunt_Base'
  | 'Channel'
  | 'IdleIn1'
  | 'Idlein2'
  | 'Respawn'
  | 'Run_Haste'
  | 'launcher_spell1_weapon2'
  | 'launcher_spell1_weapon'
  | 'minigun_spell1_weapon2'
  | 'minigun_spell1_weapon_gunonly'
  | 'jinx_taunt2'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Rocket_Launcher_World} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Train_Root} />
        <primitive object={nodes.Gift1} />
        <primitive object={nodes.Gift2} />
        <primitive object={nodes.Fat_Root} />
        <primitive object={nodes.Thin_Root} />
        <primitive object={nodes.Track_Root} />
      </group>
      <group position={[-165.78, -16.92, -165.78]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin13_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin13_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
