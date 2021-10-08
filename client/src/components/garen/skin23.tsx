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
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Glb_Jetpack_Loc: THREE.Bone
    R_Buffbone_Glb_Jetpack_Roc: THREE.Bone
    C_BuffBone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    PrestigeMechaGaren_Shoulder_MAT: THREE.MeshBasicMaterial
    PrestigeMechaGaren_Body_MAT: THREE.MeshBasicMaterial
    PrestigeMechaGaren_Weapon_MAT: THREE.MeshBasicMaterial
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
  | 'garen_laugh'
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
  | 'garen_skin23_taunt'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Jetpack_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Jetpack_Roc} />
        <primitive object={nodes.C_BuffBone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.PrestigeMechaGaren_Shoulder_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.PrestigeMechaGaren_Body_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.PrestigeMechaGaren_Weapon_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
