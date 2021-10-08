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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Buffbone_Cstm_FX2_Loc: THREE.Bone
    Buffbone_Cstm_FX1_Loc: THREE.Bone
    Buffbone_Cstm_FX4_Loc: THREE.Bone
    Buffbone_Cstm_FX3_Loc: THREE.Bone
    Healthbar_Buffbone: THREE.Bone
    Snap_Extra2World: THREE.Bone
  }
  materials: {
    L_Arm_mat: THREE.MeshBasicMaterial
    R_Arm_mat: THREE.MeshBasicMaterial
    Base_mat: THREE.MeshBasicMaterial
    Head_Darkstar_mat: THREE.MeshBasicMaterial
    Head_Normal_mat: THREE.MeshBasicMaterial
    Cloth_mat: THREE.MeshBasicMaterial
    Shoulder_mat: THREE.MeshBasicMaterial
    Ult_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_First'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle_Base'
  | 'Run'
  | 'Spell4'
  | 'Taunt'
  | 'Attack1'
  | 'Attack3'
  | 'Attack4'
  | 'jhin_skin05_idle2'
  | 'Attack2'
  | 'Run_Fast'
  | 'Run_Passive'
  | 'Laugh'
  | 'Spell2'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Reload'
  | 'Spell4_Idle'
  | 'jhin_skin05_spell4_shot1'
  | 'RunHaste'
  | 'Run_Slow'
  | 'Idle_In'
  | 'Spell2_To_Run'
  | 'Spell3'
  | 'Death'
  | 'Run_Injured'
  | 'Recall'
  | 'Run_Haste'
  | 'Spell1'
  | 'Reload_Recoil'
  | 'Spell4_To_Run'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Idle_Variant2'
  | 'jhin_skin05_idle4'
  | 'Spell1_To_Idle'
  | 'jhin_skin05_spell4_shot2'
  | 'jhin_skin05_spell4_shot4'
  | 'Joke_In'
  | 'Joke_LoopScale'
  | 'Joke_LoopRotate'
  | 'Joke_LoopReposition'
  | 'Spell3_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell4_To_Idle'
  | 'Run_Homeguard'
  | 'jhin_skin05_homeguard_toidle'
  | 'Run_Homeguard_IN'
  | 'Crit_to_idle'
  | 'Crit_to_run'
  | 'jhin_skin05_spell2_to_run'
  | 'Channel_Repeat'
  | 'Spell4_Shot1_out'
  | 'Spell4_Shot2_out'
  | 'Spell4_Shot4_out'
  | 'Attack_to_run'
  | 'Attack4_to_idle'
  | 'Attack4_to_run'
  | 'Attack_to_runfast'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Buffbone_Cstm_FX2_Loc} />
        <primitive object={nodes.Buffbone_Cstm_FX1_Loc} />
        <primitive object={nodes.Buffbone_Cstm_FX4_Loc} />
        <primitive object={nodes.Buffbone_Cstm_FX3_Loc} />
        <primitive object={nodes.Healthbar_Buffbone} />
        <primitive object={nodes.Snap_Extra2World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.L_Arm_mat} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.R_Arm_mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Base_mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Head_Darkstar_mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Head_Normal_mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Cloth_mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Shoulder_mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.Ult_mat} skeleton={nodes.mesh_0_7.skeleton} />
    </group>
  )
}
