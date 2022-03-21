import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Ward_Tip: THREE.Bone
    L_Wing: THREE.Bone
    R_Wing: THREE.Bone
    Mustache: THREE.Bone
    Tie: THREE.Bone
    Mask: THREE.Bone
    L_Eyebow: THREE.Bone
    R_Eyebow: THREE.Bone
  }
  materials: {
    DefinitelyNot_Ward_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Attack1' | 'Death' | 'Spawn' | 'Hit'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.Ward_Tip} />
        <primitive object={nodes.L_Wing} />
        <primitive object={nodes.R_Wing} />
        <primitive object={nodes.Mustache} />
        <primitive object={nodes.Tie} />
        <primitive object={nodes.Mask} />
        <primitive object={nodes.L_Eyebow} />
        <primitive object={nodes.R_Eyebow} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.DefinitelyNot_Ward_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-73.27, -0.47, -44.24]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
