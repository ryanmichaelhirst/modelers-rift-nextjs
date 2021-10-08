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
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_HealthBar: THREE.Bone
    Snap_R_Weapon: THREE.Bone
    Snap_WeaponRecall: THREE.Bone
  }
  materials: {
    Katarina_Skin21_Mask_MAT: THREE.MeshBasicMaterial
    Katarina_Skin21_MAT: THREE.MeshBasicMaterial
    Katarina_Weapon_Skin21_MAT: THREE.MeshBasicMaterial
    Katarina_Skin21_Recall_MAT: THREE.MeshBasicMaterial
    Katarina_Skin21_WeaponRecall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Taunt'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke'
  | 'Recall'
  | 'Run2'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Idle2'
  | 'katarina_spell3'
  | 'katarina_crit'
  | 'Spell2_Throw'
  | 'RunHaste'
  | 'Idle_In'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_HealthBar} />
        <primitive object={nodes.Snap_R_Weapon} />
        <primitive object={nodes.Snap_WeaponRecall} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Katarina_Skin21_Mask_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Katarina_Skin21_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Katarina_Weapon_Skin21_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Katarina_Skin21_Recall_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Katarina_Skin21_WeaponRecall_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
