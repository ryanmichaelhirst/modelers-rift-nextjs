import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    blinn1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'gragas_attack1'
  | 'gragas_attack2'
  | 'Channel_Base'
  | 'gragas_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'gragas_idle3'
  | 'gragas_laugh'
  | 'Run'
  | 'gragas_spell1.summonersriftteam_season11_release17'
  | 'gragas_vandals_spell2_loop'
  | 'gragas_vandals_spell2_windup'
  | 'Spell2_Loop'
  | 'gragas_vandals_spell2_winddown'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Idle2_Base'
  | 'gragas_attack_passive'
  | 'Buffbones_Additive'
  | 'gragas_vandals_keghandleidle'
  | 'gragas_vandals_spell2_keghandle'
  | 'gragas_vandals_spell2_keghandle_loop'
  | 'gragas_vandals_spell2_keghandle_winddown'
  | 'gragas_vandals_spell2_keghandle_windup'
  | 'gragas_vandals_idle2_keghandle'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-188.17, 0.2, -18.44]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
