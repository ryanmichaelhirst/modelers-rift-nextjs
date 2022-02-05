import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Root_break: THREE.Bone
  }
  materials: {
    SRUAP_ChaosInhibitor_MAT: THREE.MeshBasicMaterial
    Destroyed: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Normal1'
  | 'Death_Base'
  | 'sruap_chaosinhibitor_spawn'
  | 'sruap_chaosinhibitor_idle_death'
  | 'Idle_Hold'
  | 'sruap_chaosinhibitor_respawn'
  | 'Idle_Normal2'
  | 'Idle_Normal3'
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
        <primitive object={nodes.Root_break} />
      </group>
      <group position={[-202.69, -789.01, -228.35]} scale={0.07}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.SRUAP_ChaosInhibitor_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Destroyed}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
