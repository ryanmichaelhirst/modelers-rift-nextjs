import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    R_Hand_Recall_Root: THREE.Bone
    L_Hand_Recall_Root: THREE.Bone
    L_Hand2_Recall_Root: THREE.Bone
    R_Hand3_Recall_Root: THREE.Bone
  }
  materials: {
    Jarvan_Skin07_Mat: THREE.MeshBasicMaterial
    Spear: THREE.MeshBasicMaterial
    Crystal: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'Passive'
  | 'Run'
  | 'Run3'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Spell6'
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.R_Hand_Recall_Root} />
        <primitive object={nodes.L_Hand_Recall_Root} />
        <primitive object={nodes.L_Hand2_Recall_Root} />
        <primitive object={nodes.R_Hand3_Recall_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jarvan_Skin07_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Spear} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Crystal} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Recall} skeleton={nodes.mesh_0_3.skeleton} />
    </group>
  )
}
