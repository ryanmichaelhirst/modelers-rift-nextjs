import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Scythe: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Lantern_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Lantern1: THREE.Bone
    Cake_Root: THREE.Bone
    Tongue_Roll1: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Lantern: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'fiddlesticks_skin06_attack1_a.fiddlesticksrework'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'fiddlesticks_skin06_idle1.fiddlesticksrework'
  | 'fiddlesticks_skin06_idle2_in.fiddlesticksrework'
  | 'fiddlesticks_skin06_idle3_in.fiddlesticksrework'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Spell3_Long'
  | 'Run_Haste'
  | 'fiddlesticks_skin06_spell2_channel.fiddlesticksrework'
  | 'Spell2_Hit'
  | 'IdleIn'
  | 'Spell3_ToIdle'
  | 'Spell2_Hit_ToIdle'
  | 'fiddlesticks_skin06_attack_melee_1_a.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell4_run.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell2_hit_to_run.fiddlesticksrework'
  | 'Spell2_ToRun'
  | 'fiddlesticks_skin06_spell1_to_run_0.fiddlesticksrework'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'fiddlesticks_skin06_spell1_to_run_180.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell1_to_run_-180.fiddlesticksrework'
  | 'Attack1_To_Run_0'
  | 'Attack1_To_Run_90'
  | 'Attack1_To_Run_-90'
  | 'fiddlesticks_skin06_attack2_to_run_0.fiddlesticksrework'
  | 'Attack2_To_Run_90'
  | 'Attack2_To_Run_-90'
  | 'fiddlesticks_skin06_attack1_b.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack2_a.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack2_b.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack_melee_2_a.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack_melee_1_to_run.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack_melee_2_to_run.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack_melee_2_b.fiddlesticksrework'
  | 'fiddlesticks_skin06_attack_melee_1_b.fiddlesticksrework'
  | 'Spell4_ToRun'
  | 'fiddlesticks_skin06_idle2_loop.fiddlesticksrework'
  | 'fiddlesticks_skin06_idle3_loop.fiddlesticksrework'
  | 'Run_Variation'
  | 'fiddlesticks_skin06_spell3_to_run_0.fiddlesticksrework'
  | 'Spell3_to_Run_-90'
  | 'Spell3_to_Run_90'
  | 'fiddlesticks_skin06_spell3_to_run_-179.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell3_to_run_179.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell3_mid.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell3_short.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell4_nomove.fiddlesticksrework'
  | 'Respawn'
  | 'fiddlesticks_skin06_death_effigies.fiddlesticksrework'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Attack2_ToIdle'
  | 'Attack1_ToIdle'
  | 'Spell1_ToIdle'
  | 'fiddlesticks_skin06_spell2_channel_toidle.fiddlesticksrework'
  | 'fiddlesticks_skin06_spell4_nomove_toidle.fiddlesticksrework'
  | 'Run_In'
  | 'Crit_ToIdle'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Joke'
  | 'fiddlesticks_supriseparty_taunt.fiddlesticksrework'
  | 'Taunt_loop'
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
        <primitive object={nodes.Scythe} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Lantern_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Lantern1} />
        <primitive object={nodes.Cake_Root} />
        <primitive object={nodes.Tongue_Roll1} />
      </group>
      <group position={[-172.03, -26.38, -144.75]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Lantern}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
