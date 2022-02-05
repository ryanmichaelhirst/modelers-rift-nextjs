import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    L_Wing1: THREE.Bone
    R_Wing1: THREE.Bone
    Root: THREE.Bone
    C_BUFFBONE_GLB_HEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CHEST_LOC: THREE.Bone
    BUFFBONE_GLB_WEAPON_1: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    R_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    R_BUFFBONE_GLB_HAND_LOC: THREE.Bone
    L_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    L_BUFFBONE_GLB_HAND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
  }
  materials: {
    skin07: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
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
        <primitive object={nodes.L_Wing1} />
        <primitive object={nodes.R_Wing1} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_HEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CHEST_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_WEAPON_1} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_HAND_LOC} />
        <primitive object={nodes.L_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.L_BUFFBONE_GLB_HAND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.skin07}
        skeleton={nodes.mesh_0.skeleton}
        position={[-112.14, -14.93, -52.1]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
