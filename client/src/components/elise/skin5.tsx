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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    ChairRoot: THREE.Bone
  }
  materials: {
    lambert16: THREE.MeshBasicMaterial
    Chair_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Death'
  | 'elise_idle1'
  | 'elise_idle2'
  | 'elise_idle3'
  | 'Spell1'
  | 'Spell2'
  | 'Channel_Wndup'
  | 'elise_idle1_in'
  | 'KnockedUp'
  | 'elise_skin05_recall'
  | 'elise_run1'
  | 'elise_run1_wndup'
  | 'Stunned'
  | 'Spell3'
  | 'Attack3'
  | 'elise_dance_in'
  | 'elise_dance'
  | 'Crit'
  | 'elise_idle4'
  | 'elise_joke'
  | 'elise_laugh'
  | 'elise_taunt'
  | 'Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.ChairRoot} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert16} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Chair_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
