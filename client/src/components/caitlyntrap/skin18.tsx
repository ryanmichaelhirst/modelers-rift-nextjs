import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    trap_jaw1: THREE.Bone
    trap_jaw2: THREE.Bone
    cupcake: THREE.Bone
  }
  materials: {
    lambert3: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Death' | 'Idle1' | 'Run' | 'Spell1' | 'Wait'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.trap_jaw1} />
        <primitive object={nodes.trap_jaw2} />
        <primitive object={nodes.cupcake} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert3} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
