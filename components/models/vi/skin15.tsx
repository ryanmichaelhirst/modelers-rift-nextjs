import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Spell1: THREE.Bone
    L_IN_Hand: THREE.Bone
    R_IN_Hand: THREE.Bone
    Hologram_Main: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Teacup: THREE.Bone
  }
  materials: {
    Vi_Skin12_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Spell2'
  | 'Attack3'
  | 'Recall'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Crit'
  | 'Spell1'
  | 'Spell1_Run'
  | 'Spell4_Hit'
  | 'Spell4_Run'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'vi_idle_in'
  | 'Spell3'
  | 'vi_idle1_in_b'
  | 'Attack_AfterUlt'
  | 'Spell2_A'
  | 'vi_spell1_idle'
  | 'vi_spell1_idleintro'
  | 'Dance_Base'
  | 'vi_dance_in'
  | 'vi_idle1_in_c'
  | 'vi_joke'
  | 'vi_joke2'
  | 'vi_laugh'
  | 'Taunt_Base'
  | 'Spell4'
  | 'vi_skin12_run1'
  | 'vi_run1_in'
  | 'vi_skin12_run2'
  | 'vi_run2_in'
  | 'vi_spell4'
  | 'Stunned'
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
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Spell1} />
        <primitive object={nodes.L_IN_Hand} />
        <primitive object={nodes.R_IN_Hand} />
        <primitive object={nodes.Hologram_Main} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Teacup} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Vi_Skin12_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-73.68, -0.28, -25.2]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
