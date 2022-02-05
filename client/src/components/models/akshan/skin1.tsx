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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon_VFX_snap: THREE.Bone
    Hook_snap: THREE.Bone
    Screen1: THREE.Bone
    Circle_Screens: THREE.Bone
    Screen4: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hood: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Recall_Screen1: THREE.MeshBasicMaterial
    Recall_Screen2: THREE.MeshBasicMaterial
    Recall_Screen3: THREE.MeshBasicMaterial
    Recall_Screen4: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Idle1_Base'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Loop'
  | 'Crit'
  | 'Dance_In'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Injured'
  | 'Spell1'
  | 'spell2_run.akshan'
  | 'Spell2_Idle'
  | 'taunt_intro.akshan'
  | 'Spell3'
  | 'akshan_spell3_swing_shooting_0.akshan'
  | 'akshan_spell3_swing_shooting_90.akshan'
  | 'akshan_spell3_swing_shooting_-90.akshan'
  | 'Spell3_ToIdle'
  | 'Spell4_Hit'
  | 'Spell4_To_Run'
  | 'akshan_spell3_roll.akshan'
  | 'spell4_move_forward.akshan'
  | 'akshan_base_spell4_nomove_0.akshan'
  | 'spell4_move_back.akshan'
  | 'spell4_move_right.akshan'
  | 'spell4_move_left.akshan'
  | 'akshan_base_spell4_nomove_90.akshan'
  | 'akshan_base_spell4_nomove_-90.akshan'
  | 'akshan_base_spell4_nomove_-180.akshan'
  | 'akshan_base_spell4_nomove_180.akshan'
  | 'spell4_cast_move_forward.akshan'
  | 'spell4_cast_back.akshan'
  | 'spell4_cast_left.akshan'
  | 'spell4_cast_move_right.akshan'
  | 'akshan_base_spell4_cast_nomove.akshan'
  | 'akshan_base_spell4_lasthit_to_idle.akshan'
  | 'akshan_spell3_close.akshan'
  | 'akshan_spell3_close_toidle.akshan'
  | 'akshan_spell3_swing_idle_0.akshan'
  | 'akshan_spell3_counter_swing_idle.akshan'
  | 'akshan_spell3_counter_swing_shooting_0.akshan'
  | 'akshan_spell3_counter_swing_shooting_90.akshan'
  | 'akshan_spell3_counter_swing_shooting_-90.akshan'
  | 'Spell3_Attack'
  | 'akshan_base_spell3_for_r_-90.akshan'
  | 'akshan_base_spell3_for_r_-180.akshan'
  | 'akshan_base_spell3_for_r_0.akshan'
  | 'akshan_base_spell3_for_r_90.akshan'
  | 'akshan_base_spell3_for_r_180.akshan'
  | 'akshan_spell3_swing_shooting_180.akshan'
  | 'akshan_spell3_swing_shooting_-180.akshan'
  | 'akshan_spell3_counter_swing_shooting_180.akshan'
  | 'akshan_spell3_counter_swing_shooting_-180.akshan'
  | 'akshan_base_spell3_attack_toidle.akshan'
  | 'spell2_exit.akshan'
  | 'spell2_intro_to_run.akshan'
  | 'spell2_sneak_walk.akshan'
  | 'spell2_walk_look_around.akshan'
  | 'run_varient.akshan'
  | 'Run_Homeguard'
  | 'Turn_0'
  | 'turn_left.akshan'
  | 'turn_right.akshan'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'spell2_exit_to_run.akshan'
  | 'spell1_to_run.akshan'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'Idle_In'
  | 'akshan_base_spell4_lasthit.akshan'
  | 'spell4_last_hit_to_run.akshan'
  | 'attack2_from_base_attack1.akshan'
  | 'attack2_to_run.akshan'
  | 'Attack2_To_Idle'
  | 'Stunned'
  | 'taunt_cycle.akshan'
  | 'spell1_catch.akshan'
  | 'run_boots.akshan'
  | 'KnockUp'
  | 'Death'
  | 'spell3_impact.akshan'
  | 'spell3_into_counter_swing_idle_0.akshan'
  | 'spell3_into_swing_idle_0.akshan'
  | 'Spell3_To_Idle'
  | 'akshan_spell3_to_run.akshan'
  | 'Spell3_Into_IDLE'
  | 'akshan_spell3_swing_r_0.akshan'
  | 'spell3_swing_r_180.akshan'
  | 'akshan_spell3_swing_r_-180.akshan'
  | 'spell3_swing_r_90.akshan'
  | 'spell3_swing_r_-90.akshan'
  | 'akshan_spell3_counter_swing_r_0.akshan'
  | 'akshan_spell3_counter_swing_r_180.akshan'
  | 'akshan_spell3_counter_swing_r_-180.akshan'
  | 'akshan_spell3_counter_swing_r_90.akshan'
  | 'akshan_spell3_counter_swing_r_-90.akshan'
  | 'Spell1_Into_Idle'
  | 'Idle1_Var1'
  | 'Channel_Windup'
  | 'Spawn'
  | 'Attack1_To_Idle'
  | 'Crit_to_idle'
  | 'spell3_roll_to_idle.akshan'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon_VFX_snap} />
        <primitive object={nodes.Hook_snap} />
        <primitive object={nodes.Screen1} />
        <primitive object={nodes.Circle_Screens} />
        <primitive object={nodes.Screen4} />
      </group>
      <group position={[-98.76, -0.14, -46.24]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Hood}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Screen1}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Screen2}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Recall_Screen3}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Recall_Screen4}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
