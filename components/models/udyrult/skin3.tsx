import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    BuffBone_Glb_GROUND_Loc: THREE.Bone
    BuffBone_Glb_CHANNEL_Loc: THREE.Bone
  }
  materials: {
    udyr_spiritSummoner_MD_v01_ubyr_base_mat_alpha: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Death'
  | 'udyr_spirit_base_idle'
  | 'udyr_spirit_bear_idle'
  | 'udyr_spirit_base_run'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'udyr_spirit_bear_stun'
  | 'udyr_spirit_bear_run2'
  | 'Brush_Idle'
  | 'udyr_spirit_base_channelwndup'
  | 'udyr_spirit_base_channelwndup_loop'
  | 'Channel'
  | 'udyr_spirit_base_emote'
  | 'udyr_spirit_base_recallloop'
  | 'udyr_spirit_base_recall'
  | 'udyr_spirit_base_idle_enter'
  | 'udyr_spirit_bear_idleenter'
  | 'udyr_spirit_base_attack'
  | 'udyr_spirit_base_emote_loop'
  | 'Dance'
  | 'udyr_spirit_base_taunt_loop'
  | 'udyr_spirit_base_laugh_loop'
  | 'udyr_spirit_human_danceloop'
  | 'udyr_spirit_human_laugh_loop'
  | 'udyr_spirit_human_taunt_loop'
  | 'udyr_spirit_human_recall'
  | 'udyr_spirit_human_recallloop'
  | 'udyr_spirit_human_channel'
  | 'udyr_spirit_human_channelwndup'
  | 'udyr_spirit_human_channelwndup_loop'
  | 'udyr_spirit_human_death'
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
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.BuffBone_Glb_GROUND_Loc} />
        <primitive object={nodes.BuffBone_Glb_CHANNEL_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.udyr_spiritSummoner_MD_v01_ubyr_base_mat_alpha}
        skeleton={nodes.mesh_0.skeleton}
        position={[-79.19, -0.59, -51.31]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
