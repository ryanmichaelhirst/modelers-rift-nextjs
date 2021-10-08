import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Pole1: THREE.Bone
    Snap_Flag2World: THREE.Bone
    Snap_Crown2World: THREE.Bone
  }
  materials: {
    Ward_Aprilfoolz_Dog_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Attack' | 'Death' | 'Spawn' | 'Hit'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Pole1} />
        <primitive object={nodes.Snap_Flag2World} />
        <primitive object={nodes.Snap_Crown2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ward_Aprilfoolz_Dog_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
