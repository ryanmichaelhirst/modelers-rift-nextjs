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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    weaponstreak: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    weapon2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Trophy_RT: THREE.Bone
    Recall_Portal_RT: THREE.Bone
    Recall_Weapon: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    WeaponCrystal: THREE.MeshBasicMaterial
    RecallTrophy: THREE.MeshBasicMaterial
    RecallPortal: THREE.MeshBasicMaterial
    RecallWeapon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Taunt'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3B'
  | 'Joke'
  | 'Recall'
  | 'attack1.pie_c_11_9'
  | 'attack2.pie_c_11_9'
  | 'Crit_Base'
  | 'crit.pie_c_11_9'
  | 'Spell4_Base'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.weaponstreak} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.weapon2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Trophy_RT} />
        <primitive object={nodes.Recall_Portal_RT} />
        <primitive object={nodes.Recall_Weapon} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.WeaponCrystal}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.RecallTrophy}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.RecallPortal}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.RecallWeapon}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
