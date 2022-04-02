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
    Root: THREE.Bone
    DragonTech_Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    PoroA_Root: THREE.Bone
    PoroB_Root: THREE.Bone
    PoroC_Root: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Poro: THREE.MeshBasicMaterial
    Dragon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Start'
  | 'Dance_Intro'
  | 'Death'
  | 'Idle_Base'
  | 'Joke_Intro'
  | 'Laugh'
  | 'Spell1'
  | 'Spell1_Idle'
  | 'volibear_spell1_run.voli'
  | 'Spell1_Attack'
  | 'Spell2_To_Idle'
  | 'Spell3_Idle'
  | 'Taunt'
  | 'Run_Homeguard'
  | 'volibear_run_boots.voli'
  | 'volibear_biped_turn_r_90.voli'
  | 'volibear_biped_turn_l_90.voli'
  | 'Turn_0'
  | 'volibear_spell1_idle_in.voli'
  | 'volibear_spell1_idle_to_run.voli'
  | 'volibear_quad_turn_0.voli'
  | 'volibear_quad_turn_left_90.voli'
  | 'volibear_quad_turn_right_90.voli'
  | 'Spell4_Cast'
  | 'volibear_spell4_ground_pound.voli'
  | 'volibear_spell4_tower_attacks_1.voli'
  | 'volibear_spell4_tower_attacks_2.voli'
  | 'volibear_spell3_moving.voli'
  | 'volibear_spell1_attack_stationary_to_idle.voli'
  | 'volibear_spell1_attack_to_run.voli'
  | 'volibear_spell1_intro.voli'
  | 'volibear_spell1_outro.voli'
  | 'volibear_spell1_intro_to_run.voli'
  | 'volibear_quad_turn_left.voli'
  | 'volibear_quad_turn_right.voli'
  | 'volibear_spell4_ground_pound_to_idle.voli'
  | 'volibear_idle_in_left.voli'
  | 'idle_in_r_foot.voli'
  | 'volibear_spell1_attack_stationary.voli'
  | 'volibear_spell1_run_to_biped_run.voli'
  | 'volibear_spell4_ground_pound_to_autoattack.voli'
  | 'volibear_spell4_spell1_walk.pie_c_11_21'
  | 'volibear_bear_spell4_spell1_idle.voli'
  | 'volibear_spell4_walk_intro_spell1_run.pie_c_11_21'
  | 'volibear_bear_spell4_spell1_walk_to_spell4_run.voli'
  | 'Spell4_Idle'
  | 'volibear_spell2_slash_to_walk.voli'
  | 'volibear_spell2_slash.voli'
  | 'Spell2_To_Run'
  | 'volibear_spell3_to_idle.voli'
  | 'Run_Slow'
  | 'Crit_End'
  | 'Crit_to_idle'
  | 'Crit_to_run'
  | 'KnockUp'
  | 'Recall'
  | 'Run_Base'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Dance_Loop'
  | 'Joke_Cycle'
  | 'volibear_tower_attack.voli'
  | 'volibear_run_lookaround_1.voli'
  | 'volibear_idle_variant_1.voli'
  | 'volibear_attack1_to_run.voli'
  | 'volibear_attack2_to_run.voli'
  | 'Spell4_Run'
  | 'volibear_spell4_ground_pound_to_run.voli'
  | 'volibear_spell4_ground_pound_hold.voli'
  | 'volibear_spell1_attack_to_autoattack.voli'
  | 'volibear_spell4_ground_pound_leadout.voli'
  | 'volibear_knockup_to_idle.voli'
  | 'volibear_run.voli'
  | 'volibear_spell4_spell1_intro.voli'
  | 'volibear_spell4_spell1_outro.voli'
  | 'volibear_spell4_spell1_attack_to_run.voli'
  | 'volibear_spell1_to_autoattack.voli'
  | 'volibear_celebrate.voli'
  | 'volibear_starting_run.voli'
  | 'volibear_starting_run_to_standing_idle.voli'
  | 'volibear_spell2_slash_to_idle.voli'
  | 'volibear_spell2_to_idle.voli'
  | 'volibear_bear_spell4_spell1_walk.voli'
  | 'volibear_spell4_walk_intro_spell1_run.voli'
  | 'Recall_Start'
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
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.PoroA_Root} />
        <primitive object={nodes.PoroB_Root} />
        <primitive object={nodes.PoroC_Root} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-147.91, 0, -382.98]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Poro}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Dragon}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
