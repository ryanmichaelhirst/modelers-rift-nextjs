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
    Root: THREE.Bone
    Sword_Ground_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Sword_Root: THREE.Bone
    Skin14_Recall_Drone02: THREE.Bone
    Skin14_Recall_Drone03: THREE.Bone
    Skin14_Recall_Drone01: THREE.Bone
  }
  materials: {
    Skin16_MAT: THREE.MeshBasicMaterial
    Skin17_Cape_MAT: THREE.MeshBasicMaterial
    blades: THREE.MeshBasicMaterial
    Skin16_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2_Arms'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'irelia_idle_01'
  | 'Joke'
  | 'Laugh'
  | 'Spell2'
  | 'irelia_spell3'
  | 'Spell4_Idle'
  | 'Taunt'
  | 'Spell1'
  | 'Recall'
  | 'Attack1_Arms'
  | 'irelia_attack_01_avar_to_idle'
  | 'irelia_attack_01_avar'
  | 'irelia_attack_01_close'
  | 'irelia_attack_01_kick'
  | 'irelia_attack_01_kick_to_idle'
  | 'Attack1_To_Idle'
  | 'irelia_attack_02_windmillkick'
  | 'irelia_windmillkick_to_run'
  | 'irelia_attack_02_close'
  | 'irelia_attack_02_kick'
  | 'irelia_attack_02_to_runbase1'
  | 'Idle_In_Subtle'
  | 'Respawn'
  | 'irelia_runstart_haste1'
  | 'Run_Base'
  | 'Run_Haste'
  | 'irelia_spell1_into_runbase'
  | 'Spell1_Into_Spell1'
  | 'Spell1_To_Idle'
  | 'irelia_spell2_2'
  | 'irelia_spell2_3'
  | 'irelia_spell2_3_to_run'
  | 'Spell2_To_Run'
  | 'irelia_spell3_run'
  | 'irelia_spell3_b'
  | 'irelia_spell3_b_run'
  | 'Spell3_B_To_Idle'
  | 'Spell3_To_Idle'
  | 'irelia_spell4'
  | 'irelia_spell4_to_runhaste'
  | 'Spell4_To_Idle'
  | 'Turn_0'
  | 'irelia_turn_0_360'
  | 'TURN_L_360'
  | 'TURN_R_360'
  | 'irelia_attack_02'
  | 'irelia_attack_03'
  | 'Dance_In'
  | 'irelia_runstart1'
  | 'irelia_windmillkick_to_run_2'
  | 'irelia_spell1_into_runhaste'
  | 'irelia_attack_02_to_runhaste1'
  | 'Spell2_To_RunHaste'
  | 'irelia_spell2_3_to_runhaste'
  | 'irelia_spell3_runhaste'
  | 'irelia_spell3_b_runhaste'
  | 'Spell4_Run'
  | 'Run_Homeguard'
  | 'irelia_into_homeguard'
  | 'irelia_homeguard_into_baserun'
  | 'irelia_homeguard_into_hasterun1'
  | 'KnockUp'
  | 'Run_Hurt'
  | 'irelia_idle_02'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Sword_Ground_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Sword_Root} />
        <primitive object={nodes.Skin14_Recall_Drone02} />
        <primitive object={nodes.Skin14_Recall_Drone03} />
        <primitive object={nodes.Skin14_Recall_Drone01} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin16_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={nodes.mesh_0_1.material}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skin17_Cape_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.blades}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin16_Recall_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
