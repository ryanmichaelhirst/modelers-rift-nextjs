import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    BallDown: THREE.Bone
    BallUpper: THREE.Bone
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Rose: THREE.Bone
    Bouquet: THREE.Bone
    Heart_Box_Bottom: THREE.Bone
  }
  materials: {
    Orianna_Sweetheart_MAT2: THREE.MeshBasicMaterial
    Orianna_cake: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'orianna_idle3'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell1B'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3B'
  | 'Spell4'
  | 'Taunt'
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
        <primitive object={nodes.BallDown} />
        <primitive object={nodes.BallUpper} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Rose} />
        <primitive object={nodes.Bouquet} />
        <primitive object={nodes.Heart_Box_Bottom} />
      </group>
      <group position={[-130.34, -56.85, -82.04]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Orianna_Sweetheart_MAT2}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Orianna_cake}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
