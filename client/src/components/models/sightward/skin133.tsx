import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Crown2World: THREE.Bone
    Pole1: THREE.Bone
    Snap_Flag2World: THREE.Bone
  }
  materials: {
    Ward_Aprilfoolz_Cat_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Hit' | 'Attack' | 'Death' | 'Spawn' | 'Idle1'
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
        <primitive object={nodes.Snap_Crown2World} />
        <primitive object={nodes.Pole1} />
        <primitive object={nodes.Snap_Flag2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ward_Aprilfoolz_Cat_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-48.34, 0.18, -37.57]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
