import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    joint1: THREE.Bone
  }
  materials: {
    MasterYi_Base_MD_blinn1SG1: THREE.MeshBasicMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(props.glb) as GLTFResult
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.joint1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MasterYi_Base_MD_blinn1SG1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
