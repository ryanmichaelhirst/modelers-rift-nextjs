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
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Kunai_Spawn_a: THREE.Bone
    L_Kunai_Spawn_b: THREE.Bone
    L_Kunai_Spawn_c: THREE.Bone
    R_Kunai_Spawn_a: THREE.Bone
    R_Kunai_Spawn_b: THREE.Bone
    R_Kunai_Spawn_c: THREE.Bone
    Snap_Kama2World: THREE.Bone
    Snap_KamaGrip2World: THREE.Bone
    Snap_Kunai2World: THREE.Bone
  }
  materials: {
    Akali_Sashimi_Body_Mat: THREE.MeshBasicMaterial
    kama_grip: THREE.MeshBasicMaterial
    kama_left: THREE.MeshBasicMaterial
    kama_right: THREE.MeshBasicMaterial
    kunai_hand: THREE.MeshBasicMaterial
    recall: THREE.MeshBasicMaterial
    chopsticks: THREE.MeshBasicMaterial
    ramen: THREE.MeshBasicMaterial
    ramen_noodles: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'akali_base_run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'akali_base_run_fast'
  | 'akali_base_run_variant1'
  | 'Run_Homeguard'
  | 'Spell3_Dash'
  | 'Spell4_To_Dash'
  | 'Spell4_Out'
  | 'Idle_In1'
  | 'Spell3_To_Idle'
  | 'Spell3_To_Run'
  | 'akali_base_spell3_dash_attack'
  | 'akali_base_spell3_dash_attack_in_idle'
  | 'Passive_Idle'
  | 'akali_base_run_passive'
  | 'Passive'
  | 'akali_base_passive'
  | 'Passive_Attack'
  | 'Idle_In2'
  | 'akali_base_spell3_to_passive_idle'
  | 'akali_base_spell3_to_passive_run'
  | 'Spell3_Jump'
  | 'akali_base_spell4_dash'
  | 'Spell4_Dash2'
  | 'akali_base_spell4_dash_to_idle'
  | 'Spell1_To_Idle'
  | 'Spell1_90'
  | 'Spell1_180'
  | 'Spell1_-90'
  | 'Spell1_-180'
  | 'Spell1_0'
  | 'akali_base_run_fast_variant1'
  | 'Spell1_To_Run'
  | 'Spell1_to_Run_fast'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Spell3_Dash_In'
  | 'akali_attack_passive_to_idle'
  | 'akali_base_melee_attack_passive'
  | 'akali_base_attack1_to_run'
  | 'akali_base_attack2_to_run'
  | 'akali_base_attack1_to_run_fast'
  | 'Attack2_to_Run_Fast'
  | 'akali_base_attack_passive_to_run_fast'
  | 'akali_base_attack_passive_to_run'
  | 'akali_base_spell4_dash_to_run'
  | 'Spell4_Dash1_Hit'
  | 'Spell4_Dash1_Hit_to_Idle'
  | 'akali_base_spell4_dash1_hit_to_run_fast'
  | 'akali_base_spell4_dash_to_idle_passive'
  | 'Spell4_Dash1_to_Run_Passive'
  | 'akali_base_spell4_dash_to_run_fast'
  | 'Spell4_Dash1_Hit_to_Idle_Passive'
  | 'Spell4_Dash1_Hit_to_Run_passive'
  | 'akali_base_run_passive_90'
  | 'akali_base_run_passive_180'
  | 'akali_base_run_passive_-90'
  | 'akali_base_run_passive_-180'
  | 'Spell4_Dash2_to_Run'
  | 'akali_base_attack1_to_run2'
  | 'Attack1_to_Run_Fast_2'
  | 'Attack2_to_Run_2'
  | 'Spell3_Jump_to_Dash'
  | 'Spell3_Jump_Attack'
  | 'akali_base_spell3_jump_attack_in_idle'
  | 'Taunt_Start'
  | 'Taunt_loop'
  | 'akali_base_run_passive_45'
  | 'akali_base_run_passive_-45'
  | 'akali_base_run_passive_135'
  | 'akali_base_run_passive_-135'
  | 'Spell4_Dash2_to_Idle'
  | 'Recall'
  | 'Spell4_Dash2_to_Run_Passive'
  | 'Respawn'
  | 'Joke_Start'
  | 'Joke_Loop'
  | 'Run_Slow'
  | 'Spell1_to_Attack1'
  | 'Spell1_to_Attack2'
  | 'Idle4'
  | 'akali_base_run_fast_variants2'
  | 'Recall_Winddown'
  | 'Run'
  | 'akali_base_spell3_to_passive_run_135_-135_180_-180'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Kunai_Spawn_a} />
        <primitive object={nodes.L_Kunai_Spawn_b} />
        <primitive object={nodes.L_Kunai_Spawn_c} />
        <primitive object={nodes.R_Kunai_Spawn_a} />
        <primitive object={nodes.R_Kunai_Spawn_b} />
        <primitive object={nodes.R_Kunai_Spawn_c} />
        <primitive object={nodes.Snap_Kama2World} />
        <primitive object={nodes.Snap_KamaGrip2World} />
        <primitive object={nodes.Snap_Kunai2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Akali_Sashimi_Body_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.kama_grip}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.kama_left}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.kama_right}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.kunai_hand}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.recall} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.chopsticks}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.ramen} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.ramen_noodles}
        skeleton={nodes.mesh_0_8.skeleton}
      />
    </group>
  )
}
