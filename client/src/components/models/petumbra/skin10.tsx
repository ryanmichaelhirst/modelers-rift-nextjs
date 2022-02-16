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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    L_WingFingerA_1: THREE.Bone
    L_WingFingerB_1: THREE.Bone
    L_WingFingerC_1: THREE.Bone
    R_WingFingerA_1: THREE.Bone
    R_WingFingerC_1: THREE.Bone
    R_WingFingerB_1: THREE.Bone
    Fish_Body: THREE.Bone
    Egg: THREE.Bone
    Guitar: THREE.Bone
  }
  materials: {
    EyeIdle: THREE.MeshBasicMaterial
    Fresh_Fish: THREE.MeshBasicMaterial
    Tier1_Sigil: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'petumbra_idle1.littlelegends_10_19'
  | 'Joke'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Laugh'
  | 'Interact'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'petumbra_damaged.littlelegends_10_19'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'petumbra_idle2.littlelegends_10_19'
  | 'Idle_To_runHaste'
  | 'petumbra_celebrate_toidle.littlelegends_10_19'
  | 'Taunt'
  | 'petumbra_cast_to_idle.littlelegends_10_19'
  | 'petumbra_emote_winning.littlelegends_10_19'
  | 'petumbra_emote_losing.littlelegends_10_19'
  | 'petumbra_greeting_to_idle.littlelegends_10_19'
  | 'Recall'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.L_WingFingerA_1} />
        <primitive object={nodes.L_WingFingerB_1} />
        <primitive object={nodes.L_WingFingerC_1} />
        <primitive object={nodes.R_WingFingerA_1} />
        <primitive object={nodes.R_WingFingerC_1} />
        <primitive object={nodes.R_WingFingerB_1} />
        <primitive object={nodes.Fish_Body} />
        <primitive object={nodes.Egg} />
        <primitive object={nodes.Guitar} />
      </group>
      <group position={[-97.05, -40.19, -158.86]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.EyeIdle} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Fresh_Fish}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Tier1_Sigil}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
