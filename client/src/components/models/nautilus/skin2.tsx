import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Weapon: THREE.Bone
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    lambert5: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nautilus_attack1'
  | 'nautilus_attack2'
  | 'nautilus_attack3'
  | 'nautilus_attack4'
  | 'nautilus_attack_back'
  | 'Channel_Base'
  | 'nautilus_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nautilus_idle3'
  | 'nautilus_idle4'
  | 'nautilus_joke'
  | 'nautilus_laugh'
  | 'Run_Base'
  | 'nautilus_run1'
  | 'nautilus_run2'
  | 'nautilus_spell1'
  | 'nautilus_spell1_idle'
  | 'nautilus_spell1_dash'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'nautilus_subterranean_drillmask'
  | 'nautilus_subterranean_drillmask_stop'
  | 'Buffbones'
  | 'Recall'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert5}
        skeleton={nodes.mesh_0.skeleton}
        position={[-389.61, -0.39, -37.42]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
