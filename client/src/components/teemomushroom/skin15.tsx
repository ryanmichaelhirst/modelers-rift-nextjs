import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Mushroom_Cap: THREE.Bone
    Root: THREE.Bone
    Feet: THREE.Bone
  }
  materials: {
    TeemoMushroom: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Idle' | 'Run' | 'Spawn' | 'Death' | 'Idle_In'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Mushroom_Cap} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Feet} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.TeemoMushroom}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
