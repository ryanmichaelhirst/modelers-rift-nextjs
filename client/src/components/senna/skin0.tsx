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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Gun_Body: THREE.Bone
    Wraith_Ground0: THREE.Bone
    Pengu_Root: THREE.Bone
    True_World: THREE.Bone
    Buffbone_Glb_LittleLegend_Ground_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Cloak: THREE.MeshBasicMaterial
    Gun_Handle: THREE.MeshBasicMaterial
    Gun_Barrel_Black: THREE.MeshBasicMaterial
    Gun_Barrel_White: THREE.MeshBasicMaterial
    Gun_AfterImage: THREE.MeshBasicMaterial
    VFX_Arm: THREE.MeshBasicMaterial
    VFX_Body: THREE.MeshBasicMaterial
    LittleLegendA: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Loop'
  | 'Channel_In'
  | 'senna_crit01'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle01'
  | 'Laugh'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_In'
  | 'Idle01_Var01'
  | 'senna_run01'
  | 'Spell2_To_Idle'
  | 'senna_spell2_torun_0'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Run_Homeguard'
  | 'Recall'
  | 'senna_recall_winddown'
  | 'Walk01'
  | 'Run01_toWalk01'
  | 'Run01_in_Var01'
  | 'Idle02'
  | 'Attack1_0'
  | 'Attack2_0'
  | 'senna_attack01_out'
  | 'senna_attack02_out'
  | 'senna_attack03_out'
  | 'Walk01_toIdle01'
  | 'Spell2_To_Run_90'
  | 'Spell2_To_Run_-90'
  | 'senna_spell2_torun_-180'
  | 'senna_spell2_torun_180'
  | 'Spell3_Idle'
  | 'senna_walk01_turn_90'
  | 'senna_walk01_turn_-90'
  | 'senna_walk01_turn_0'
  | 'Spell3_To_Idle'
  | 'Spell3_Run'
  | 'Idle02_Var01'
  | 'senna_attack01_out_0'
  | 'senna_attack01_out_90'
  | 'Spell1'
  | 'Idle02_toRun01'
  | 'senna_attackpassive01'
  | 'senna_attackpassive01_toidle'
  | 'senna_run01_turn_0.unanimated_bones_use_local_transform'
  | 'senna_run01_turn_-90.unanimated_bones_use_local_transform'
  | 'senna_run01_turn_90.unanimated_bones_use_local_transform'
  | 'senna_homeguard01_turn_0.unanimated_bones_use_local_transform'
  | 'senna_homeguard01_turn_90.unanimated_bones_use_local_transform'
  | 'senna_homeguard01_turn_-90.unanimated_bones_use_local_transform'
  | 'Attack3_0'
  | 'Spell3_To_Run'
  | 'Spell3_Out_toRun'
  | 'Spell3_Out_toIdle'
  | 'senna_attackpassive01_torun'
  | 'Idle02_toIdle01'
  | 'Spell1_ToIdle'
  | 'senna_spell2'
  | 'Spawn_In'
  | 'Spell3_InRun'
  | 'Spell3_InIdle'
  | 'Joke'
  | 'Respawn'
  | 'Attack1_-90'
  | 'Attack1_90'
  | 'Crit_Out'
  | 'senna_attack01_out_-90'
  | 'Attack2_90'
  | 'Attack2_-90'
  | 'Attack3_90'
  | 'Attack3_-90'
  | 'senna_crit01_90'
  | 'senna_crit01_-90'
  | 'Idle01_toIdle02'
  | 'Run01_Var01'
  | 'senna_homeguard01_out_torun'
  | 'senna_run01_in_var01'
  | 'Run_Homeguard_IN'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Gun_Body} />
        <primitive object={nodes.Wraith_Ground0} />
        <primitive object={nodes.Pengu_Root} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Buffbone_Glb_LittleLegend_Ground_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Cloak}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Gun_Handle}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Gun_Barrel_Black}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Gun_Barrel_White}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Gun_AfterImage}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.VFX_Arm}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.VFX_Body}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.LittleLegendA}
        skeleton={nodes.mesh_0_8.skeleton}
      />
    </group>
  )
}
