import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Candy_01: THREE.Bone
    Candy_02: THREE.Bone
    Candy_03: THREE.Bone
    Candy_04: THREE.Bone
    Candy_05: THREE.Bone
  }
  materials: {
    Cat_MAT: THREE.MeshBasicMaterial
    Pumpkin_MAT: THREE.MeshBasicMaterial
    Candy_MAT: THREE.MeshBasicMaterial
    Hat_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Hit' | 'Death' | 'Spawn' | 'Attack'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Candy_01} />
        <primitive object={nodes.Candy_02} />
        <primitive object={nodes.Candy_03} />
        <primitive object={nodes.Candy_04} />
        <primitive object={nodes.Candy_05} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Cat_MAT} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Pumpkin_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Candy_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Hat_MAT} skeleton={nodes.mesh_0_3.skeleton} />
    </group>
  )
}
