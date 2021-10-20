import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_AllClock: THREE.Bone
    Tray: THREE.Bone
    Oven_Root: THREE.Bone
    gs_Root: THREE.Bone
    gm01_Root: THREE.Bone
    gm02_Root: THREE.Bone
    gm03_Root: THREE.Bone
  }
  materials: {
    Zilean_Skin06_MAT: THREE.MeshBasicMaterial
    Tray_MAT: THREE.MeshBasicMaterial
    GingerbreadSoldier_MAT: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_AllClock} />
        <primitive object={nodes.Tray} />
        <primitive object={nodes.Oven_Root} />
        <primitive object={nodes.gs_Root} />
        <primitive object={nodes.gm01_Root} />
        <primitive object={nodes.gm02_Root} />
        <primitive object={nodes.gm03_Root} />
      </group>
      <group position={[-50.94, -0.07, -58.1]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Zilean_Skin06_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tray_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.GingerbreadSoldier_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
