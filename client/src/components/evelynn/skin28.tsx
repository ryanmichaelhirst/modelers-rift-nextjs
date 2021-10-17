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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Sphere_Loc: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
    Lasher_Fur_Root: THREE.Bone
    R_Lasher_Fur01: THREE.Bone
    R_Lasher_Fur02: THREE.Bone
    R_Lasher_Fur03: THREE.Bone
    R_Lasher_Fur04: THREE.Bone
    L_Lasher_Fur01: THREE.Bone
    L_Lasher_Fur02: THREE.Bone
    L_Lasher_Fur03: THREE.Bone
    L_Lasher_Fur04: THREE.Bone
    R_MiniLash07: THREE.Bone
    L_MiniLash07: THREE.Bone
    R_MiniLash01_Ground: THREE.Bone
    L_MiniLash01_Ground: THREE.Bone
    R_Lasher_TopFur01: THREE.Bone
    L_Lasher_TopFur01: THREE.Bone
    R_Spike_Lasher02_SKN_Ground: THREE.Bone
    L_Spike_Lasher02_SKN_Ground: THREE.Bone
    Throne_Root: THREE.Bone
    Flower_Root: THREE.Bone
    Raven_Root: THREE.Bone
    Butterfly_Root: THREE.Bone
  }
  materials: {
    Evelynn_Mat: THREE.MeshBasicMaterial
    Evelynn_Shadow_Mat: THREE.MeshBasicMaterial
    Throne_Mat: THREE.MeshBasicMaterial
    Flower_Mat: THREE.MeshBasicMaterial
    Raven_Mat: THREE.MeshBasicMaterial
    Butterfly_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Joke'
  | 'Laugh_In'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt_In'
  | 'Spell3'
  | 'idle01.pie_c_11_16'
  | 'IdleIn'
  | 'idle01_tostealth_idle01.pie_c_11_16'
  | 'Knockup_Base'
  | 'KnockUp_Loop'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Respawn_Idle_Hookup'
  | 'Respawn_StealthIdle_Hookup'
  | 'runfast_base.pie_c_11_16'
  | 'Run_Base'
  | 'evelynn_run_empower_active'
  | 'Run_Homeguard'
  | 'Run_Hurt'
  | 'spell1_idle_l.pie_c_11_16'
  | 'spell1_idle_r.pie_c_11_16'
  | 'spell1_run_l.pie_c_11_16'
  | 'spell1_run_r.pie_c_11_16'
  | 'Spell1_ToRun'
  | 'spell2_toidle.pie_c_11_16'
  | 'spell2_torun.pie_c_11_16'
  | 'runin_stealth.pie_c_11_16'
  | 'stealth_idle01.pie_c_11_16'
  | 'spell2_tostealthrun.pie_c_11_16'
  | 'Spell3_Empowered'
  | 'Spell3_Empowered_Attack'
  | 'Spell4_Out'
  | 'Spell4_To_Run'
  | 'idlein_stealth.pie_c_11_16'
  | 'stealth_idle02.pie_c_11_16'
  | 'runfast.pie_c_11_16'
  | 'evelynn_run_turn_0'
  | 'run_transition_stealthrun.pie_c_11_16'
  | 'Stealth_Run_Haste_Transition'
  | 'Stunned'
  | 'Taunt_Hookup_Idle'
  | 'evelynn_taunt_hookup_stealth'
  | 'Turn_0'
  | 'TURN_L_360'
  | 'TURN_R_360'
  | 'Stealth_Idle01_IN_Slow'
  | 'Spell4_To_Idle'
  | 'Idle2_Base'
  | 'Spell1_ToIdle'
  | 'Run_Homeguard_IN'
  | 'homeguard_to_idle.pie_c_11_16'
  | 'Run_Homeguard_To_Run'
  | 'homeguard_to_stealth_idle.pie_c_11_16'
  | 'Taunt_loop'
  | 'Recall'
  | 'Spawn'
  | 'Attack1_To_Idle'
  | 'attack01_to_run.pie_c_11_16'
  | 'Attack2_To_Idle'
  | 'attack02_to_run.pie_c_11_16'
  | 'Attack3_To_Idle'
  | 'attack03_to_run.pie_c_11_16'
  | 'Dance_Intro'
  | 'Dance_Loop'
  | 'Laugh_Loop'
  | 'Idle_To_Run'
  | 'runin_fast.pie_c_11_16'
  | 'spell1_swipe_torun.pie_c_11_16'
  | 'spell1_b_toidle.pie_c_11_16'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Sphere_Loc} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.Lasher_Fur_Root} />
        <primitive object={nodes.R_Lasher_Fur01} />
        <primitive object={nodes.R_Lasher_Fur02} />
        <primitive object={nodes.R_Lasher_Fur03} />
        <primitive object={nodes.R_Lasher_Fur04} />
        <primitive object={nodes.L_Lasher_Fur01} />
        <primitive object={nodes.L_Lasher_Fur02} />
        <primitive object={nodes.L_Lasher_Fur03} />
        <primitive object={nodes.L_Lasher_Fur04} />
        <primitive object={nodes.R_MiniLash07} />
        <primitive object={nodes.L_MiniLash07} />
        <primitive object={nodes.R_MiniLash01_Ground} />
        <primitive object={nodes.L_MiniLash01_Ground} />
        <primitive object={nodes.R_Lasher_TopFur01} />
        <primitive object={nodes.L_Lasher_TopFur01} />
        <primitive object={nodes.R_Spike_Lasher02_SKN_Ground} />
        <primitive object={nodes.L_Spike_Lasher02_SKN_Ground} />
        <primitive object={nodes.Throne_Root} />
        <primitive object={nodes.Flower_Root} />
        <primitive object={nodes.Raven_Root} />
        <primitive object={nodes.Butterfly_Root} />
      </group>
      <group position={[-151.46, -23.24, -308.69]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Evelynn_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Evelynn_Shadow_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Throne_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Flower_Mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Raven_Mat}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Butterfly_MAT}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}
