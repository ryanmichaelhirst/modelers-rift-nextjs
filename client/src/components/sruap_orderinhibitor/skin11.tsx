import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    SRUAP_OrderInhibitor_MAT: THREE.MeshBasicMaterial
    SRUAP_OrderInhibitor_Leaves_MAT: THREE.MeshBasicMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(props.glb) as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SRUAP_OrderInhibitor_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.SRUAP_OrderInhibitor_Leaves_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
