import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Death'
  | 'Idle1'
  | 'Spawn5'
  | 'Spawn4'
  | 'Spawn3'
  | 'Spawn2'
  | 'Spawn1'
  | 'BlackIce_Spawn4'
  | 'BlackIce_Spawn3'
  | 'BlackIce_Spawn2'
  | 'BlackIce_Spawn1'
  | 'BlackIce_Dead'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-458.03, -91.71, -71.61]}
        scale={0.06}
      />
    </group>
  )
}, areEqual)

export default Model
