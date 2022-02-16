import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_BuffBone_Cstm_Healthbar: THREE.Bone
    Root_Ride: THREE.Bone
    Root_Orb: THREE.Bone
  }
  materials: {
    Sejuani_MAT: THREE.MeshBasicMaterial
    Bristle_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'sejuani_idle1'
  | 'Run3'
  | 'Spell3'
  | 'Channel_Wndup'
  | 'sejuani_bear_spell1'
  | 'Run2'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1'
  | 'Spell4'
  | 'Spell1_Hit'
  | 'Recall'
  | 'Channel'
  | 'Channel_Windup'
  | 'sejuani_skin08_taunt'
  | 'sejuani_skin08_laugh'
  | 'sejuani_skin08_joke'
  | 'Death'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Idle1'
  | 'sejuani_bear_enter'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_BuffBone_Cstm_Healthbar} />
        <primitive object={nodes.Root_Ride} />
        <primitive object={nodes.Root_Orb} />
      </group>
      <group position={[-83.04, -15, -185.3]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Sejuani_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Bristle_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
