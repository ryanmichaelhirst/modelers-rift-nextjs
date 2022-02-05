import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Dummy_Root: THREE.Bone
    L_Arm_Socket: THREE.Bone
    Root: THREE.Bone
    R_Arm_Socket: THREE.Bone
    R_ShoulderPad: THREE.Bone
    L_ShoulderPad: THREE.Bone
    R_Leg_Socket: THREE.Bone
    L_Leg_Socket: THREE.Bone
    Glass: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Clock: THREE.Bone
  }
  materials: {
    Stakes: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Head: THREE.MeshBasicMaterial
    Mouth_Smile: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'Joke'
  | 'Idle_Base'
  | 'Death'
  | 'Cast_Cycle'
  | 'Cast_Damage'
  | 'Cast_Animation'
  | 'Idle_In'
  | 'Dive_Out'
  | 'Dive_In'
  | 'Greeting'
  | 'vi_damage_hurt.chibichamps_11_22'
  | 'vi_idle.chibichamps_11_22'
  | 'vi_taunt_out.chibichamps_11_22'
  | 'vi_taunt.chibichamps_11_22'
  | 'Laugh'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Celebrate'
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
        <primitive object={nodes.Dummy_Root} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.R_ShoulderPad} />
        <primitive object={nodes.L_ShoulderPad} />
        <primitive object={nodes.R_Leg_Socket} />
        <primitive object={nodes.L_Leg_Socket} />
        <primitive object={nodes.Glass} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Clock} />
      </group>
      <group position={[-76.95, 0.05, -50.89]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Stakes}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Head}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Mouth_Smile}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
