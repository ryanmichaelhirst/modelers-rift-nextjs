import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Root_Lower: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Boomerang: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Hat2World: THREE.Bone
  }
  materials: {
    Dino_Gnar: THREE.MeshBasicMaterial
    Dino_Gnar_Angry_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'gnar_attack1'
  | 'gnar_attack2'
  | 'gnar_run2'
  | 'gnar_idle1'
  | 'Spell3'
  | 'Spell4'
  | 'Spell2'
  | 'gnar_spell1'
  | 'Run_Base'
  | 'gnar_idlerage'
  | 'IdleRage_2'
  | 'gnar_rage1_move'
  | 'Rage1_Run'
  | 'gnar_idle_tantrum'
  | 'Idle1_Alt_A'
  | 'Idle1_Alt_B'
  | 'Run1_In'
  | 'Spell3_Bounce'
  | 'gnar_idle1_in'
  | 'gnar_revert'
  | 'Idle2_In'
  | 'Channel_Wndup'
  | 'gnar_skin01_taunt_hood'
  | 'Joke'
  | 'Death'
  | 'gnar_spell1_0'
  | 'gnar_spell1_180'
  | 'gnar_spell1_-180'
  | 'gnar_spell1_90'
  | 'gnar_spell1_-90'
  | 'gnar_dance_loop'
  | 'gnar_spell3_bounce'
  | 'Dance_In'
  | 'Idle1_In2'
  | 'Channel'
  | 'Spell1_Catch'
  | 'Idle1_Alt_C'
  | 'gnar_laugh'
  | 'gnar_crit1'
  | 'gnar_crit2'
  | 'Recall'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'gnar_attack1_fast'
  | 'gnar_attack2_fast'
  | 'Scale_Base'
  | 'Revert_Scale'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Stunned'
  | 'KnockUp_In'
  | 'KnockUp_Loop'
  | 'Dance_Start'
  | 'gnar_skin01_bind'
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
        <primitive object={nodes.Root_Upper} />
        <primitive object={nodes.Root_Lower} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Boomerang} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Hat2World} />
      </group>
      <group position={[-72.55, -66.75, -120.19]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Dino_Gnar}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Dino_Gnar_Angry_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
