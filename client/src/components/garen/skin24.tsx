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
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    R_Buffbone_Glb_Jetpack_Roc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_BuffBone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Buffbone_Glb_Jetpack_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Recall_Stage: THREE.Bone
    Recall_Destroyed_01: THREE.Bone
    Recall_Destroyed_02: THREE.Bone
    Recall_Destroyed_03: THREE.Bone
    Recall_Destroyed_04: THREE.Bone
    Recall_Destroyed_07: THREE.Bone
    Recall_Shoulder_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Recall_Stage: THREE.MeshBasicMaterial
    Recall_Props: THREE.MeshBasicMaterial
    Recall_Props3: THREE.MeshBasicMaterial
    Recall_Props4: THREE.MeshBasicMaterial
    Recall_Props7: THREE.MeshBasicMaterial
    Shoulder: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Base'
  | 'Death'
  | 'garen_skin22_idle_leadin'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'garen_2013_idle3'
  | 'garen_skin22_joke'
  | 'garen_skin22_joke_loop'
  | 'garen_2013_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'garen_2013_dance_loop'
  | 'Recall'
  | 'garen_skin22_respawn'
  | 'Run_Haste'
  | 'Run_Spell1'
  | 'Run_Fast'
  | 'garen_skin22_taunt'
  | 'garen_2013_joke_loop'
  | 'garen_2013_joke'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_90'
  | 'Spell3_-90'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Jetpack_Roc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_BuffBone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Jetpack_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Recall_Stage} />
        <primitive object={nodes.Recall_Destroyed_01} />
        <primitive object={nodes.Recall_Destroyed_02} />
        <primitive object={nodes.Recall_Destroyed_03} />
        <primitive object={nodes.Recall_Destroyed_04} />
        <primitive object={nodes.Recall_Destroyed_07} />
        <primitive object={nodes.Recall_Shoulder_World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Recall_Stage}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Recall_Props}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Recall_Props3}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Recall_Props4}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Recall_Props7}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Shoulder}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
