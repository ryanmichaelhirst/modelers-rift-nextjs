import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    cupcake: THREE.Bone
    trap_jaw1: THREE.Bone
    trap_jaw2: THREE.Bone
  }
  materials: {
    Caitlyn_Trap_MAT: THREE.MeshBasicMaterial
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
        <primitive object={nodes.cupcake} />
        <primitive object={nodes.trap_jaw1} />
        <primitive object={nodes.trap_jaw2} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Caitlyn_Trap_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
