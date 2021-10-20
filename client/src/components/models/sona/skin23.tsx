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
    Weapon: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_BUFFBONE_CSTM_RECTICLE_LOC: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_MechArm1: THREE.Bone
    R_MechArm1: THREE.Bone
    FlashCard: THREE.Bone
    DroneA_Chassis: THREE.Bone
    DroneB_Chassis: THREE.Bone
    DroneC_Chassis: THREE.Bone
  }
  materials: {
    Instrument: THREE.MeshBasicMaterial
    Instrument_VFX: THREE.MeshBasicMaterial
    Unbound: THREE.MeshBasicMaterial
    Bound: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
    Card: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1_Idle'
  | 'Spell2_Idle'
  | 'Spell3_Idle'
  | 'Taunt'
  | 'Recall'
  | 'Run_To_Idle'
  | 'unbound_idle1.pie_c_10_18'
  | 'unbound_run.pie_c_10_18'
  | 'unbound_run_to_idle1.pie_c_10_18'
  | 'Idle2'
  | 'Idle3'
  | 'unbound_idle2.pie_c_10_18'
  | 'unbound_idle3.pie_c_10_18'
  | 'unbound_spell1_idle.pie_c_10_18'
  | 'unbound_spell3_idle.pie_c_10_18'
  | 'unbound_spell3_run.pie_c_10_18'
  | 'unbound_attack2.pie_c_10_18'
  | 'unbound_crit.pie_c_10_18'
  | 'unbound_attack2_torun.pie_c_10_18'
  | 'unbound_spell1_run.pie_c_10_18'
  | 'unbound_spell2_idle.pie_c_10_18'
  | 'unbound_spell2_run.pie_c_10_18'
  | 'unbound_attack1_torun.pie_c_10_18'
  | 'unbound_crit_torun.pie_c_10_18'
  | 'attack_torun.pie_c_10_18'
  | 'unbound_run_haste.pie_c_10_18'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'unbound_run_haste_to_idle1.pie_c_10_18'
  | 'unbound_recall.pie_c_10_18'
  | 'unbound_death.pie_c_10_18'
  | 'spell4_idle.pie_c_10_18'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'Respawn'
  | 'unbound_respawn.pie_c_10_18'
  | 'unbound_taunt.pie_c_10_18'
  | 'Spell1_Run'
  | 'unbound_joke.pie_c_10_18'
  | 'unbound_channel.pie_c_10_18'
  | 'unbound_channel_wndup.pie_c_10_18'
  | 'Spell2_Run'
  | 'Spell3_Run'
  | 'Dance_In'
  | 'Turn_-90'
  | 'Turn_90'
  | 'Turn_0'
  | 'Spell4_0'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'Spell4_180'
  | 'Spell4_-180'
  | 'breakout.pie_c_10_18'
  | 'breakout_moving.pie_c_10_18'
  | 'unbound_dance_loop.pie_c_10_19'
  | 'unbound_dance_in.pie_c_10_18'
  | 'unbound_laugh.pie_c_10_18'
  | 'Recall_Winddown'
  | 'unbound_attack1.pie_c_10_18'
  | 'HealthBar'
  | 'Attack3'
  | 'death.pie_c_10_18'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_BUFFBONE_CSTM_RECTICLE_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_MechArm1} />
        <primitive object={nodes.R_MechArm1} />
        <primitive object={nodes.FlashCard} />
        <primitive object={nodes.DroneA_Chassis} />
        <primitive object={nodes.DroneB_Chassis} />
        <primitive object={nodes.DroneC_Chassis} />
      </group>
      <group position={[-80.81, 0.09, -67.34]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Instrument}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Instrument_VFX}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Unbound}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Bound}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Joke}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Card}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}
