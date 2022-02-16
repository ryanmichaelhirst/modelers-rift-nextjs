import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Poro: THREE.Bone
    Root_Ride: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Poro: THREE.MeshBasicMaterial
    Sejuani_Skin05_MD_blinn2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Recall'
  | 'Tongue'
  | 'Recall_Winddown'
  | 'Recall_Leadout'
  | 'sejuani_skin05_eyes1'
  | 'sejuani_skin05_eyes2'
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
  | 'Channel'
  | 'Channel_Windup'
  | 'sejuani_2013_taunt'
  | 'sejuani_2013_laugh'
  | 'sejuani_2013_joke'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'sejuani_2013_idle_enter'
  | 'sejuani_2013_flail_loop'
  | 'Flail_Out'
  | 'sejuani_2013_flail_blank'
  | 'sejuani_2013_flail_in'
  | 'sejuani_2013_flail_loop2'
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
        <primitive object={nodes.Poro} />
        <primitive object={nodes.Root_Ride} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-82.76, -24.59, -144.38]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Poro} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Sejuani_Skin05_MD_blinn2}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
