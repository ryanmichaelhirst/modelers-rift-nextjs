import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Follower_Root: THREE.Bone
  }
  materials: {
    Follower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Run'
  | 'FloatIdle01'
  | 'FloatRun01'
  | 'Float_Out'
  | 'Meditate'
  | 'Emote'
  | 'Spawn'
  | 'Recall_Idle1'
  | 'Recall_Idle2'
  | 'Recall_Idle3'
  | 'Recall_Emote'
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
        <primitive object={nodes.Follower_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Follower}
        skeleton={nodes.mesh_0.skeleton}
        position={[-33.72, -0.23, -25.57]}
        scale={0}
      />
    </group>
  )
}, areEqual)

export default Model
