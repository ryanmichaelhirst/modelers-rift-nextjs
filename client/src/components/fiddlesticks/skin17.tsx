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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    Cake_Root: THREE.Bone
    Root: THREE.Bone
    Buffbone_Lantern_Loc: THREE.Bone
    Scythe: THREE.Bone
    Tongue_Roll1: THREE.Bone
    Lantern1: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    R_Hand_Snap: THREE.Bone
    True_World: THREE.Bone
    Ball1: THREE.Bone
    Ball2: THREE.Bone
    Poro_Root: THREE.Bone
  }
  materials: {
    Cake: THREE.MeshBasicMaterial
    Joke_Off: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Tongue_Roll: THREE.MeshBasicMaterial
    Lantern: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    R_Demon_Arm: THREE.MeshBasicMaterial
    L_Demon_Arm: THREE.MeshBasicMaterial
    Tongue: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
    Poro: THREE.MeshBasicMaterial
    Hat: THREE.MeshBasicMaterial
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

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Cake_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Lantern_Loc} />
        <primitive object={nodes.Scythe} />
        <primitive object={nodes.Tongue_Roll1} />
        <primitive object={nodes.Lantern1} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.R_Hand_Snap} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Ball1} />
        <primitive object={nodes.Ball2} />
        <primitive object={nodes.Poro_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Cake} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Joke_Off}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Body} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Tongue_Roll}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Lantern} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.R_Demon_Arm}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.L_Demon_Arm}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Tongue} skeleton={nodes.mesh_0_8.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_9.geometry} material={materials.Joke} skeleton={nodes.mesh_0_9.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_10.geometry} material={materials.Poro} skeleton={nodes.mesh_0_10.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_11.geometry} material={materials.Hat} skeleton={nodes.mesh_0_11.skeleton} />
    </group>
  )
}
