import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Sphere: THREE.Bone
    Circle1: THREE.Bone
    Circle2: THREE.Bone
  }
  materials: {
    Sightward_Skin107_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Death' | 'Spawn' | 'Idle1' | 'Hit' | 'Idle_In'
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
        <primitive object={nodes.Sphere} />
        <primitive object={nodes.Circle1} />
        <primitive object={nodes.Circle2} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sightward_Skin107_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-49.18, -0.23, -39.67]}
        scale={0.01}
      />
    </group>
  )
}
