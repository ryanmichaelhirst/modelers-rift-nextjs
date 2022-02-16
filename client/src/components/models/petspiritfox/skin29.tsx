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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Tail: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt_loop'
  | 'Celebrate'
  | 'idle_varient_01'
  | 'Idle_In'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Variant'
  | 'Laugh_Loop'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'damage'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Cast_Turn'
  | 'Joke'
  | 'Taunt_In'
  | 'petspiritfox_kda_dance_intro.littlelegends_10_23'
  | 'Dance_Loop'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-73.53, 0.48, -191.75]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Tail} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
