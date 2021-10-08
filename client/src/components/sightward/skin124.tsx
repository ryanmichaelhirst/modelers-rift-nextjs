import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Shaft: THREE.Bone
    R_Wing: THREE.Bone
    L_Wing: THREE.Bone
    Gem: THREE.Bone
    Root: THREE.Bone
  }
  materials: {
    Parts_MAT: THREE.MeshBasicMaterial
    Base_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack' | 'Death' | 'Spawn' | 'Idle1' | 'Hit'
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
        <primitive object={nodes.Shaft} />
        <primitive object={nodes.R_Wing} />
        <primitive object={nodes.L_Wing} />
        <primitive object={nodes.Gem} />
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Parts_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Base_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
