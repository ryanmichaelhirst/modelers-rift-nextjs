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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    WeaponB_Snap_World: THREE.Bone
    Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Recall_1: THREE.Bone
    Buffbone_Cstm_Recall_2: THREE.Bone
    Buffbone_Cstm_Recall_3: THREE.Bone
    TreeSprout_Root: THREE.Bone
    Tree_Root: THREE.Bone
    RecallOne_SpiritWisp_Root: THREE.Bone
    RecallTwo_SpiritWisp_Root: THREE.Bone
    RecallThree_SpiritWisp_Root: THREE.Bone
  }
  materials: {
    body: THREE.MeshBasicMaterial
    crossbow1: THREE.MeshBasicMaterial
    ultoff: THREE.MeshBasicMaterial
    ulton: THREE.MeshBasicMaterial
    tree: THREE.MeshBasicMaterial
    SpiritWisp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack_Tumble'
  | 'Attack_Ult'
  | 'Attack_TumbleUlt'
  | 'Channel'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Joke'
  | 'Laugh'
  | 'Run_Ult'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.WeaponB_Snap_World} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Recall_1} />
        <primitive object={nodes.Buffbone_Cstm_Recall_2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_3} />
        <primitive object={nodes.TreeSprout_Root} />
        <primitive object={nodes.Tree_Root} />
        <primitive object={nodes.RecallOne_SpiritWisp_Root} />
        <primitive object={nodes.RecallTwo_SpiritWisp_Root} />
        <primitive object={nodes.RecallThree_SpiritWisp_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.crossbow1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.ultoff} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.ulton} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.tree} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.SpiritWisp}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
