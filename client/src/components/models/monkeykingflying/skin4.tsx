import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    weapon: THREE.Bone
    weapon_a_bend1: THREE.Bone
    weapon_a_bend2: THREE.Bone
    weapon_a_bend3: THREE.Bone
    weapon_a_bend4: THREE.Bone
    weapon_b_bend1: THREE.Bone
    weapon_b_bend2: THREE.Bone
    weapon_b_bend3: THREE.Bone
    weapon_b_bend4: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    blinn1: THREE.MeshBasicMaterial
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.weapon_a_bend1} />
        <primitive object={nodes.weapon_a_bend2} />
        <primitive object={nodes.weapon_a_bend3} />
        <primitive object={nodes.weapon_a_bend4} />
        <primitive object={nodes.weapon_b_bend1} />
        <primitive object={nodes.weapon_b_bend2} />
        <primitive object={nodes.weapon_b_bend3} />
        <primitive object={nodes.weapon_b_bend4} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-66.53, -7.19, -99.49]}
        scale={0.01}
      />
    </group>
  )
}
