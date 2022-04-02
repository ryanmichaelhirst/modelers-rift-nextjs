import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Weapon: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Escape_Pod: THREE.Bone
    Recall_Main: THREE.Bone
    AirShip: THREE.Bone
    Kaiju1: THREE.Bone
    WaterTower: THREE.Bone
    Egg1: THREE.Bone
    L_Shoulder_Snap: THREE.Bone
    R_Shoulder_Snap: THREE.Bone
    R_Wing_Snap: THREE.Bone
    L_Wing_Snap: THREE.Bone
    Airship_Grnd_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Blade: THREE.MeshBasicMaterial
    Joke_WaterTower: THREE.MeshBasicMaterial
    RecallProps: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Intro'
  | 'Death'
  | 'Idle_Base'
  | 'jax_skin14_idle_var01'
  | 'Idle_Var2'
  | 'Laugh'
  | 'Taunt'
  | 'Run_Base'
  | 'jax_skin14_spell2_activate_spin'
  | 'Spell2'
  | 'Spell3'
  | 'jax_skin14_spell3b'
  | 'Joke_Intro'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Spell4'
  | 'jax_skin14_run'
  | 'Idle_In'
  | 'Spell3_Attack1'
  | 'Spell3_Attack2'
  | 'Spell3_Attack3'
  | 'Walk'
  | 'Spell3_Run_0'
  | 'Spell3_Idle'
  | 'jax_skin14_run_homeguard'
  | 'Spell3b_run'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_OUT'
  | 'jax_skin14_spell4_activate'
  | 'jax_skin14_spell2_activate_start'
  | 'Run_Homeguard_To_Run'
  | 'jax_skin14_spell4_mode'
  | 'Run_Haste'
  | 'jax_skin14_run_homeguard_turn_-90'
  | 'jax_skin14_run_homeguard_turn_0'
  | 'jax_skin14_run_homeguard_turn_90'
  | 'jax_skin14_recall'
  | 'Joke_Loop'
  | 'Joke_main'
  | 'Dance_Loop'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'jax_skin14_recall_pre6'
  | 'Recall_Winddown_Pre6'
  | 'jax_skin14_run_turns_0'
  | 'jax_skin14_run_turns_90'
  | 'jax_skin14_run_turns_-90'
  | 'Run_Homeguard_var01'
  | 'jax_skin14_weapon_idle'
  | 'Spell4_activate_to_idle'
  | 'Spell4_activate_to_run'
  | 'jax_skin14_laugh'
  | 'Spell4_mode_IN'
  | 'Spell4_mode_OUT'
  | 'Spell3_Run_45'
  | 'Spell3_Run_90'
  | 'Spell3_Run_135'
  | 'Spell3_Run_180'
  | 'Spell3_Run_-45'
  | 'Spell3_Run_-90'
  | 'Spell3_Run_-135'
  | 'Spell3_Run_-180'
  | 'Spell2_Hit'
  | 'Spell4_Out'
  | 'Crit_Out'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Escape_Pod} />
        <primitive object={nodes.Recall_Main} />
        <primitive object={nodes.AirShip} />
        <primitive object={nodes.Kaiju1} />
        <primitive object={nodes.WaterTower} />
        <primitive object={nodes.Egg1} />
        <primitive object={nodes.L_Shoulder_Snap} />
        <primitive object={nodes.R_Shoulder_Snap} />
        <primitive object={nodes.R_Wing_Snap} />
        <primitive object={nodes.L_Wing_Snap} />
        <primitive object={nodes.Airship_Grnd_Root} />
      </group>
      <group position={[-80.1, -15.75, -117.72]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Blade}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Joke_WaterTower}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.RecallProps}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
