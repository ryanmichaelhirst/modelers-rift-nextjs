import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
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
}
