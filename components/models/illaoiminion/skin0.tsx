import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Tentacle1: THREE.Bone
  }
  materials: {
    Tentacle: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'illaoiminion_attack1'
  | 'Idle1'
  | 'Up'
  | 'illaoiminion_idleangry'
  | 'Spawn'
  | 'Death'
  | 'illaoiminion_dormant'
  | 'Dormant_Loop'
  | 'Dance_In'
  | 'Dance_Base'
  | 'IdleHidden'
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
        <primitive object={nodes.Tentacle1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tentacle}
        skeleton={nodes.mesh_0.skeleton}
        position={[-53.46, -61.26, -57.66]}
        scale={0.04}
      />
    </group>
  )
}, areEqual)

export default Model
