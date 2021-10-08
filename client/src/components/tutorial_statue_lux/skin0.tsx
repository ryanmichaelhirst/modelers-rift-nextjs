import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    joint1: THREE.Bone
  }
  materials: {
    lux_base_MD_v10_lambert4SG2: THREE.MeshBasicMaterial
    pasted__lux_base_staff_MD_lambert4SG1: THREE.MeshBasicMaterial
  }
}

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(props.glb) as GLTFResult

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.joint1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lux_base_MD_v10_lambert4SG2}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.pasted__lux_base_staff_MD_lambert4SG1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
