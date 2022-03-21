import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Cstm_Spirit1: THREE.Bone
    Buffbone_Cstm_Spirit2: THREE.Bone
    Buffbone_Cstm_Spirit3: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Recall_Spear_Root: THREE.Bone
  }
  materials: {
    Kalista: THREE.MeshBasicMaterial
    Spear: THREE.MeshBasicMaterial
    Altar_Spear: THREE.MeshBasicMaterial
    RecallSpear: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'kalista_attack1.skins_kalista_skin05'
  | 'Death'
  | 'Joke'
  | 'Laugh'
  | 'kalista_spell1.skins_kalista_skin05'
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
  | 'kalista_run1.skins_kalista_skin05'
  | 'kalista_run2.skins_kalista_skin05'
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
  | 'kalista_spell4_call.skins_kalista_skin05'
  | 'Run_Haste'
  | 'Recall'
  | 'kalista_invocation.skins_kalista_skin05'
  | 'Recall_Winddown'
  | 'Attack1_Dash2Idle_180'
  | 'Attack1_Dash2Idle_-180'
  | 'Attack1_Dash2Idle_90'
  | 'Attack1_Dash2Idle_-90'
  | 'Attack1_Dash2Idle_0'
  | 'kalista_idle1.skins_kalista_skin05'
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
  | 'kalista_run_haste.skins_kalista_skin05'
  | 'kalista_spell4_throw.skins_kalista_skin05'
  | 'Spell4_Throw2Idle'
  | 'Spell1_2Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Cstm_Spirit1} />
        <primitive object={nodes.Buffbone_Cstm_Spirit2} />
        <primitive object={nodes.Buffbone_Cstm_Spirit3} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Recall_Spear_Root} />
      </group>
      <group position={[-95.17, -7.81, -156.37]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Kalista} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Spear} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Altar_Spear}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.RecallSpear}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
