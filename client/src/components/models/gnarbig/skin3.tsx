import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Snowman_Base: THREE.Bone
    Root: THREE.Bone
    Rock: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Cstm_Ground: THREE.Bone
    R_Buffbone_Cstm_Ground: THREE.Bone
  }
  materials: {
    Snowman: THREE.MeshBasicMaterial
    blinn4: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall'
  | 'Recall_Winddown'
  | 'Idle1_Base'
  | 'gnarbig_spell1'
  | 'gnarbig_attack1'
  | 'gnarbig_attack2'
  | 'Crit_Base'
  | 'Spell3'
  | 'Rage_Stop'
  | 'Rage_Move'
  | 'Taunt_Base'
  | 'Joke'
  | 'Idle1_Alt_A'
  | 'Rage_Scale'
  | 'Rage_Scale_Base'
  | 'gnarbig_spell3_trans'
  | 'gnarbig_spell1_trans'
  | 'Spell1_Scale'
  | 'Spell1_Scale_Base'
  | 'gnarbig_spell2_tran'
  | 'Spell4_Base'
  | 'gnarbig_spell4_trans'
  | 'gnarbig_spell2'
  | 'gnarbig_spell4'
  | 'Run_Base'
  | 'Idle1_In'
  | 'Run_ALT_A'
  | 'Run_ALT_B'
  | 'Spell2_Back'
  | 'Dance_Base'
  | 'Laugh'
  | 'Channel_In'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'gnarbig_crit'
  | 'Run_In'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'Spell1_0'
  | 'Dance_In'
  | 'gnarbig_turret_attack_fast'
  | 'gnarbig_turret_attack01'
  | 'gnarbig_death'
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
        <primitive object={nodes.Snowman_Base} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Rock} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Cstm_Ground} />
        <primitive object={nodes.R_Buffbone_Cstm_Ground} />
      </group>
      <group position={[-158.34, -44.85, -150.3]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Snowman}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.blinn4}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
