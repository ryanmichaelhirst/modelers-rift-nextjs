import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Sapling_Root: THREE.Bone
    BUFFBONE_GLB_WEAPON_1: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    Sapling_Body_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Aggro'
  | 'Idle1_Base'
  | 'maokaisproutling_idle2.skins_maokai_skin16'
  | 'Idle2_Base'
  | 'Landing'
  | 'Landing_Big'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Sapling_Root} />
        <primitive object={nodes.BUFFBONE_GLB_WEAPON_1} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sapling_Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
