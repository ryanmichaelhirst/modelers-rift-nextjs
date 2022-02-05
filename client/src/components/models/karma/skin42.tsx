import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cust_BackMouth: THREE.Bone
    Buffbone_Cust_BackREye: THREE.Bone
    Buffbone_Cust_BackLEye: THREE.Bone
    Buffbone_Cust_FrontMouth: THREE.Bone
    Buffbone_Cust_FrontREye: THREE.Bone
    Buffbone_Cust_FrontLEye: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Healthbar_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Mask: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Base'
  | 'karma_2012_dance_loop'
  | 'karma_2012_idle_enter'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'karma_2012_joke'
  | 'karma_2012_laugh'
  | 'Recall'
  | 'Run_Fast'
  | 'Spell1'
  | 'karma_2012_spell2'
  | 'Spell3_Base'
  | 'Taunt_Base'
  | 'Death'
  | 'karma_skin27_maskfloat.pie_c_11_2'
  | 'Crit'
  | 'Attack1'
  | 'Attack2'
  | 'DiskSpinOnce'
  | 'karma_2012_run'
  | 'DiskSpin'
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
        <primitive object={nodes.Buffbone_Cust_BackMouth} />
        <primitive object={nodes.Buffbone_Cust_BackREye} />
        <primitive object={nodes.Buffbone_Cust_BackLEye} />
        <primitive object={nodes.Buffbone_Cust_FrontMouth} />
        <primitive object={nodes.Buffbone_Cust_FrontREye} />
        <primitive object={nodes.Buffbone_Cust_FrontLEye} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Mask}
        skeleton={nodes.mesh_0.skeleton}
        position={[-51.89, 0, -37.2]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
