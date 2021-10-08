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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Ring_Blade: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    weapon_default: THREE.MeshBasicMaterial
    weapon_rock: THREE.MeshBasicMaterial
    weapon_water: THREE.MeshBasicMaterial
    weapon_grass: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Bow: THREE.MeshBasicMaterial
    Recall_Bow: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1_Start'
  | 'Attack2_Start'
  | 'qiyana_base_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Start'
  | 'Dance_Loop'
  | 'Death'
  | 'qiyana_base_idle.pie_c_10_25'
  | 'qiyana_base_laugh'
  | 'Spell1_River'
  | 'Spell1_Wall'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Joke'
  | 'Run_Base'
  | 'Recall'
  | 'Idle_Ready_in'
  | 'Run_Fast_Loop'
  | 'Spell1'
  | 'Spell4_INTO_Idle'
  | 'idle2.pie_c_10_25'
  | 'qiyana_base_idle3.pie_c_10_25'
  | 'qiyana_base_run_element'
  | 'Spell3_Hit'
  | 'Attack1_INTO_Walk'
  | 'Spell1_Wall_INTO_Walk'
  | 'Spell1_Wall_INTO_Idle'
  | 'qiyana_base_spell1_grass_into_run'
  | 'Spell1_Grass_INTO_Idle'
  | 'Spell1_River_INTO_Idle'
  | 'Spell1_River_INTO_Walk'
  | 'Spell2_INTO_Walk'
  | 'Attack2_INTO_Walk'
  | 'Spell1_Grass'
  | 'Idle_Ready'
  | 'Spell4_INTO_Walk'
  | 'Attack1_End'
  | 'Attack2_End'
  | 'Attack3_End'
  | 'qiyana_base_spell1_into_idle'
  | 'qiyana_base_spell1_into_walk'
  | 'Attack1_Mid'
  | 'Attack3_INTO_Walk'
  | 'Run_Homeguard'
  | 'qiyana_base_run_hastetorun'
  | 'qiyana_base_walk_into_run'
  | 'qiyana_base_run_into_elementrun'
  | 'Spell2_INTO_ElementRun'
  | 'Run_Stealth'
  | 'ElementRun_INTO_Run'
  | 'IdleReady_INTO_Relaxed'
  | 'qiyana_base_into_imsorry'
  | 'qiyana_base_imsorryloop'
  | 'IdleReady_INTO_Relaxed_2'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'qiyana_base_spell4_into_elementwalk'
  | 'Crit_End'
  | 'Crit_INTO_Walk'
  | 'Crit_INTO_Idle'
  | 'Dance_Intro'
  | 'qiyana_base_idle'
  | 'qiyana_base_idle2'
  | 'qiyana_base_idle3'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Ring_Blade} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.weapon_default}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.weapon_rock}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.weapon_water}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.weapon_grass}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Body} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Bow} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Recall_Bow}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
