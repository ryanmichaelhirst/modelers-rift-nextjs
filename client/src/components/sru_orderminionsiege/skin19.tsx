import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Cannon_Order_Mat: THREE.MeshBasicMaterial
    lambert15: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'cannon_order_attack1'
  | 'cannon_order_attack2'
  | 'Win1'
  | 'Win2'
  | 'Death'
  | 'cannon_order_death1'
  | 'Idle1'
  | 'Run'
  | 'Lose1'
  | 'Stunned'
  | 'cannon_order_attack3'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Cannon_Order_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.lambert15}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
