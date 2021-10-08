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
    mesh_0_17: THREE.SkinnedMesh
    mesh_0_18: THREE.SkinnedMesh
    mesh_0_19: THREE.SkinnedMesh
    Root: THREE.Bone
    Lance: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Lance_Ground: THREE.Bone
    C_Crown: THREE.Bone
    H_Root: THREE.Bone
    H_Spine4_Ground: THREE.Bone
    H_Buffbone_Glb_Channel_Loc: THREE.Bone
    H_Buffbone_Glb_Ground_Loc: THREE.Bone
    H_C_Buffbone_Cstm_Healthbar: THREE.Bone
    H_C_Buffbone_Glb_Center_Loc: THREE.Bone
    H_C_Buffbone_Glb_Layout_Loc: THREE.Bone
    H_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    J_JokeHorsie_Root: THREE.Bone
  }
  materials: {
    Armor_Chest: THREE.MeshBasicMaterial
    Armor_Shoulder: THREE.MeshBasicMaterial
    Armor_Foot: THREE.MeshBasicMaterial
    Armor_Gauntlet: THREE.MeshBasicMaterial
    Armor_Leg_Lower: THREE.MeshBasicMaterial
    Armor_Leg_Mid: THREE.MeshBasicMaterial
    Armor_Leg: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Lance: THREE.MeshBasicMaterial
    LanceMetal: THREE.MeshBasicMaterial
    Crown: THREE.MeshBasicMaterial
    Horse_Tail: THREE.MeshBasicMaterial
    Horse_Head: THREE.MeshBasicMaterial
    Horse_Backlegs: THREE.MeshBasicMaterial
    Horse_FrontLegs: THREE.MeshBasicMaterial
    Horse_Midsection: THREE.MeshBasicMaterial
    Horse_Saddle: THREE.MeshBasicMaterial
    Horse_Rear: THREE.MeshBasicMaterial
    JokeHorsie_Stand: THREE.MeshBasicMaterial
    JokeHorsie: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'dance_1.darksupport'
  | 'Death'
  | 'idle.darksupport'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'biped_idle.darksupport'
  | 'biped_walk.darksupport'
  | 'biped_spell1.darksupport'
  | 'biped_spell1_into_walk_0.darksupport'
  | 'biped_spell1_into_idle.darksupport'
  | 'Spell1_To_Idle'
  | 'run_slow.darksupport'
  | 'homeguard.darksupport'
  | 'biped_homeguard.darksupport'
  | 'attack1_biped.darksupport'
  | 'attack2_biped.darksupport'
  | 'rell_spell2_dismount.darksupport'
  | 'Idle_In'
  | 'biped_crit.darksupport'
  | 'spell3_cast_0.darksupport'
  | 'spell3_cast_l_-90.darksupport'
  | 'spell3_cast_l_-180.darksupport'
  | 'spell3_cast_180.darksupport'
  | 'spell3_cast_r_90.darksupport'
  | 'spell3_break.darksupport'
  | 'spell3_break_to_idle.darksupport'
  | 'biped_spell3_cast_0.darksupport'
  | 'biped_spell3_cast_180.darksupport'
  | 'biped_spell3_cast_90.darksupport'
  | 'biped_spell3_cast_-180.darksupport'
  | 'biped_spell3_cast_-90.darksupport'
  | 'biped_spell4_cast.darksupport'
  | 'biped_spell4_end.darksupport'
  | 'turn_right_-90.darksupport'
  | 'turn_left_90.darksupport'
  | 'Turn_0'
  | 'spell2_flip.darksupport'
  | 'spell2_flip_to_idle.darksupport'
  | 'spell2_flip_to_run.darksupport'
  | 'spell3_break_to_run.darksupport'
  | 'rell_mounted_spell4_running_to_idle.darksupport'
  | 'biped_idle_in.darksupport'
  | 'Spell4_To_Run'
  | 'dance_2.darksupport'
  | 'dance_3.darksupport'
  | 'dance_mounted_in.darksupport'
  | 'rell_mounted_spell4_additive_armor_flare.darksupport'
  | 'biped_attack_into_run_0.darksupport'
  | 'attack_biped_1.darksupport'
  | 'attack2_biped_into_idle.darksupport'
  | 'attack1_biped_into_idle.darksupport'
  | 'biped_dance_in.darksupport'
  | 'biped_spell1_into_walk_90.darksupport'
  | 'biped_spell1_into_walk_180.darksupport'
  | 'biped_spell1_into_walk_-180.darksupport'
  | 'biped_spell1_into_walk_-90.darksupport'
  | 'rell_mounted_spell1_to_run.darksupport'
  | 'spell1_to_run_right.darksupport'
  | 'spell1_to_run_left.darksupport'
  | 'turn_180_right.darksupport'
  | 'turn_180_left.darksupport'
  | 'biped_into_walk.darksupport'
  | 'biped_spell4_into_walk.darksupport'
  | 'run_slow_var1.darksupport'
  | 'biped_death.darksupport'
  | 'biped_attack_into_run_90.darksupport'
  | 'biped_attack_into_run_-90.darksupport'
  | 'biped_attack_into_run_180.darksupport'
  | 'biped_attack_into_run_-180.darksupport'
  | 'auto_attak_to_run_0.darksupport'
  | 'auto_attack_to_run_-90.darksupport'
  | 'auto_attack_to_run_90.darksupport'
  | 'auto_attack_to_run_180.darksupport'
  | 'spell2_mount_to_idle.darksupport'
  | 'spell2_mount_to_run.darksupport'
  | 'homeguard_90.darksupport'
  | 'homeguard_-90.darksupport'
  | 'spell2_into_biped_walk.darksupport'
  | 'spell2_dismount_into_idle.darksupport'
  | 'biped_spell3_into_idle.darksupport'
  | 'biped_spell3_into_run.darksupport'
  | 'Idle1_Var1'
  | 'Recall'
  | 'Recall_Winddown'
  | 'biped_turn_left.darksupport'
  | 'biped_turn_right.darksupport'
  | 'biped_spell3_break.darksupport'
  | 'biped_spell3_break_into_idle.darksupport'
  | 'biped_spell3_break_into_run.darksupport'
  | 'Spawn'
  | 'biped_channel.darksupport'
  | 'biped_channel_windup.darksupport'
  | 'biped_recall.darksupport'
  | 'biped_laugh.darksupport'
  | 'Laugh'
  | 'Joke_Intro'
  | 'Joke_Cycle'
  | 'joke_cycly_biped.darksupport'
  | 'joke_intro_biped.darksupport'
  | 'biped_turn_0.darksupport'
  | 'Respawn'
  | 'biped_taunt.darksupport'
  | 'Crit_to_run'
  | 'Crit_to_idle'
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
        <primitive object={nodes.Lance} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Lance_Ground} />
        <primitive object={nodes.C_Crown} />
        <primitive object={nodes.H_Root} />
        <primitive object={nodes.H_Spine4_Ground} />
        <primitive object={nodes.H_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.H_Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.H_C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.H_C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.H_C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.H_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.J_JokeHorsie_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Armor_Chest}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Armor_Shoulder}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Armor_Foot}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Armor_Gauntlet}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Armor_Leg_Lower}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Armor_Leg_Mid}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Armor_Leg}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Lance}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.LanceMetal}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Crown}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Horse_Tail}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Horse_Head}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Horse_Backlegs}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.Horse_FrontLegs}
        skeleton={nodes.mesh_0_14.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_15.geometry}
        material={materials.Horse_Midsection}
        skeleton={nodes.mesh_0_15.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_16.geometry}
        material={materials.Horse_Saddle}
        skeleton={nodes.mesh_0_16.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_17.geometry}
        material={materials.Horse_Rear}
        skeleton={nodes.mesh_0_17.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_18.geometry}
        material={materials.JokeHorsie_Stand}
        skeleton={nodes.mesh_0_18.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_19.geometry}
        material={materials.JokeHorsie}
        skeleton={nodes.mesh_0_19.skeleton}
      />
    </group>
  )
}
