import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    Vi_POI_Left_A_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Win1'
  | 'tft6_vi_robotarms_winstreak1.tft_arenaskin_set6'
  | 'tft6_vi_robotarms_loss1.tft_arenaskin_set6'
  | 'tft6_vi_robotarms_lossstreak1.tft_arenaskin_set6'
  | 'tft6_vi_robotarms_click1.tft_arenaskin_set6'
  | 'tft6_vi_robotarms_lossstreakin.tft_arenaskin_set6'
  | 'TurnOn'
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
        <primitive object={nodes.root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Vi_POI_Left_A_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-264.3, -6.9, -165.41]}
        scale={0.04}
      />
    </group>
  )
}, areEqual)

export default Model
