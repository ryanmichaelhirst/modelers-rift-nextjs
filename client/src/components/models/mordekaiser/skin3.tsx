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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    Mace_Hand_Driver: THREE.Bone
    Mace: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Skin03_Guitar: THREE.Bone
    Skin03_Speaker_A: THREE.Bone
    Skin03_Speaker_B: THREE.Bone
    Poro_Root: THREE.Bone
    Poro_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Mordekaiser_Skin03_Mat: THREE.MeshBasicMaterial
    Mace: THREE.MeshBasicMaterial
    Guitar: THREE.MeshBasicMaterial
    Speaker: THREE.MeshBasicMaterial
    Crown: THREE.MeshBasicMaterial
    Poro_ShadowIsles_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'idle'
  | 'Laugh'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'spell2_cast'
  | 'turns_left_90'
  | 'turn_right_90'
  | 'Turn_0'
  | 'Idle_In'
  | 'Homeguard'
  | 'Run_Homeguard'
  | 'Walk'
  | 'spell3_cast'
  | 'Spell1_To_Idle'
  | 'spell_1_torun_0'
  | 'spell_1_torun_90'
  | 'spell_1_torun_-90'
  | 'spell_1_torun_180'
  | 'spell_1_torun_-180'
  | 'Spell2_Idle'
  | 'spell2_walk'
  | 'spell2_intro_upper_walk'
  | 'spell4_move'
  | 'spell2_outro'
  | 'spell2_run_exit'
  | 'spell2_intro'
  | 'spell2_run_sheild_consume_exit'
  | 'spell2_consume_shield'
  | 'Spell2_Idle_In'
  | 'spell3_cast_walk'
  | 'battle_idle_to_idle'
  | 'Battle_Idle'
  | 'Passive'
  | 'spell1_to_attack'
  | 'recall'
  | 'Spell4_To_Idle'
  | 'old_morde_walk'
  | 'Joke'
  | 'Joke_In'
  | 'spell3_cast_to_idle'
  | 'Spell4_To_Run'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'autoattack1_to_run'
  | 'autoattack2_to_run'
  | 'old_morde_walk_to_battle_idle'
  | 'spell2_idle_to_spell2_walk'
  | 'Attack_Turret'
  | 'respawn_part1'
  | 'autoattack1'
  | 'Attack1_Fast'
  | 'spell3_cast_walk_to_run'
  | 'battle_idle_to_walk'
  | 'spell3_cast_from_spell2'
  | 'spell3_cast_walk_from_spell2'
  | 'spell_4_cast_to_spell2_idle'
  | 'spell_4_cast_to_spell2_run'
  | 'spell1_to_spell2_idle'
  | 'spell1_to_spell2_run'
  | 'respawn_part2'
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
        <primitive object={nodes.Mace_Hand_Driver} />
        <primitive object={nodes.Mace} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Skin03_Guitar} />
        <primitive object={nodes.Skin03_Speaker_A} />
        <primitive object={nodes.Skin03_Speaker_B} />
        <primitive object={nodes.Poro_Root} />
        <primitive object={nodes.Poro_C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-165.21, -43.14, -330.45]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Mordekaiser_Skin03_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Mace}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Guitar}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Speaker}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Crown}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Poro_ShadowIsles_Mat}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}
