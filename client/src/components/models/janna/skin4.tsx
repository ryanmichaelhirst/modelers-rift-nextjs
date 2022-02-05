import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Victorious_M: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'janna_attack1'
  | 'janna_attack2'
  | 'Channel_Base'
  | 'janna_channel_windup'
  | 'Crit_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'janna_idle3'
  | 'janna_joke'
  | 'Dance_Base'
  | 'Death_Base'
  | 'janna_laugh'
  | 'Taunt_Base'
  | 'Run_Base'
  | 'janna_spell1'
  | 'janna_spell2'
  | 'Spell3_Base'
  | 'janna_spell4_windup'
  | 'janna_spell4_loop'
  | 'janna_spell4_winddown'
  | 'janna_idle2'
  | 'janna_warhero_idle1'
  | 'janna_warhero_idle2'
  | 'janna_warhero_idle3'
  | 'janna_warhero_run'
  | 'janna_warhero_spell1'
  | 'janna_warhero_spell2'
  | 'janna_warhero_attack1'
  | 'janna_warhero_attack2'
  | 'janna_warhero_crit'
  | 'janna_warhero_dance'
  | 'janna_warhero_death'
  | 'janna_warhero_channel'
  | 'janna_warhero_ult_loop'
  | 'janna_warhero_ult_winddown'
  | 'janna_warhero_ult_windup'
  | 'janna_warhero_taunt'
  | 'janna_warhero_joke'
  | 'janna_warhero_laugh'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Victorious_M}
        skeleton={nodes.mesh_0.skeleton}
        position={[-92.03, -18.1, -37.08]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
