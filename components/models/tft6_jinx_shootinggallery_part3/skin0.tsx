import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    ziggs: THREE.MeshBasicMaterial
    metal: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Win1'
  | 'tft6_jinx_shootinggallery_part3_idle1.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click1.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click2.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click3.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click1to2.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click2to3.tft_arenaskin_set6'
  | 'tft6_jinx_shootinggallery_part3_click3to1.tft_arenaskin_set6'
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
        <primitive object={nodes.root} />
      </group>
      <group position={[-391.22, -935.53, -646.33]} scale={0.1}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.ziggs} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.metal} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
