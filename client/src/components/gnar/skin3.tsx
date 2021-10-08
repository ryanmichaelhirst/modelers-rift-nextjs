import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Boomerang: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Hat2World: THREE.Bone
    Root_Lower: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snowman_Root: THREE.Bone
  }
  materials: {
    Gnar_Weapon: THREE.MeshBasicMaterial
    Gnar_Skin03_Mat: THREE.MeshBasicMaterial
    Gnar_Boomerang: THREE.MeshBasicMaterial
    Snowman: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'gnar_attack1'
  | 'gnar_attack2'
  | 'gnar_run2'
  | 'gnar_idle1'
  | 'Spell3'
  | 'Spell4'
  | 'Spell2'
  | 'Run_Base'
  | 'gnar_idlerage'
  | 'IdleRage_2'
  | 'TailHair_In'
  | 'TailHair_Out'
  | 'gnar_rage1_stop'
  | 'Rage1_Run'
  | 'gnar_idle_tantrum'
  | 'Idle1_Alt_A'
  | 'Idle1_Alt_B'
  | 'Run1_In'
  | 'Spell3_Bounce'
  | 'gnar_idle1_in'
  | 'gnar_revert'
  | 'Idle2_In'
  | 'Channel_Wndup'
  | 'gnar_skin01_taunt_hood'
  | 'Joke'
  | 'Death'
  | 'gnar_spell1_0'
  | 'gnar_spell1_180'
  | 'gnar_spell1_-180'
  | 'gnar_spell1_90'
  | 'gnar_spell1_-90'
  | 'gnar_dance_loop'
  | 'gnar_spell3_bounce'
  | 'Dance_In'
  | 'Idle1_In2'
  | 'Channel'
  | 'Spell1_Catch'
  | 'Idle1_Alt_C'
  | 'gnar_laugh'
  | 'gnar_crit1'
  | 'gnar_crit2'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'gnar_attack1_fast'
  | 'gnar_attack2_fast'
  | 'Scale_Base'
  | 'Revert_Scale'
  | 'Respawn'
  | 'Stunned'
  | 'gnar_idle1_alt_d'
  | 'KnockUp_In'
  | 'KnockUp_Loop'
  | 'Dance_Start'
  | 'Recall'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root_Upper} />
        <primitive object={nodes.Boomerang} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Hat2World} />
        <primitive object={nodes.Root_Lower} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snowman_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Gnar_Weapon}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Gnar_Skin03_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Gnar_Boomerang}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Snowman}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
