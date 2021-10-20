import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
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
    Sejuani_Skin04_Mat1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'sejuani_bear_idle1'
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
  | 'Channel'
  | 'Channel_Windup'
  | 'sejuani_bear_taunt'
  | 'sejuani_bear_laugh'
  | 'sejuani_bear_joke'
  | 'Death'
  | 'sejuani_bear_enter'
  | 'sejuani_bear_flail_loop'
  | 'Flail_Out'
  | 'sejuani_bear_flail_blank'
  | 'sejuani_bear_flail_in'
  | 'sejuani_bear_dance'
  | 'Dance_Loop'
  | 'Recall_Loop'
  | 'Recall_Wndup'
  | 'sejuani_bear_respawn'
  | 'Bear_Flail_Loop'
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

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
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
        material={materials.Sejuani_Skin04_Mat1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-85.8, -20.69, -113.59]}
        scale={0.02}
      />
    </group>
  )
}
