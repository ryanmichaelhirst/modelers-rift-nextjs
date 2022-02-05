import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Bird_Space: THREE.Bone
  }
  materials: {
    BlueBuff_Bird_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spawn'
  | 'sru_bird_idle_tree1'
  | 'sru_bird_death'
  | 'sru_bird_idle_tree2'
  | 'Destroy'
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
        <primitive object={nodes.Bird_Space} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.BlueBuff_Bird_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-48.91, -1.58, -48.02]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
