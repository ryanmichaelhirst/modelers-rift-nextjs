import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    leaf_LF_1: THREE.Bone
    body_leaf_LF_1: THREE.Bone
    leaf_FL_1: THREE.Bone
    body_leaf_FL_1: THREE.Bone
    leaf_FR_1: THREE.Bone
    body_leaf_FR_1: THREE.Bone
    leaf_RF_1: THREE.Bone
    body_leaf_RF_1: THREE.Bone
    leaf_RB_1: THREE.Bone
    body_leaf_RB_1: THREE.Bone
    leaf_BR_1: THREE.Bone
    body_leaf_BR_1: THREE.Bone
    leaf_BL_1: THREE.Bone
    body_leaf_BL_1: THREE.Bone
    leaf_LB_1: THREE.Bone
    body_leaf_LB_1: THREE.Bone
  }
  materials: {
    default2: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'zyra_plant_ball_death3'
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
        <primitive object={nodes.leaf_LF_1} />
        <primitive object={nodes.body_leaf_LF_1} />
        <primitive object={nodes.leaf_FL_1} />
        <primitive object={nodes.body_leaf_FL_1} />
        <primitive object={nodes.leaf_FR_1} />
        <primitive object={nodes.body_leaf_FR_1} />
        <primitive object={nodes.leaf_RF_1} />
        <primitive object={nodes.body_leaf_RF_1} />
        <primitive object={nodes.leaf_RB_1} />
        <primitive object={nodes.body_leaf_RB_1} />
        <primitive object={nodes.leaf_BR_1} />
        <primitive object={nodes.body_leaf_BR_1} />
        <primitive object={nodes.leaf_BL_1} />
        <primitive object={nodes.body_leaf_BL_1} />
        <primitive object={nodes.leaf_LB_1} />
        <primitive object={nodes.body_leaf_LB_1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.default2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-38.59, -2.96, -37.11]}
        scale={0}
      />
    </group>
  )
}, areEqual)

export default Model
