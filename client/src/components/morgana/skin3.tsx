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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Flower_Petal1_snap: THREE.Bone
    Flower_Petal2_snap: THREE.Bone
    Flower_Petal3_snap: THREE.Bone
    Flower_Petal4_snap: THREE.Bone
    Flower_Petal5_snap: THREE.Bone
    Bottle_snap: THREE.Bone
  }
  materials: {
    Morgana_Skin03_Body_Mat: THREE.MeshBasicMaterial
    wings_mid_open: THREE.MeshBasicMaterial
    wings_open: THREE.MeshBasicMaterial
    wings_closed: THREE.MeshBasicMaterial
    flower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle2'
  | 'Laugh'
  | 'Spell1_0'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'Idle_In1'
  | 'Attack1_To_Run_0'
  | 'Attack1_To_Run_90'
  | 'Attack1_To_Run_-90'
  | 'Attack1_To_Run_180'
  | 'Attack1_To_Run_-180'
  | 'Spell4_Run'
  | 'morgana_attack2_to_run'
  | 'Attack2_To_Run_-90'
  | 'Attack2_To_Run_-179'
  | 'Attack2_To_Run_90'
  | 'Attack2_To_Run_179'
  | 'Spell4_Idle1'
  | 'Spell1_To_Run'
  | 'Spell1_90'
  | 'Spell1_179'
  | 'Spell1_-90'
  | 'Spell1_-179'
  | 'Spell1_To_Idle'
  | 'Idle1'
  | 'Spell4_Off'
  | 'Spell4_To_Idle'
  | 'Spell4_Attack1'
  | 'Spell2_To_Run_90'
  | 'Spell2_To_Run_179'
  | 'Spell2_To_Run_-90'
  | 'Spell2_to_Run_-179'
  | 'morgana_spell2_to_run'
  | 'Spell3_To_Run'
  | 'Spell3_To_Idle'
  | 'Run_Homeguard'
  | 'Spell2_To_Idle'
  | 'morgana_run'
  | 'morgana_spell1_0'
  | 'morgana_spell1_179'
  | 'morgana_spell1_-179'
  | 'morgana_spell1_90'
  | 'morgana_spell1_-90'
  | 'morgana_spell2'
  | 'Spell4_Spell3'
  | 'Recall'
  | 'morgana_run2'
  | 'Spell4'
  | 'Idle3'
  | 'Idle_In2'
  | 'Run_Slow'
  | 'Spell4_To_Run'
  | 'Recall_Winddown'
  | 'Spell1_45'
  | 'Spell1_-45'
  | 'Spell1_-135'
  | 'Spell1_135'
  | 'Idle4'
  | 'Respawn'
  | 'morgana_joke_love'
  | 'morgana_joke_nolove'
  | 'morgana_run_haste'
  | 'Attack2_To_Idle'
  | 'Attack1_To_Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Flower_Petal1_snap} />
        <primitive object={nodes.Flower_Petal2_snap} />
        <primitive object={nodes.Flower_Petal3_snap} />
        <primitive object={nodes.Flower_Petal4_snap} />
        <primitive object={nodes.Flower_Petal5_snap} />
        <primitive object={nodes.Bottle_snap} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Morgana_Skin03_Body_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.wings_mid_open}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.wings_open}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.wings_closed}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.flower} skeleton={nodes.mesh_0_4.skeleton} />
    </group>
  )
}
