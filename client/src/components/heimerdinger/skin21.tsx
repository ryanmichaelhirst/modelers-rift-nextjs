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
    mesh_0_8: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Rocket_Base_To_World: THREE.Bone
    Snap_Rocket_Mid_To_World: THREE.Bone
    Snap_Rocket_End_To_World: THREE.Bone
    Snap_Rocket_Holder_To_World: THREE.Bone
    Snap_Rocket_To_World: THREE.Bone
    L_Snap_Weapon_To_World: THREE.Bone
    R_Snap_Weapon_To_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Weapon_World_Snap: THREE.Bone
    R_Weapon_World_Snap: THREE.Bone
    Rocket_Space_end: THREE.Bone
    Rocket_Holder_World_Snap: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Root: THREE.Bone
    Prop_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    R_Weapon: THREE.MeshBasicMaterial
    L_Weapon: THREE.MeshBasicMaterial
    Rocket: THREE.MeshBasicMaterial
    Claw: THREE.MeshBasicMaterial
    Antenna: THREE.MeshBasicMaterial
    Crab: THREE.MeshBasicMaterial
    Sand_MAT: THREE.MeshBasicMaterial
    Castle_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'heimerdinger_base_channel_loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'heimerdinger_base_laugh'
  | 'Run'
  | 'heimerdinger_base_spell2'
  | 'Spell3_Base'
  | 'Taunt_Base'
  | 'heimerdinger_base_northadjust'
  | 'heimerdinger_base_adjustbase'
  | 'Idle_In1'
  | 'heimerdinger_base_run_haste1'
  | 'Run_Fast'
  | 'heimerdinger_base_spell1'
  | 'Idle2_Base'
  | 'Spell4_In'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Run_Swag'
  | 'Dance_Loop'
  | 'heimerdinger_base_joke'
  | 'heimerdinger_base_idle4'
  | 'heimerdinger_base_channel_windup'
  | 'heimerdinger_skin15_respawn.pie_c_10_13'
  | 'heimerdinger_base_runin_haste1'
  | 'Idle_In2'
  | 'heimerdinger_base_idle1'
  | 'heimerdinger_base_joke2'
  | 'heimerdinger_skin15_taunt.pie_c_10_13'
  | 'heimerdinger_recall.pie_c_10_13'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_Rocket_Base_To_World} />
        <primitive object={nodes.Snap_Rocket_Mid_To_World} />
        <primitive object={nodes.Snap_Rocket_End_To_World} />
        <primitive object={nodes.Snap_Rocket_Holder_To_World} />
        <primitive object={nodes.Snap_Rocket_To_World} />
        <primitive object={nodes.L_Snap_Weapon_To_World} />
        <primitive object={nodes.R_Snap_Weapon_To_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Weapon_World_Snap} />
        <primitive object={nodes.R_Weapon_World_Snap} />
        <primitive object={nodes.Rocket_Space_end} />
        <primitive object={nodes.Rocket_Holder_World_Snap} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Prop_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.R_Weapon}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.L_Weapon}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Rocket} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Claw} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Antenna} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Crab} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Sand_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Castle_MAT}
        skeleton={nodes.mesh_0_8.skeleton}
      />
    </group>
  )
}
