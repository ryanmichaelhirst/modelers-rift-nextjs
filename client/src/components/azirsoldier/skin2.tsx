import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    AzirSoldier_Skin02_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'azirsoldier_spawn'
  | 'Idle1_Base'
  | 'azirsoldier_inactive'
  | 'Idle2_Base'
  | 'azirsoldier_attack1'
  | 'azirsoldier_dash_exit'
  | 'Inactive_Loop'
  | 'azirsoldier_spawn3'
  | 'Death'
  | 'azirsoldier_attack2'
  | 'azirsoldier_reactivate'
  | 'azirsoldier_attack3'
  | 'azirsoldier_idle3'
  | 'Dance_Windup'
  | 'Dance_Loop'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.AzirSoldier_Skin02_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
