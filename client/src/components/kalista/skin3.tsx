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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Spirit1: THREE.Bone
    Buffbone_Cstm_Spirit2: THREE.Bone
    Buffbone_Cstm_Spirit3: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Skin03_Spear: THREE.MeshBasicMaterial
    Skin03_Arrows: THREE.MeshBasicMaterial
    Skin03_Base: THREE.MeshBasicMaterial
    Altar_Spear: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'kalista_attack1'
  | 'Death'
  | 'Joke'
  | 'Laugh'
  | 'kalista_spell1'
  | 'Spell2'
  | 'Spell3_Base'
  | 'Taunt'
  | 'Dance'
  | 'Attack1_0'
  | 'Attack1_180'
  | 'Attack1_-180'
  | 'Attack1_90'
  | 'Attack1_-90'
  | 'Attack1_Dash_0'
  | 'Attack1_Dash_180'
  | 'Attack1_Dash_-180'
  | 'Attack1_Dash_90'
  | 'Attack1_Dash_-90'
  | 'kalista_run1'
  | 'kalista_run2'
  | 'Attack1_Dash2Run_0'
  | 'Attack1_Dash2Run_180'
  | 'Attack1_Dash2Run_-180'
  | 'Attack1_Dash2Run_90'
  | 'Attack1_Dash2Run_-90'
  | 'Spell3_Move'
  | 'Run1_ALT_C'
  | 'Run1_ALT_D'
  | 'Idle1_Base'
  | 'Idle1_Alt_A'
  | 'Idle1_In'
  | 'Idle1_Alt_B'
  | 'kalista_spell4_call'
  | 'Run_Haste'
  | 'Recall'
  | 'kalista_invocation'
  | 'Recall_Winddown'
  | 'Attack1_Dash2Idle_180'
  | 'Attack1_Dash2Idle_-180'
  | 'Attack1_Dash2Idle_90'
  | 'Attack1_Dash2Idle_-90'
  | 'Attack1_Dash2Idle_0'
  | 'kalista_idle1'
  | 'Invocation_Loop'
  | 'Run_Injured'
  | 'Spell1_Dash_0'
  | 'Spell1_Dash_180'
  | 'Spell1_Dash_-180'
  | 'Spell1_Dash_90'
  | 'Spell1_Dash_-90'
  | 'Stunned'
  | 'Spell1_Up'
  | 'Channel'
  | 'Channel_Wndup'
  | 'kalista_run_haste'
  | 'kalista_spell4_throw'
  | 'Spell4_Throw2Idle'
  | 'Spell1_2Idle'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Spirit1} />
        <primitive object={nodes.Buffbone_Cstm_Spirit2} />
        <primitive object={nodes.Buffbone_Cstm_Spirit3} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin03_Spear}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Skin03_Arrows}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skin03_Base}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Altar_Spear}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
