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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    Cstm_Buffbone_Cast_FX: THREE.Bone
    Bread: THREE.Bone
    Phone: THREE.Bone
    Platform: THREE.Bone
  }
  materials: {
    Ezreal_Base_Mat: THREE.MeshBasicMaterial
    Hair_Mat: THREE.MeshBasicMaterial
    Gauntlet_Mat: THREE.MeshBasicMaterial
    Gauntlet_Bits_Mat: THREE.MeshBasicMaterial
    Gauntlet_FX_Mat: THREE.MeshBasicMaterial
    Bread_Mat: THREE.MeshBasicMaterial
    Phone_Mat: THREE.MeshBasicMaterial
    Dummies_Mat: THREE.MeshBasicMaterial
    Platform_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ezreal_skin21_attack1'
  | 'ezreal_skin21_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt_LeadIn'
  | 'ezreal_skin21_spell3_exit'
  | 'Run_To_Idle'
  | 'ezreal_skin21_idle_variant1'
  | 'ezreal_skin21_run'
  | 'ezreal_skin21_attack2'
  | 'ezreal_skin21_attack4'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Spell4_To_Idle'
  | 'ezreal_skin21_spell4_air_torun'
  | 'Run_Haste'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Spell3_Exit_Run'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Spell3_Generic'
  | 'Spell3_Exit_NoTarget_Idle'
  | 'Respawn'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Run_Variant'
  | 'ezreal_skin21_runfast_toidle'
  | 'Run_Variant2'
  | 'Run_Homeguard'
  | 'ezreal_skin21_runhomeguard_in'
  | 'PassiveHair'
  | 'Spell4_Air'
  | 'Spell4_Godmode'
  | 'ezreal_skin21_spell4_air_toidle'
  | 'ezreal_skin21_spell4_godmode_toidle'
  | 'Taunt_loop'
  | 'Spell3_0'
  | 'Spell3_Exit_NoTarget_Run'
  | 'ezreal_skin21_spell3_exit_notarget_base_link'
  | 'Spell4_To_Run'
  | 'ezreal_skin21_runhg_to_fast'
  | 'ezreal_skin21_runhg_toidle'
  | 'Dance_Loop'
  | 'Idle_Variant2'
  | 'ezreal_skin21_joke_reaction1'
  | 'ezreal_skin21_joke_reaction2'
  | 'ezreal_skin21_joke_reaction3'
  | 'Joke_Intro'
  | 'Dance_In'
  | 'ezreal_skin21_spell4_godmode_torun'
  | 'ezreal_skin21_runhg_to_base'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Cstm_Buffbone_Cast_FX} />
        <primitive object={nodes.Bread} />
        <primitive object={nodes.Phone} />
        <primitive object={nodes.Platform} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ezreal_Base_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Hair_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Gauntlet_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Gauntlet_Bits_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Gauntlet_FX_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Bread_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Phone_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Dummies_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Platform_Mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
    </group>
  )
}
