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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Buffbone_Cstm_BladeVFX_Loc: THREE.Bone
    R_Buffbone_Cstm_BladeVFX_Loc: THREE.Bone
    L_SnapWeaponToWorld: THREE.Bone
    R_SnapWeaponToWorld: THREE.Bone
    Beast_Root: THREE.Bone
    Joke_Table: THREE.Bone
    Joke_Chair: THREE.Bone
  }
  materials: {
    Gem1: THREE.MeshBasicMaterial
    Blade1: THREE.MeshBasicMaterial
    Gem2: THREE.MeshBasicMaterial
    Blade2: THREE.MeshBasicMaterial
    Gem3: THREE.MeshBasicMaterial
    Blade3: THREE.MeshBasicMaterial
    Gem4: THREE.MeshBasicMaterial
    Blade4: THREE.MeshBasicMaterial
    Gem5: THREE.MeshBasicMaterial
    Blade5: THREE.MeshBasicMaterial
    Gem6: THREE.MeshBasicMaterial
    Blade6: THREE.MeshBasicMaterial
    Main_Mat: THREE.MeshBasicMaterial
    Lizard: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Dance_In'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Taunt_In'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke_In'
  | 'Recall'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'idle1_toupright_loop.pie_c_10_25'
  | 'spell3.pie_c_10_25'
  | 'crit.pie_c_10_25'
  | 'Spell2_Throw'
  | 'RunHaste'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'idle1_toupright_in.pie_c_10_25'
  | 'Spell1_ToRun'
  | 'Idle_To_Run'
  | 'Idle_To_runHaste'
  | 'spell2_throw_toidle.pie_c_10_25'
  | 'spell2_throw_torun.pie_c_10_25'
  | 'idle_uprightloop_to_run.pie_c_11_1'
  | 'Joke_Loop'
  | 'Spell2_ToIdle'
  | 'Spell2_ToRun'
  | 'Dance_Loop'
  | 'attack1_torun.pie_c_11_1'
  | 'attack2_torun.pie_c_11_1'
  | 'idle1_toupright_var1.pie_c_10_25'
  | 'Attack1_ToIdle'
  | 'Attack2_ToIdle'
  | 'Crit_ToIdle'
  | 'runHaste_to_Run'
  | 'idle1_toupright_var2.pie_c_10_25'
  | 'Idle_In3'
  | 'bladeswap01.pie_c_10_25'
  | 'bladeswap02.pie_c_10_25'
  | 'bladeswap03.pie_c_10_25'
  | 'bladeswap04.pie_c_10_25'
  | 'bladeswap05.pie_c_10_25'
  | 'bladeswap06.pie_c_10_25'
  | 'run.pie_c_11_1'
  | 'Respawn'
  | 'RunHomeguard'
  | 'Taunt_loop'
  | 'runhaste_to_run.pie_c_10_25'
  | 'idle_uprightloop_to_runhaste.pie_c_10_25'
  | 'idle_to_runhaste.pie_c_10_25'
  | 'Run_Fast'
  | 'idle_uprightloop_to_run_fast.pie_c_11_1'
  | 'idle_to_run_fast.pie_c_11_1'
  | 'attack1_torun_fast.pie_c_11_1'
  | 'attack2_torun_fast.pie_c_11_1'
  | 'Run_Spell2'
  | 'spell4_torun_fast.pie_c_11_1'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Buffbone_Cstm_BladeVFX_Loc} />
        <primitive object={nodes.R_Buffbone_Cstm_BladeVFX_Loc} />
        <primitive object={nodes.L_SnapWeaponToWorld} />
        <primitive object={nodes.R_SnapWeaponToWorld} />
        <primitive object={nodes.Beast_Root} />
        <primitive object={nodes.Joke_Table} />
        <primitive object={nodes.Joke_Chair} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Gem1}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Blade1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Gem2}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Blade2}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Gem3}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Blade3}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Gem4}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Blade4}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Gem5}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Blade5}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Gem6}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Blade6}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Main_Mat}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Lizard}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.Joke}
        skeleton={nodes.mesh_0_14.skeleton}
      />
    </group>
  )
}
