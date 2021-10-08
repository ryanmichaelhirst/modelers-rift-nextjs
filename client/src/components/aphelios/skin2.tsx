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
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Severum: THREE.Bone
    Infernum: THREE.Bone
    Crescendum: THREE.Bone
    Gravitum: THREE.Bone
    Calibrum: THREE.Bone
    Bowl: THREE.Bone
    Flower: THREE.Bone
  }
  materials: {
    Aphelios_Skin01_Mat: THREE.MeshBasicMaterial
    scarf: THREE.MeshBasicMaterial
    flower: THREE.MeshBasicMaterial
    bowl: THREE.MeshBasicMaterial
    mask: THREE.MeshBasicMaterial
    liquid: THREE.MeshBasicMaterial
    calibrum: THREE.MeshBasicMaterial
    gravitum: THREE.MeshBasicMaterial
    crescendum: THREE.MeshBasicMaterial
    infernum: THREE.MeshBasicMaterial
    severum: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Spell4'
  | 'aphelios_taunt'
  | 'Dance'
  | 'aphelios_taunt_loop'
  | 'A_Attack1'
  | 'aphelios_a_idle1'
  | 'aphelios_a_run1'
  | 'B_Attack1'
  | 'aphelios_b_idle1'
  | 'aphelios_b_run1'
  | 'C_Attack1'
  | 'aphelios_c_idle1'
  | 'aphelios_c_run1'
  | 'D_Attack1'
  | 'aphelios_d_idle1'
  | 'aphelios_d_run1'
  | 'E_Attack1'
  | 'aphelios_e_idle1'
  | 'aphelios_e_run1'
  | 'aphelios_a_spell1_idle'
  | 'B_Spell1'
  | 'C_Spell1'
  | 'D_Spell1'
  | 'E_Spell1'
  | 'A_Idle_In'
  | 'B_Idle_In'
  | 'C_Idle_In'
  | 'D_Idle_In'
  | 'E_Idle_in'
  | 'A_Attack2'
  | 'B_Attack2'
  | 'C_Attack2'
  | 'D_Attack2'
  | 'E_Attack2'
  | 'aphelios_a_attack1'
  | 'aphelios_c_attack2'
  | 'aphelios_d_attack2'
  | 'aphelios_e_attack2'
  | 'aphelios_b_attack2'
  | 'A_Spell2'
  | 'B_Spell2'
  | 'C_Spell2'
  | 'D_Spell2'
  | 'E_Spell2'
  | 'A_Spell2_to_Idle'
  | 'B_Spell2_to_Idle'
  | 'A_Spell2_to_Run'
  | 'C_Spell2_to_Idle'
  | 'D_Spell2_to_Idle'
  | 'E_Spell2_to_Idle'
  | 'C_Spell1_to_Run'
  | 'E_Catch'
  | 'D_Spell1A'
  | 'D_Spell1B'
  | 'aphelios_d_spell1b'
  | 'aphelios_d_spell1a'
  | 'D_Spell1B_to_Idle'
  | 'D_Spell1A_to_Idle'
  | 'D_Spell1A_to_Run'
  | 'aphelios_d_spell1a_to_idle'
  | 'aphelios_d_spell1a_to_run'
  | 'aphelios_d_spell1b_to_idle'
  | 'A_Spell1_Idle'
  | 'A_Spell1_Run'
  | 'aphelios_a_spell1_attack2'
  | 'aphelios_a_spell1_attack1'
  | 'A_Spell1_Attack1_90'
  | 'A_Spell1_Attack1_-90'
  | 'A_Spell1_Attack1_180'
  | 'A_Spell1_Attack2_90'
  | 'A_Spell1_Attack2_-90'
  | 'A_Spell1_Attack2_180'
  | 'C_Spell1_to_Idle'
  | 'A_Spell1_Idle_In'
  | 'A_Spell1_Run_In'
  | 'aphelios_a_spell1_attack1_nomove'
  | 'aphelios_a_spell1_attack2_nomove'
  | 'A_Attack1_to_Run1'
  | 'A_Spell1_Activate'
  | 'aphelios_a_spell1_to_a_run1'
  | 'A_Attack1_to_Idle'
  | 'A_Attack2_to_Idle'
  | 'B_Spell1_Attack'
  | 'E_Spell1_to_Run_0'
  | 'E_Spell1_to_Run_90'
  | 'E_Spell1_to_Run_-90'
  | 'aphelios_e_spell1_to_run_-180'
  | 'aphelios_e_spell1_to_run_180'
  | 'D_Attack_to_Run'
  | 'D_Spell1B_to_Run'
  | 'aphelios_d_spell1b_to_run'
  | 'D_Spell1_to_Idle'
  | 'aphelios_b_spell1_to_run'
  | 'B_Spell1_to_Run_90'
  | 'B_Spell1_to_Run_-90'
  | 'B_Spell1_to_Run_180'
  | 'C_Attack_to_Idle'
  | 'aphelios_e_attack_to_idle2'
  | 'E_Attack_to_Run'
  | 'aphelios_b_attack_to_run'
  | 'aphelios_e_spell1__to_idle'
  | 'B_Spell2_to_Run'
  | 'C_Spell2_to_Run'
  | 'D_Attack_to_Idle'
  | 'aphelios_e_spell2_run'
  | 'D_Spell2_to_Run'
  | 'Recall'
  | 'B_Spell1_Attack_to_Idle'
  | 'B_Spell1_Attack2'
  | 'aphelios_d_attack_to_run2'
  | 'aphelios_respawn_a'
  | 'aphelios_respawn_b'
  | 'A_Run_Homeguard'
  | 'B_Run_Homeguard'
  | 'C_Run_Homeguard'
  | 'D_Run_Homeguard'
  | 'E_Run_Homeguard'
  | 'aphelios_a_spell2'
  | 'aphelios_b_spell2'
  | 'aphelios_c_spell2'
  | 'aphelios_d_spell2'
  | 'aphelios_e_spell2'
  | 'B_Attack_to_Idle'
  | 'B_Attack_to_Run3_0'
  | 'B_Attack_to_Run3_-90'
  | 'B_Attack_to_Run3_-180'
  | 'B_Attack_to_Run3_90'
  | 'B_Attack_to_Run3_180'
  | 'B_Attack_to_Run3_45'
  | 'B_Attack_to_Run3_135'
  | 'B_Attack_to_Run3_-45'
  | 'B_Attack_to_Run3_-135'
  | 'Joke_Start'
  | 'Joke_Loop'
  | 'A_Attack1_to_Run2'
  | 'aphelios_a_attack2_to_run1'
  | 'aphelios_d_attack2_-90'
  | 'aphelios_d_attack2_-179'
  | 'aphelios_d_attack2_90'
  | 'aphelios_d_attack2_179'
  | 'Idle1'
  | 'Laugh_A'
  | 'Laugh_B'
  | 'Laugh_C'
  | 'Laugh_D'
  | 'Laugh_E'
  | 'C_Attack_to_Run'
  | 'aphelios_e_attack_to_idle1'
  | 'aphelios_a_spell1_attack1_fast'
  | 'aphelios_a_spell1_attack2_fast'
  | 'A_Run_Fast'
  | 'B_Run_Fast'
  | 'C_Run_Fast'
  | 'D_Run_Fast'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Severum} />
        <primitive object={nodes.Infernum} />
        <primitive object={nodes.Crescendum} />
        <primitive object={nodes.Gravitum} />
        <primitive object={nodes.Calibrum} />
        <primitive object={nodes.Bowl} />
        <primitive object={nodes.Flower} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Aphelios_Skin01_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.scarf} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.flower} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.bowl} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.mask} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.liquid} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.calibrum}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.gravitum}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.crescendum}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.infernum}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.severum}
        skeleton={nodes.mesh_0_10.skeleton}
      />
    </group>
  )
}
