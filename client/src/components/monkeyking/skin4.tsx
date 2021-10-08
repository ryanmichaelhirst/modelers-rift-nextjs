import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    weapon: THREE.Bone
    weapon_a_bend1: THREE.Bone
    weapon_a_bend2: THREE.Bone
    weapon_a_bend3: THREE.Bone
    weapon_a_bend4: THREE.Bone
    weapon_b_bend1: THREE.Bone
    weapon_b_bend2: THREE.Bone
    weapon_b_bend3: THREE.Bone
    weapon_b_bend4: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    blinn1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'monkeyking_attack1_60fps'
  | 'monkeyking_attack2'
  | 'Channel_Base'
  | 'monkeyking_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'monkeyking_idle3'
  | 'monkeyking_idle4'
  | 'monkeyking_laugh'
  | 'monkeyking_joke'
  | 'Run_Base'
  | 'monkeyking_spell1'
  | 'monkeyking_spell2'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Idle1_Beard'
  | 'Run_Beard'
  | 'Attack2_Beard'
  | 'monkeyking_skin04_attack1_60fps_beard'
  | 'monkeyking_skin04_crit_60fps_beard'
  | 'monkeyking_skin04_spell4_60fps_beard'
  | 'Spell3_Beard'
  | 'Spell2_Beard'
  | 'Spell1_Beard'
  | 'Channel_Beard'
  | 'monkeyking_skin04_channel_windup_beard'
  | 'Dance_Beard'
  | 'monkeyking_skin04_death_60fps_beard'
  | 'Joke_Beard'
  | 'Laugh_Beard'
  | 'Taunt_Beard'
  | 'Idle2_Beard'
  | 'Idle3_Beard'
  | 'Idle4_Beard'
  | 'monkeyking_skin04_recall'
  | 'Recall_Leadout'
  | 'Recall_Loop'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.weapon_a_bend1} />
        <primitive object={nodes.weapon_a_bend2} />
        <primitive object={nodes.weapon_a_bend3} />
        <primitive object={nodes.weapon_a_bend4} />
        <primitive object={nodes.weapon_b_bend1} />
        <primitive object={nodes.weapon_b_bend2} />
        <primitive object={nodes.weapon_b_bend3} />
        <primitive object={nodes.weapon_b_bend4} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
