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
    Root: THREE.Bone
    L_Front_Leg_Ik: THREE.Bone
    L_Rear_Leg_Ik: THREE.Bone
    R_Front_Leg_Ik: THREE.Bone
    R_Rear_Leg_Ik: THREE.Bone
    CenterOfMass: THREE.Bone
    runPython_Node: THREE.Bone
  }
  materials: {
    Pupil: THREE.MeshBasicMaterial
    DirtMound: THREE.MeshBasicMaterial
    Base_MAT: THREE.MeshBasicMaterial
    Wings_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt_In'
  | 'Celebrate'
  | 'Idle_In'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'bug_damage_01'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'bug_idle_var'
  | 'bug_idle_var2'
  | 'Into_Run'
  | 'bug_intocastcycle'
  | 'bug_runintorun'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Joke_Out'
  | 'TauntOut'
  | 'bug_taunt_digcycle'
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
        <primitive object={nodes.L_Front_Leg_Ik} />
        <primitive object={nodes.L_Rear_Leg_Ik} />
        <primitive object={nodes.R_Front_Leg_Ik} />
        <primitive object={nodes.R_Rear_Leg_Ik} />
        <primitive object={nodes.CenterOfMass} />
        <primitive object={nodes.runPython_Node} />
      </group>
      <group position={[-95.31, -3.58, -57]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Pupil}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.DirtMound}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Base_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Wings_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
