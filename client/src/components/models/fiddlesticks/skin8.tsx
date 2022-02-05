import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Scythe: THREE.Bone
    Root: THREE.Bone
    R_Shoulder_Pad: THREE.Bone
    R_Sword: THREE.Bone
    L_Sword: THREE.Bone
    L_Shoulder_Pad: THREE.Bone
    Jaw_Part: THREE.Bone
    Back_Part: THREE.Bone
    Lantern1: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Lantern_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    R_Clavicle_Snap: THREE.Bone
    L_Clavicle_Snap: THREE.Bone
    R_Hand_Snap: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Weapon: THREE.MeshBasicMaterial
    Lantern: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'fiddlesticks_attack1_a.fiddlesticksrework'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_In'
  | 'Death'
  | 'fiddlesticks_idle1.fiddlesticksrework'
  | 'fiddlesticks_idle2_in.fiddlesticksrework'
  | 'fiddlesticks_idle3_in.fiddlesticksrework'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Spell3_Long'
  | 'Run_Haste'
  | 'fiddlesticks_spell2_channel.fiddlesticksrework'
  | 'Spell2_Hit'
  | 'IdleIn'
  | 'Spell3_ToIdle'
  | 'Spell2_Hit_ToIdle'
  | 'fiddlesticks_attack_melee_1_a.fiddlesticksrework'
  | 'fiddlesticks_spell4_run.fiddlesticksrework'
  | 'fiddlesticks_spell2_hit_to_run.fiddlesticksrework'
  | 'Spell2_ToRun'
  | 'fiddlesticks_spell1_to_run_0.fiddlesticksrework'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'fiddlesticks_spell1_to_run_180.fiddlesticksrework'
  | 'fiddlesticks_spell1_to_run_-180.fiddlesticksrework'
  | 'Attack1_To_Run_0'
  | 'Attack1_To_Run_90'
  | 'Attack1_To_Run_-90'
  | 'fiddlesticks_attack2_to_run_0.fiddlesticksrework'
  | 'Attack2_To_Run_90'
  | 'Attack2_To_Run_-90'
  | 'fiddlesticks_attack1_b.fiddlesticksrework'
  | 'fiddlesticks_attack2_a.fiddlesticksrework'
  | 'fiddlesticks_attack2_b.fiddlesticksrework'
  | 'fiddlesticks_attack_melee_2_a.fiddlesticksrework'
  | 'fiddlesticks_attack_melee_1_to_run.fiddlesticksrework'
  | 'fiddlesticks_attack_melee_2_to_run.fiddlesticksrework'
  | 'fiddlesticks_attack_melee_2_b.fiddlesticksrework'
  | 'fiddlesticks_attack_melee_1_b.fiddlesticksrework'
  | 'Spell4_ToRun'
  | 'fiddlesticks_idle2_loop.fiddlesticksrework'
  | 'fiddlesticks_idle3_loop.fiddlesticksrework'
  | 'Run_Variation'
  | 'fiddlesticks_spell3_to_run_0.fiddlesticksrework'
  | 'Spell3_to_Run_-90'
  | 'Spell3_to_Run_90'
  | 'fiddlesticks_spell3_to_run_-179.fiddlesticksrework'
  | 'fiddlesticks_spell3_to_run_179.fiddlesticksrework'
  | 'fiddlesticks_skin08_spell3_mid.fiddlesticksrework'
  | 'fiddlesticks_skin08_spell3_short.fiddlesticksrework'
  | 'fiddlesticks_spell4_nomove.fiddlesticksrework'
  | 'Respawn'
  | 'fiddlesticks_death_effigies.fiddlesticksrework'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Attack2_ToIdle'
  | 'Attack1_ToIdle'
  | 'Spell1_ToIdle'
  | 'fiddlesticks_spell2_channel_toidle.fiddlesticksrework'
  | 'fiddlesticks_spell4_nomove_toidle.fiddlesticksrework'
  | 'Run_In'
  | 'Crit_ToIdle'
  | 'Dance_Loop'
  | 'Joke'
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
        <primitive object={nodes.Scythe} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Shoulder_Pad} />
        <primitive object={nodes.R_Sword} />
        <primitive object={nodes.L_Sword} />
        <primitive object={nodes.L_Shoulder_Pad} />
        <primitive object={nodes.Jaw_Part} />
        <primitive object={nodes.Back_Part} />
        <primitive object={nodes.Lantern1} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Lantern_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.R_Clavicle_Snap} />
        <primitive object={nodes.L_Clavicle_Snap} />
        <primitive object={nodes.R_Hand_Snap} />
        <primitive object={nodes.True_World} />
      </group>
      <group position={[-111.84, -43.05, -151.88]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Lantern}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
