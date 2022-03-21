import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Rocket_Launcher_World: THREE.Bone
  }
  materials: {
    Jinx_Base_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'jinx_minigun_idle3'
  | 'Run_Base'
  | 'Spell2'
  | 'jinx_rlauncher_run'
  | 'Spell3_Run'
  | 'Spell4'
  | 'Channel_Wndup'
  | 'Attack1'
  | 'Attack2'
  | 'jinx_rlauncher_idle1'
  | 'jinx_rlauncher_idle2'
  | 'jinx_rlauncher_idle3'
  | 'jinx_rlauncher_run2'
  | 'jinx_rlauncher_attack1'
  | 'jinx_rlauncher_attack2'
  | 'jinx_rlauncher_death'
  | 'jinx_minigun_run_in'
  | 'IdleIn1'
  | 'Rlauncher_Idlein1'
  | 'jinx_rlauncher_spell4'
  | 'jinx_rlauncher_spell2'
  | 'Rlauncher_Spell3'
  | 'jinx_rlauncher_spell3'
  | 'minigun_spell1_weapon_gunonly'
  | 'minigun_spell1_weapon2'
  | 'launcher_spell1_weapon'
  | 'launcher_spell1_weapon2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack5'
  | 'Attack6'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'jinx_rlauncher_run_in'
  | 'Recall_LeadIn'
  | 'Recall_Leadout'
  | 'jinx_rlauncher_recall'
  | 'Emote_Enter_Minigun'
  | 'Emote_Enter_Rocket'
  | 'Emote_Exit_Minigun'
  | 'Emote_Exit_Rocket'
  | 'Taunt_Base'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Idlein2'
  | 'Run_Fast'
  | 'jinx_joke3'
  | 'Laugh_In'
  | 'Laugh_Loop'
  | 'Channel'
  | 'jinx_taunt2'
  | 'Spell3'
  | 'Stunned'
  | 'Laugh_Breath'
  | 'Run_Haste'
  | 'jinx_rlauncher_runhaste'
  | 'jinx_rlauncher_drecall'
  | 'jinx_rlauncher_drecall_in'
  | 'jinx_rlauncher_drecall_out'
  | 'Rlauncher_Death'
  | 'jinx_buffbone_swap'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Rocket_Launcher_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jinx_Base_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-49.35, -0.16, -110.71]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
