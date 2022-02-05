import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    base: THREE.Bone
  }
  materials: {
    BaseMAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1_Base' | 'sruap_ordernexus_spawn' | 'sruap_ordernexus_spawn_hold'
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
        <primitive object={nodes.base} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.BaseMAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-360.52, -1313.2, -360.52]}
        scale={0.1}
      />
    </group>
  )
}, areEqual)

export default Model
