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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_Base: THREE.Bone
    Coin_Base: THREE.Bone
    Card_Base: THREE.Bone
    Grenade_Base: THREE.Bone
    Recall_Base: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Gun: THREE.MeshBasicMaterial
    Coins: THREE.MeshBasicMaterial
    Card: THREE.MeshBasicMaterial
    Grenade: THREE.MeshBasicMaterial
    Crystal: THREE.MeshBasicMaterial
    Monument: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'run.pie_c_11_15'
  | 'Attack1'
  | 'Spell4_Back'
  | 'Recall'
  | 'Respawn'
  | 'Homeguard'
  | 'Idle_In'
  | 'attack1_wreload.pie_c_11_15'
  | 'attack1_wreload_run.pie_c_11_15'
  | 'Reload'
  | 'reload_run.pie_c_11_15'
  | 'Attack2'
  | 'Spell2_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Dance_In'
  | 'Recall_Winddown'
  | 'Audio_Reload'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon_Base} />
        <primitive object={nodes.Coin_Base} />
        <primitive object={nodes.Card_Base} />
        <primitive object={nodes.Grenade_Base} />
        <primitive object={nodes.Recall_Base} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Gun} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Coins} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Card} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Grenade} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Crystal} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Monument}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
