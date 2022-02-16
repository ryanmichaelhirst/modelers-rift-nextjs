import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_CSTM_EXTRA: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    R_Buffbone_Cstm_Foot_Loc: THREE.Bone
    L_Buffbone_Cstm_Foot_Loc: THREE.Bone
  }
  materials: {
    Default6: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'brand_zombie_idle1'
  | 'brand_zombie_idle2'
  | 'brand_zombie_idle3'
  | 'brand_zombie_joke'
  | 'brand_zombie_laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'brand_zombie_dance_windup'
  | 'brand_zombie_respawn'
  | 'brand_zombie_run_in'
  | 'brand_zombie_run_fast'
  | 'Idle_Enter'
  | 'brand_zombie_idlevarient1'
  | 'brand_zombie_idlevarient2'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'brand_zombie_run_chase'
  | 'Dance_Loop'
  | 'brand_zombie_idlevarient3'
  | 'brand_zombie_run_fast_in'
  | 'brand_zombie_run_chase_in'
  | 'brand_zombie_run_a'
  | 'brand_zombie_idle1_in'
  | 'brand_zombie_idle2_in'
  | 'brand_zombie_idle3_in'
  | 'brand_zombie_run_fast_a'
  | 'brand_zombie_run_fast_a_in'
  | 'brand_zombie_run_fast_a_out'
  | 'brand_zombie_run_b'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_EXTRA} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.R_Buffbone_Cstm_Foot_Loc} />
        <primitive object={nodes.L_Buffbone_Cstm_Foot_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Default6}
        skeleton={nodes.mesh_0.skeleton}
        position={[-47.25, -0.29, -16.58]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
