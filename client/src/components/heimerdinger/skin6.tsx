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
    Rocket_Base_Scale: THREE.Bone
    Snap_Rocket_Base_To_World: THREE.Bone
    Snap_Rocket_Holder_To_World: THREE.Bone
    Snap_Rocket_To_World: THREE.Bone
    L_Snap_Weapon_To_World: THREE.Bone
    R_Snap_Weapon_To_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Dragon_R_DragonB_Root_To_World: THREE.Bone
    Snap_Dragon_L_DragonB_Root_To_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Heimer_Egg_03: THREE.Bone
    Heimer_Egg_02: THREE.Bone
    Heimer_Egg_01: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    Heimer_Skin06_Dragon_Extra_MAT: THREE.MeshBasicMaterial
    Heimerdinger_Skin06_MD_Heimer_Skin06_Egg_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'heimerdinger_skin06_channel_loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'heimerdinger_skin06_laugh'
  | 'Run'
  | 'heimerdinger_skin6_spell2'
  | 'Spell3_Base'
  | 'Taunt_Base'
  | 'heimerdinger_base_northadjust'
  | 'heimerdinger_base_adjustbase'
  | 'Idle_In1'
  | 'heimerdinger_skin06_run_haste'
  | 'Run_Fast'
  | 'heimerdinger_skin06_recall'
  | 'heimerdinger_skin6_spell1'
  | 'Spell4_In'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Run_Swag'
  | 'Dance_Loop'
  | 'heimerdinger_skin06_channel_in'
  | 'heimerdinger_skin06_respawn'
  | 'heimerdinger_skin6_idle1'
  | 'heimerdinger_skin6_idle3'
  | 'Laugh_In'
  | 'Idle4'
  | 'Joke'
  | 'Run_Haste_In'
  | 'Idle2_In'
  | 'Idle2_Loop'
  | 'Taunt_LeadIn'
  | 'heimerdinger_skin6_death'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Rocket_Base_Scale} />
        <primitive object={nodes.Snap_Rocket_Base_To_World} />
        <primitive object={nodes.Snap_Rocket_Holder_To_World} />
        <primitive object={nodes.Snap_Rocket_To_World} />
        <primitive object={nodes.L_Snap_Weapon_To_World} />
        <primitive object={nodes.R_Snap_Weapon_To_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Dragon_R_DragonB_Root_To_World} />
        <primitive object={nodes.Snap_Dragon_L_DragonB_Root_To_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Heimer_Egg_03} />
        <primitive object={nodes.Heimer_Egg_02} />
        <primitive object={nodes.Heimer_Egg_01} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Heimer_Skin06_Dragon_Extra_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Heimerdinger_Skin06_MD_Heimer_Skin06_Egg_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
