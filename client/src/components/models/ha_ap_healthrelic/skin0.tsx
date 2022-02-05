import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    ride_root_b: THREE.Bone
    ride_root_d: THREE.Bone
    Root: THREE.Bone
    ride_root: THREE.Bone
    R_weapon: THREE.Bone
    L_weapon: THREE.Bone
  }
  materials: {
    Base: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'React' | 'Run' | 'Attack1' | 'Attack2'
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
        <primitive object={nodes.ride_root_b} />
        <primitive object={nodes.ride_root_d} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.ride_root} />
        <primitive object={nodes.R_weapon} />
        <primitive object={nodes.L_weapon} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Base}
        skeleton={nodes.mesh_0.skeleton}
        position={[-30.05, 0.01, -36.41]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
