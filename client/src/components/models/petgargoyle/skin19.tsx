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
    Base: THREE.Bone
    Root: THREE.Bone
    SoilMain: THREE.Bone
    runPython_Node: THREE.Bone
  }
  materials: {
    Platform: THREE.MeshBasicMaterial
    Wing: THREE.MeshBasicMaterial
    Dirt_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Celebrate'
  | 'Interact'
  | 'Recall_Winddown'
  | 'Dance_Loop'
  | 'Cast_Cycle'
  | 'garg_damage'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'garg_idlealt'
  | 'garg_joke_1_loop'
  | 'Joke2_Loop'
  | 'garg_joke_3_loop'
  | 'garg_joke_4_loop'
  | 'garg_joke_5_loop'
  | 'garg_joke_6_loop'
  | 'garg_intocycle'
  | 'IdleAlt2'
  | 'garg_joke_1_into'
  | 'Joke2_Into'
  | 'garg_joke_3_into'
  | 'garg_joke_4_into'
  | 'garg_joke_5_into'
  | 'garg_joke_6_into'
  | 'Taunt'
  | 'Idle_In'
  | 'Recall'
  | 'Run_Haste'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'RunIn'
  | 'Cast_Damage'
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
        <primitive object={nodes.Base} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.SoilMain} />
        <primitive object={nodes.runPython_Node} />
      </group>
      <group position={[-86.42, -15.1, -81.94]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Platform}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Wing}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Dirt_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
