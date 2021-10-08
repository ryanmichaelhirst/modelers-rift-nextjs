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
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    RunPython: THREE.Bone
    Weapon_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Body_World: THREE.Bone
    Mask3: THREE.Bone
    Mask6: THREE.Bone
    Mask1: THREE.Bone
    Mask5: THREE.Bone
    Mask2: THREE.Bone
    Mask4: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Sword: THREE.MeshBasicMaterial
    Shoulder: THREE.MeshBasicMaterial
    Banner: THREE.MeshBasicMaterial
    Spikes: THREE.MeshBasicMaterial
    Shadow_Form: THREE.MeshBasicMaterial
    Wings: THREE.MeshBasicMaterial
    Masks_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Death'
  | 'Channel_Wndup'
  | 'Channel'
  | 'aatrox_unsheath'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Stunned'
  | 'Spell3'
  | 'Spell4'
  | 'aatrox_ult'
  | 'aatrox_spell4'
  | 'Joke'
  | 'Laugh'
  | 'Attack2_Ult'
  | 'Recall_Winddown'
  | 'aatrox_ult_idle'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Attack1_Ult'
  | 'aatrox_ult_into'
  | 'Spell3_ULT'
  | 'Attack1'
  | 'Unsheath_run01'
  | 'aatrox_unsheath_idle1'
  | 'aatrox_ground_q1'
  | 'aatrox_ground_q2'
  | 'aatrox_ground_q3'
  | 'Passive_Attack'
  | 'Passive_Idle'
  | 'Passive_Run'
  | 'aatrox_ground_q1_to_unsheathrun'
  | 'aatrox_resheath_fullbody'
  | 'aatrox_skin07_sheath_run01'
  | 'aatrox_skin07_idle1'
  | 'aatrox_wings_null'
  | 'Idle_in_sheath'
  | 'aatrox_death_run'
  | 'Q1_INTO_Idle'
  | 'Q1_INTO_Run'
  | 'aatrox_ground_q1_into_passiveidle'
  | 'aatrox_passive_q1_into_run1'
  | 'aatrox_passive_into_idle1'
  | 'Q2_INTO_Run'
  | 'aatrox_passive_q2_into_run'
  | 'aatrox_ground_q2_to_passiveidle'
  | 'aatrox_ground_q2_to_idle'
  | 'aatrox_passive_into_shlth'
  | 'Attack_INTO_Run'
  | 'aatrox_ground_q3_into_idle1'
  | 'Q3_INTO_Passive_Idle'
  | 'aatrox_ground_q3_into_passiverun'
  | 'Q3_INTO_Run'
  | 'idle_into_passive_run'
  | 'Run_Ult'
  | 'Spell3_to_walk'
  | 'aatrox_spell3_dash_to_walk'
  | 'aatrox_spell3_dash'
  | 'aatrox_spell_dash_running'
  | 'aatrox_spell3_dash_passive'
  | 'aatrox_death_finisher4'
  | 'aatrox_death_into_idle'
  | 'Death_INTO_Run'
  | 'aatrox_death_idle'
  | 'Death_Run'
  | 'aatrox_ult_spell_dash'
  | 'aatrox_ult_spell_dash_to_run'
  | 'Spell3_Unsheath'
  | 'Spell3_Unsheath_to_Idle'
  | 'Spell3_Unsheath_to_Run'
  | 'Spell3_Passive'
  | 'Spell3_Passive_to_Run'
  | 'aatrox_ult_q1'
  | 'Death_INTO_PassiveRun'
  | 'aatrox_death_death_into_run1'
  | 'aatrox_ult_q2'
  | 'aatrox_ult_q3'
  | 'Death_INTO_PassiveIdle'
  | 'Death_INTO_Idle'
  | 'ULT_Idlein'
  | 'Passive_Attack_out'
  | 'aatrox_towerattack'
  | 'aatrox_skin07_taunt'
  | 'Taunt_loop'
  | 'Unsheath_to_Passive'
  | 'ULT_out'
  | 'ULT_TowerAttack'
  | 'aatrox_buffbones'
  | 'ULT_out_to_passive_idle'
  | 'aatrox_skin07_ult_taunt'
  | 'ULT_Taunt_loop'
  | 'Respawn'
  | 'BannerOff'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.RunPython} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Body_World} />
        <primitive object={nodes.Mask3} />
        <primitive object={nodes.Mask6} />
        <primitive object={nodes.Mask1} />
        <primitive object={nodes.Mask5} />
        <primitive object={nodes.Mask2} />
        <primitive object={nodes.Mask4} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Sword}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Shoulder}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Banner}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Spikes}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Shadow_Form}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Wings}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Masks_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
