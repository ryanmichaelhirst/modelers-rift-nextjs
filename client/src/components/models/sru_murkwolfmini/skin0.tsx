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
  }
  materials: {
    wolf_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_murkwolf_attack3'
  | 'sru_murkwolf_attack2'
  | 'Death_Base'
  | 'Run_Base'
  | 'sru_murkwolf_pounce'
  | 'sru_murkwolfmini_idle1'
  | 'sru_murkwolf_death2'
  | 'sru_murkwolfmini_spawn_left'
  | 'sru_murkwolfmini_spawn_right'
  | 'sru_murkwolfmini_idle1_a2n'
  | 'sru_murkwolfmini_idle1_n2a'
  | 'sru_murkwolfmini_idle2'
  | 'sru_murkwolfmini_idle3'
  | 'sru_murkwolfmini_idle4'
  | 'sru_murkwolfmini_howl'
  | 'sru_murkwolfmini_idle5'
  | 'sru_murkwolfmini_idle_aggro2'
  | 'sru_murkwolfmini_idle_aggro3'
  | 'sru_murkwolfmini_idle_aggro1'
  | 'sru_murkwolfmini_idle6'
  | 'sru_murkwolfmini_idle7'
  | 'Idle_Lookat_0'
  | 'Idle_Lookat_L45'
  | 'Idle_Lookat_R45'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.wolf_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-49.95, -0.89, -158.89]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
