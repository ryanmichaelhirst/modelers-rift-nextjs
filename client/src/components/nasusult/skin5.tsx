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
    Kicker_Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bone: THREE.Bone
  }
  materials: {
    nasus_cerberus_weapon2: THREE.MeshBasicMaterial
    nasus_kicker: THREE.MeshBasicMaterial
    nasus_cerberus_base: THREE.MeshBasicMaterial
    nasus_cerberus_bone: THREE.MeshBasicMaterial
    nasus_cerberus_weapon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nasusult_skin05_spell1'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'nasusult_skin05_spell2'
  | 'Channel_Base'
  | 'Channel_Leadin'
  | 'Channel_Wndup'
  | 'Run_Base'
  | 'Crit'
  | 'Run_In'
  | 'Idle_In'
  | 'Spell1_Upper'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Death'
  | 'Attack3'
  | 'Spell3_Upper'
  | 'Spell3_Base'
  | 'nasusult_skin05_winddown'
  | 'Dance'
  | 'nasusult_skin05_laugh'
  | 'Taunt_Base'
  | 'nasusult_skin05_joke'
  | 'Spell1'
  | 'Skin05_Spell3_Base'
  | 'nasusult_skin05_idle1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Kicker_Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bone} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.nasus_cerberus_weapon2}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.nasus_kicker}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.nasus_cerberus_base}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.nasus_cerberus_bone}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.nasus_cerberus_weapon}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
