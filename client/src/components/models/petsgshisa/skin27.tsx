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
    RubiksCube1: THREE.Bone
    RubiksCube4: THREE.Bone
    RubiksCube2: THREE.Bone
    RubiksCube0: THREE.Bone
    RubiksCube6: THREE.Bone
    RubiksCube3: THREE.Bone
    RubiksCube5: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    RubiksCube: THREE.MeshBasicMaterial
    Frame: THREE.MeshBasicMaterial
    Lens: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Joke'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Death'
  | 'Laugh'
  | 'Idle_Base'
  | 'Celebrate'
  | 'Idle_In'
  | 'Interact'
  | 'idle_01_2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'damage'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'idle_in_2'
  | 'taunt_cycle'
  | 'Taunt_In'
  | 'runfast_into'
  | 'idle_into_run'
  | 'Idle_Var2'
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
        <primitive object={nodes.RubiksCube1} />
        <primitive object={nodes.RubiksCube4} />
        <primitive object={nodes.RubiksCube2} />
        <primitive object={nodes.RubiksCube0} />
        <primitive object={nodes.RubiksCube6} />
        <primitive object={nodes.RubiksCube3} />
        <primitive object={nodes.RubiksCube5} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <group position={[-50.08, 0, -117.57]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.RubiksCube}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Frame}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Lens}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
