import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Recall_Barrel: THREE.Bone
    Recall_BottleA: THREE.Bone
    Buffbone_Custom_Healthbar: THREE.Bone
    Recall_Hat_Buffbone: THREE.Bone
    Recall_Candy_Buffbone: THREE.Bone
    Recall_Cloud01: THREE.Bone
    Recall_Cloud02: THREE.Bone
    Recall_Cloud03: THREE.Bone
    Recall_Cloud04: THREE.Bone
  }
  materials: {
    Antenna: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Idle1'
  | 'Celebration'
  | 'tft6_kogmaw_spell2.tft_set6'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Recall_Barrel} />
        <primitive object={nodes.Recall_BottleA} />
        <primitive object={nodes.Buffbone_Custom_Healthbar} />
        <primitive object={nodes.Recall_Hat_Buffbone} />
        <primitive object={nodes.Recall_Candy_Buffbone} />
        <primitive object={nodes.Recall_Cloud01} />
        <primitive object={nodes.Recall_Cloud02} />
        <primitive object={nodes.Recall_Cloud03} />
        <primitive object={nodes.Recall_Cloud04} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Antenna}
        skeleton={nodes.mesh_0.skeleton}
        position={[-110.34, -5.23, -169.83]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
