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
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    mesh_0_14: THREE.SkinnedMesh
    mesh_0_15: THREE.SkinnedMesh
    mesh_0_16: THREE.SkinnedMesh
    Root: THREE.Bone
    L_Shuriken_World: THREE.Bone
    R_Shuriken_World: THREE.Bone
    Root_temp: THREE.Bone
    L_Sword: THREE.Bone
    R_Sword: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Healthbar_Buffbone: THREE.Bone
    Vents: THREE.Bone
    Bug: THREE.Bone
    Boombox: THREE.Bone
  }
  materials: {
    Skin13_Mat: THREE.MeshBasicMaterial
    Passive_Mat: THREE.MeshBasicMaterial
    WeaponA_MAT: THREE.MeshBasicMaterial
    WeaponD_MAT: THREE.MeshBasicMaterial
    WeaponC_MAT: THREE.MeshBasicMaterial
    WeaponB_MAT: THREE.MeshBasicMaterial
    Weapon2_MAT: THREE.MeshBasicMaterial
    Blob_MAT: THREE.MeshBasicMaterial
    Weapon1_MAT: THREE.MeshBasicMaterial
    Weapon0_MAT: THREE.MeshBasicMaterial
    Suit_MAT: THREE.MeshBasicMaterial
    Head_MAT: THREE.MeshBasicMaterial
    Body_MAT: THREE.MeshBasicMaterial
    Hands_Mat: THREE.MeshBasicMaterial
    Shuriken_Mat: THREE.MeshBasicMaterial
    Joke_Props_Mat: THREE.MeshBasicMaterial
    Boombox_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_skin13_attack1'
  | 'Death'
  | 'Laugh'
  | 'Run'
  | 'Run_Fast'
  | 'zed_spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Run_Haste'
  | 'Idle_In'
  | 'zed_skin13_dance_leadin'
  | 'zed_skin13_dance'
  | 'zed_skin13_recall'
  | 'zed_skin13_haste_toidle'
  | 'zed_skin13_attack2'
  | 'Spawn'
  | 'Recall_Winddown'
  | 'zed_skin13_taunt'
  | 'Spell1_ToIdle'
  | 'Spell1_0'
  | 'Spell1_90'
  | 'Spell1_180'
  | 'zed_skin13_attack3'
  | 'zed_skin13_attack4'
  | 'Spell3'
  | 'Crit'
  | 'zed_skin13_spell2_cast'
  | 'Spell3_ToRun'
  | 'Spell3_ToIdle'
  | 'Spell3_ToRunFast'
  | 'zed_skin13_attack1_to_runfast'
  | 'zed_skin13_attack2_to_runfast'
  | 'zed_skin13_attack3_to_runfast'
  | 'zed_skin13_attack4_to_runfast'
  | 'zed_skin13_attack1_to_run'
  | 'zed_skin13_attack2_to_run'
  | 'zed_skin13_attack3_to_run'
  | 'zed_skin13_attack4_to_run'
  | 'Spell2_Cast_Move'
  | 'Spell1_-180'
  | 'Spell1_-90'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'zed_skin13_idle3'
  | 'Run_In'
  | 'Run_Fast_In'
  | 'Run_Haste_In'
  | 'zed_skin13_idle_enter_fast'
  | 'zed_skin13_attackpass'
  | 'Spell4_Dash'
  | 'Spell1_ToRun'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IdleIn'
  | 'Run_Homeguard_RunIn'
  | 'Channel_Wndup'
  | 'Channel'
  | 'zed_skin13_attackpassive_to_run'
  | 'zed_skin13_attackpassive_to_runfast'
  | 'SpinningShuriken'
  | 'Run_Homeguard_Trans_to_Run_Fast'
  | 'Respawn'
  | 'Joke_Windup'
  | 'Joke_Loop'
  | 'zed_skin13_attackpass2'
  | 'zed_skin13_attackpass3'
  | 'zed_skin13_attackpassive2_to_run'
  | 'zed_skin13_attackpassive3_to_run'
  | 'zed_skin13_attackpassive2_to_runfast'
  | 'zed_skin13_attackpassive3_to_runfast'
  | 'Run_Homeguard_Trans_to_Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_Shuriken_World} />
        <primitive object={nodes.R_Shuriken_World} />
        <primitive object={nodes.Root_temp} />
        <primitive object={nodes.L_Sword} />
        <primitive object={nodes.R_Sword} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Healthbar_Buffbone} />
        <primitive object={nodes.Vents} />
        <primitive object={nodes.Bug} />
        <primitive object={nodes.Boombox} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Skin13_Mat} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Passive_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.WeaponA_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.WeaponD_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.WeaponC_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.WeaponB_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Weapon2_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Blob_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Weapon1_MAT}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Weapon0_MAT}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Suit_MAT}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Head_MAT}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Body_MAT}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Hands_Mat}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.Shuriken_Mat}
        skeleton={nodes.mesh_0_14.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_15.geometry}
        material={materials.Joke_Props_Mat}
        skeleton={nodes.mesh_0_15.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_16.geometry}
        material={materials.Boombox_Mat}
        skeleton={nodes.mesh_0_16.skeleton}
      />
    </group>
  )
}
