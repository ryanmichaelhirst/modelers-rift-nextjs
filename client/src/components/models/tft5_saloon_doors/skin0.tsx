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
    Saloon_Doors_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tft5_saloon_doors_close.tft_arenaskin_set5_5'
  | 'tft5_saloon_doors_open.tft_arenaskin_set5_5'
  | 'tft5_saloon_doors_close_idle.tft_arenaskin_set5_5'
  | 'tft5_saloon_doors_open_idle.tft_arenaskin_set5_5'
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
        material={materials.Saloon_Doors_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-120.63, 58.19, -24.2]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
