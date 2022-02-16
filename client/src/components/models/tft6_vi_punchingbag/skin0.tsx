import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    Vi_POI_Left_B_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'tft6_vi_punchingbag_click1.tft_arenaskin_set6'
  | 'tft6_vi_punchingbag_click2.tft_arenaskin_set6'
  | 'tft6_vi_punchingbag_click3.tft_arenaskin_set6'
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
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Vi_POI_Left_B_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-46.42, 27.96, -45.73]}
        scale={0.04}
      />
    </group>
  )
}, areEqual)

export default Model
