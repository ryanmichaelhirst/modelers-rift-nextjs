import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
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
    BardFollower_Skin8_MAT: THREE.MeshBasicMaterial
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

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
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
      <group position={[-127.98, -0.8, -144.13]} scale={0.02}>
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
          material={materials.BardFollower_Skin8_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
