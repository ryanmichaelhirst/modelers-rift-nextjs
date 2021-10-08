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
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Feather04_Ground: THREE.Bone
    Feather03_Ground: THREE.Bone
    Feather02_Ground: THREE.Bone
    Feather01_Ground: THREE.Bone
    L_Cape01: THREE.Bone
    Familiar_Root: THREE.Bone
    Ult_Cape_Base: THREE.Bone
  }
  materials: {
    Skin05_Body_MAT: THREE.MeshBasicMaterial
    Skin05_Tail_MAT: THREE.MeshBasicMaterial
    Skin05_Cape_MAT: THREE.MeshBasicMaterial
    Skin05_Fur_MAT: THREE.MeshBasicMaterial
    Skin05_Mirror_MAT: THREE.MeshBasicMaterial
    Skin05_Wing_MAT: THREE.MeshBasicMaterial
    Skin05_Familiar_MAT: THREE.MeshBasicMaterial
    Skin05_Crest_MAT: THREE.MeshBasicMaterial
    Skin05_Snack_MAT: THREE.MeshBasicMaterial
    Skin05_Ult_Cape_MAT: THREE.MeshBasicMaterial
    Skin05_Ult_WingsA_MAT: THREE.MeshBasicMaterial
    Skin05_Ult_WingsB_MAT: THREE.MeshBasicMaterial
    Skin05_Ult_Tail_MAT: THREE.MeshBasicMaterial
    Skin05_Ult_Addition_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Duo_Recall'
  | 'Duo_Recall_Unto'
  | 'Duo_Recall_Ready'
  | 'Idle1_Base'
  | 'Idle1_variant1'
  | 'Idle1_variant2'
  | 'rakan_skin05_duo_dance_loop'
  | 'rakan_skin05_duo_dance_into'
  | 'rakan_skin05_dance_into'
  | 'rakan_skin05_dance_loop'
  | 'Run_Fast'
  | 'Run_Haste_Into'
  | 'Run_Haste_Out'
  | 'Run_Slow'
  | 'Run_Variant1'
  | 'Run_Variant2'
  | 'RunBase'
  | 'rakan_q_b'
  | 'rakan_spell1_to_run'
  | 'rakan_spell1_to_walk'
  | 'rakan_spell1_to_idle'
  | 'rakan_w_dash'
  | 'rakan_w_activate'
  | 'rakan_w_exit_to_fast_run'
  | 'rakan_w_exit_to_run'
  | 'rakan_w_exit_to_idle'
  | 'rakan_e_to_run'
  | 'rakan_e_to_idle'
  | 'Spell4_Idle'
  | 'Spell4_Run'
  | 'Spell4_Charm1'
  | 'Spell4_Charm2'
  | 'Spell4_Charm3'
  | 'Spell4_Idlein'
  | 'Spell4_Into'
  | 'rakan_skin05_taunt'
  | 'rakan_attack1'
  | 'rakan_attack2'
  | 'Death'
  | 'Idle_In'
  | 'rakan_skin05_joke'
  | 'rakan_skin05_laugh'
  | 'rakan_skin05_melee_attack1'
  | 'rakan_skin05_melee_attack2'
  | 'rakan_skin05_recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Injured'
  | 'rakan_spell1'
  | 'rakan_e'
  | 'Turn_90'
  | 'Turn_-90'
  | 'rakan_skin05_recall_duo_full'
  | 'rakan_skin05_duo_sg_dance_into'
  | 'rakan_skin05_duo_sg_dance_loop'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_OUT'
  | 'Turn_0'
  | 'Turn_180'
  | 'Turn_-180'
  | 'Turn_0_to_90'
  | 'rakan_w_exit_to_fast_run_ult'
  | 'rakan_w_exit_to_idle_ult'
  | 'Spell1_To_Idle_Ult'
  | 'Spell3_ULT'
  | 'Attack1_Ult'
  | 'Attack2_Ult'
  | 'Taunt_Ult'
  | 'Joke_Ult'
  | 'Laugh_ult'
  | 'rakan_skin05_spell04_wing_transition'
  | 'SPell4_Ending_to_Idle'
  | 'SPell4_Ending_to_Run'
  | 'Death_GA'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Feather04_Ground} />
        <primitive object={nodes.Feather03_Ground} />
        <primitive object={nodes.Feather02_Ground} />
        <primitive object={nodes.Feather01_Ground} />
        <primitive object={nodes.L_Cape01} />
        <primitive object={nodes.Familiar_Root} />
        <primitive object={nodes.Ult_Cape_Base} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin05_Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Skin05_Tail_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skin05_Cape_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Skin05_Fur_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin05_Mirror_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Skin05_Wing_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Skin05_Familiar_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Skin05_Crest_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Skin05_Snack_MAT}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Skin05_Ult_Cape_MAT}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Skin05_Ult_WingsA_MAT}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Skin05_Ult_WingsB_MAT}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Skin05_Ult_Tail_MAT}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Skin05_Ult_Addition_MAT}
        skeleton={nodes.mesh_0_13.skeleton}
      />
    </group>
  )
}
