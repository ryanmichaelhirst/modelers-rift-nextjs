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
    RecallSkin8: THREE.Bone
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Follower_Root: THREE.Bone
    F1_Follower_Root: THREE.Bone
    F2_Follower_Root: THREE.Bone
  }
  materials: {
    Bard_Skin8_Recall_MAT: THREE.MeshBasicMaterial
    Bard_Skin08_MAT: THREE.MeshBasicMaterial
    Weapon_MAT: THREE.MeshBasicMaterial
    Glass_MAT: THREE.MeshBasicMaterial
    BardFollower_Skin8_MAT: THREE.MeshBasicMaterial
    F1_BardFollower_Skin8_MAT: THREE.MeshBasicMaterial
    F2_BardFollower_Skin8_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke'
  | 'Laugh'
  | 'Dance_Base'
  | 'Run_Base'
  | 'RunIn'
  | 'Idle1_Base'
  | 'Attack3'
  | 'bard_attack02'
  | 'bard_attack01'
  | 'Spell1'
  | 'Taunt'
  | 'Spell3'
  | 'Dance_Loop'
  | 'Death'
  | 'Spell2'
  | 'Idle_In'
  | 'Channel_Transition'
  | 'Idle2_Base'
  | 'Float_Run01'
  | 'bard_run_haste'
  | 'Run_Slow'
  | 'Stun'
  | 'Crit'
  | 'KnockUp'
  | 'Float_Run01_Into'
  | 'Float_Run01_Out'
  | 'Float_Run01_Boost'
  | 'Float_Idle01'
  | 'Float_IdleIn'
  | 'Float_Spell3'
  | 'Float_Spell2'
  | 'TURN'
  | 'Spell4'
  | 'bard_turntech_left'
  | 'bard_turntech_right'
  | 'bard_float_right'
  | 'bard_float_left'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.RecallSkin8} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Follower_Root} />
        <primitive object={nodes.F1_Follower_Root} />
        <primitive object={nodes.F2_Follower_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Bard_Skin8_Recall_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Bard_Skin08_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Weapon_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Glass_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.BardFollower_Skin8_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.F1_BardFollower_Skin8_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.F2_BardFollower_Skin8_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
