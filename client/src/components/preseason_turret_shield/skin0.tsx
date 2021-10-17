import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Chaos_Shield_Root: THREE.Bone
  }
  materials: {
    Tower_Palisades_Order_Unbroken_Part1_Mat: THREE.MeshBasicMaterial
    Tower_Palisades_Order_Broken_Part1_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Part1_Destruction'
  | 'Part2_Destruction'
  | 'Part3_Destruction'
  | 'Part4_Destruction'
  | 'Part5_Destruction'
  | 'order_shutdown'
  | 'Spawn'
  | 'Part1_Hit'
  | 'Part2_Hit'
  | 'Part3_Hit'
  | 'Part4_Hit'
  | 'Part5_Hit'
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
        <primitive object={nodes.Chaos_Shield_Root} />
      </group>
      <group position={[-100.36, 86.23, -194.91]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Tower_Palisades_Order_Unbroken_Part1_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tower_Palisades_Order_Broken_Part1_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
