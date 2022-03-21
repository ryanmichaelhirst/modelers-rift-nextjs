import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    sapling_root: THREE.Bone
    sapling_chest: THREE.Bone
    sapling_head: THREE.Bone
    sapling_hair: THREE.Bone
    sapling_hair_b: THREE.Bone
    sapling_l_uparm: THREE.Bone
    sapling_l_forearm: THREE.Bone
    sapling_r_uparm: THREE.Bone
    sapling_r_forearm: THREE.Bone
    sapling_l_thigh: THREE.Bone
    sapling_l_knee: THREE.Bone
    sapling_r_thigh: THREE.Bone
    sapling_r_knee: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC1: THREE.Bone
  }
  materials: {
    Maokai: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'maokai_attack1_60fps'
  | 'maokai_attack2_60fps'
  | 'Channel_Base'
  | 'maokai_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'maokai_idle3'
  | 'maokai_joke'
  | 'maokai_laugh'
  | 'maokai_passive'
  | 'Run_Base'
  | 'maokai_spell1'
  | 'maokai_spell2_down'
  | 'maokai_spell2_up'
  | 'maokai_spell2_down_idle'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'maokai_gravedigger_run'
  | 'maokai_gravedigger_idle1'
  | 'maokai_gravedigger_respawn'
  | 'maokai_gravedigger_attack1_60fps'
  | 'maokai_gravedigger_attack2_60fps'
  | 'maokai_gravedigger_channel'
  | 'maokai_gravedigger_channel_windup'
  | 'maokai_gravedigger_crit'
  | 'maokai_gravedigger_dance'
  | 'maokai_gravedigger_idle2'
  | 'maokai_gravedigger_idle3'
  | 'maokai_gravedigger_idle4'
  | 'maokai_gravedigger_joke'
  | 'maokai_gravedigger_laugh'
  | 'maokai_gravedigger_spell1'
  | 'maokai_gravedigger_spell2_down'
  | 'maokai_gravedigger_spell2_up'
  | 'maokai_gravedigger_spell3'
  | 'maokai_gravedigger_spell4'
  | 'maokai_gravedigger_taunt'
  | 'Buffbones'
  | 'maokai_idle_in'
  | 'maokai_gravedigger_passive'
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
        <primitive object={nodes.sapling_root} />
        <primitive object={nodes.sapling_chest} />
        <primitive object={nodes.sapling_head} />
        <primitive object={nodes.sapling_hair} />
        <primitive object={nodes.sapling_hair_b} />
        <primitive object={nodes.sapling_l_uparm} />
        <primitive object={nodes.sapling_l_forearm} />
        <primitive object={nodes.sapling_r_uparm} />
        <primitive object={nodes.sapling_r_forearm} />
        <primitive object={nodes.sapling_l_thigh} />
        <primitive object={nodes.sapling_l_knee} />
        <primitive object={nodes.sapling_r_thigh} />
        <primitive object={nodes.sapling_r_knee} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Maokai}
        skeleton={nodes.mesh_0.skeleton}
        position={[-184.94, -0.08, -117.23]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
