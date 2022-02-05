import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Root_Ride: THREE.Bone
  }
  materials: {
    ___Default1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'sejuani_2013_idle1'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Run3'
  | 'Spell3'
  | 'Channel_Wndup'
  | 'sejuani_2013_spell1'
  | 'Run2'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1'
  | 'Spell4'
  | 'Spell1_Hit'
  | 'Recall'
  | 'Channel'
  | 'Channel_Windup'
  | 'sejuani_2013_taunt'
  | 'sejuani_2013_laugh'
  | 'sejuani_2013_joke'
  | 'Death'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'sejuani_2013_idle_enter'
  | 'sejuani_2013_flail_loop'
  | 'Flail_Out'
  | 'sejuani_2013_flail_blank'
  | 'sejuani_2013_flail_in'
  | 'sejuani_2013_flail_loop2'
  | 'sejuani_skin06_head_adjust'
  | 'Run_Base'
  | 'Spell2_A_-180'
  | 'Spell2_A_-90'
  | 'Spell2_A_0'
  | 'Spell2_A_180'
  | 'Spell2_A_90'
  | 'Spell2_B_-180'
  | 'Spell2_B_-90'
  | 'Spell2_B_0'
  | 'Spell2_B_180'
  | 'Spell2_B_90'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Root_Ride} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.___Default1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-74.8, -17.36, -267.72]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
