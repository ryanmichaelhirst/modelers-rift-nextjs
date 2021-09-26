import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import aatrox from '@assets/aatrox/skin1.glb'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_0_1: THREE.SkinnedMesh
    Mesh_0_2: THREE.SkinnedMesh
    Mesh_0_3: THREE.SkinnedMesh
    Mesh_0_4: THREE.SkinnedMesh
    Mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    RunPython: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Sword: THREE.MeshBasicMaterial
    Wings: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Shoulder: THREE.MeshBasicMaterial
    Banner: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'aatrox_buffbones'
  | 'aatrox_death_death_into_run1'
  | 'aatrox_death_finisher4'
  | 'aatrox_death_idle'
  | 'aatrox_death_into_idle'
  | 'aatrox_death_run'
  | 'aatrox_ground_q1_into_passiveidle'
  | 'aatrox_ground_q1'
  | 'aatrox_ground_q1_to_unsheathrun'
  | 'aatrox_ground_q2'
  | 'aatrox_ground_q2_to_idle'
  | 'aatrox_ground_q2_to_passiveidle'
  | 'aatrox_ground_q3_into_idle1'
  | 'aatrox_ground_q3_into_passiverun'
  | 'aatrox_ground_q3'
  | 'aatrox_idle1'
  | 'aatrox_passive_into_idle1'
  | 'aatrox_passive_into_shlth'
  | 'aatrox_passive_q1_into_run1'
  | 'aatrox_passive_q2_into_run'
  | 'aatrox_resheath_fullbody'
  | 'aatrox_sheath_run01'
  | 'aatrox_skin01_wing_override'
  | 'aatrox_spell3_dash'
  | 'aatrox_spell3_dash_passive'
  | 'aatrox_spell3_dash_to_walk'
  | 'aatrox_spell4'
  | 'aatrox_spell_dash_running'
  | 'aatrox_taunt'
  | 'aatrox_towerattack'
  | 'aatrox_ult_idle'
  | 'aatrox_ult_into'
  | 'aatrox_ult'
  | 'aatrox_ult_q1'
  | 'aatrox_ult_q2'
  | 'aatrox_ult_q3'
  | 'aatrox_ult_spell_dash'
  | 'aatrox_ult_spell_dash_to_run'
  | 'aatrox_ult_taunt'
  | 'aatrox_unsheath_idle1'
  | 'aatrox_unsheath'
  | 'aatrox_wings_null'
  | 'Attack1'
  | 'Attack1_Ult'
  | 'Attack2'
  | 'Attack2_Ult'
  | 'Attack3'
  | 'Attack_INTO_Run'
  | 'BannerOff'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Death_INTO_Idle'
  | 'Death_INTO_PassiveIdle'
  | 'Death_INTO_PassiveRun'
  | 'Death_INTO_Run'
  | 'Death'
  | 'Death_Run'
  | 'Idle1'
  | 'Idle_in_sheath'
  | 'idle_into_passive_run'
  | 'Joke'
  | 'Laugh'
  | 'Passive_Attack'
  | 'Passive_Attack_out'
  | 'Passive_Idle'
  | 'Passive_Run'
  | 'Q1_INTO_Idle'
  | 'Q1_INTO_Run'
  | 'Q2_INTO_Run'
  | 'Q3_INTO_Passive_Idle'
  | 'Q3_INTO_Run'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Run_Ult'
  | 'Spell3'
  | 'Spell3_Passive'
  | 'Spell3_Passive_to_Run'
  | 'Spell3_to_walk'
  | 'Spell3_ULT'
  | 'Spell3_Unsheath'
  | 'Spell3_Unsheath_to_Idle'
  | 'Spell3_Unsheath_to_Run'
  | 'Spell4'
  | 'Stunned'
  | 'Taunt_loop'
  | 'ULT_Idlein'
  | 'ULT_out'
  | 'ULT_out_to_passive_idle'
  | 'ULT_Taunt_loop'
  | 'ULT_TowerAttack'
  | 'Unsheath_run01'
  | 'Unsheath_to_Passive'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(aatrox) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: 'aatrox' })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, 0]} scale={[-1, -1, -1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.RunPython} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <skinnedMesh
          geometry={nodes.Mesh_0_1.geometry}
          material={materials.Sword}
          skeleton={nodes.Mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0_2.geometry}
          material={materials.Wings}
          skeleton={nodes.Mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0_3.geometry}
          material={materials.Body}
          skeleton={nodes.Mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0_4.geometry}
          material={materials.Shoulder}
          skeleton={nodes.Mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0_5.geometry}
          material={materials.Banner}
          skeleton={nodes.Mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(aatrox)
