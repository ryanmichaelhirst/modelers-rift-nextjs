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
    Book_Root: THREE.Bone
    L_Leg_Ik: THREE.Bone
    R_Leg_Ik: THREE.Bone
    runPython_Node: THREE.Bone
  }
  materials: {
    Base_MAT: THREE.MeshBasicMaterial
    Book_Cover: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'Idle_In'
  | 'Joke_Intro'
  | 'hex_interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'hex_damage'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_Var'
  | 'Run_INTO'
  | 'Idle_Var2'
  | 'hex_interactin'
  | 'Joke_Loop'
  | 'hex_runbase'
  | 'Turn_R'
  | 'Turn_L'
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
        <primitive object={nodes.Book_Root} />
        <primitive object={nodes.L_Leg_Ik} />
        <primitive object={nodes.R_Leg_Ik} />
        <primitive object={nodes.runPython_Node} />
      </group>
      <group position={[-86.18, -0.81, -47.75]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Base_MAT} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Book_Cover}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
