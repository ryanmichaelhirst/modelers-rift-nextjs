import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    lambert6: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'elisespider_attack1'
  | 'elisespider_attack2'
  | 'Channel_Base'
  | 'elisespider_channel_wndup'
  | 'Dance_Base'
  | 'Idle1_Base'
  | 'elisespider_lotus_idle1_in'
  | 'Idle2_Base'
  | 'elisespider_idle3'
  | 'KnockedUp'
  | 'elisespider_spell1'
  | 'elisespider_idle1'
  | 'elisespider_spell3_c'
  | 'elisespider_spell3_d'
  | 'elisespider_spell3_e'
  | 'Stunned'
  | 'elisespider_recall_loop'
  | 'elisespider_recall_wndup'
  | 'Run_Base'
  | 'elisespider_attack3'
  | 'Crit_Base'
  | 'elisespider_joke'
  | 'elisespider_laugh'
  | 'Taunt_Base'
  | 'elisespider_spell2'
  | 'Death_Base'
  | 'elisespider_lotus_run'
  | 'elisespider_lotus_idle1'
  | 'elisespider_lotus_attack1'
  | 'elisespider_lotus_attack3'
  | 'elisespider_lotus_attack2'
  | 'elisespider_lotus_spell2'
  | 'elisespider_lotus_spell1'
  | 'elisespider_lotus_spell3_c'
  | 'elisespider_lotus_spell3_e'
  | 'elisespider_lotus_recall_wndup'
  | 'elisespider_lotus_recall_loop'
  | 'elisespider_lotus_death'
  | 'elisespider_lotus_dance'
  | 'elisespider_lotus_joke'
  | 'elisespider_lotus_taunt'
  | 'elisespider_lotus_laugh'
  | 'elisespider_lotus_idle2'
  | 'elisespider_lotus_idle3'
  | 'elisespider_lotus_channel_wndup'
  | 'elisespider_lotus_channel'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert6}
        skeleton={nodes.mesh_0.skeleton}
        position={[-118.22, 0.66, -139.62]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
