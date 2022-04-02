import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root_break: THREE.Bone
    base: THREE.Bone
  }
  materials: {
    Destroyed: THREE.MeshBasicMaterial
    SRUAP_OrderNexus_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death_Base'
  | 'sruap_ordernexus_balloon_death'
  | 'Idle1_Base'
  | 'sruap_ordernexus_spawn'
  | 'sruap_ordernexus_spawn_hold'
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
        <primitive object={nodes.Root_break} />
        <primitive object={nodes.base} />
      </group>
      <group position={[-374.5, -816.96, -374.5]} scale={0.07}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Destroyed}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.SRUAP_OrderNexus_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
