import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Tentacle1: THREE.Bone
  }
  materials: {
    defaultMat1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'illaoiminion_attack1'
  | 'Idle1'
  | 'Up'
  | 'illaoiminion_idleangry'
  | 'Spawn'
  | 'Death'
  | 'illaoiminion_dormant'
  | 'Dormant_Loop'
  | 'Dance_In'
  | 'Dance_Base'
  | 'IdleHidden'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Tentacle1} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.defaultMat1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
