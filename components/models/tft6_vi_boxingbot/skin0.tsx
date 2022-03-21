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
    VI_POI_BoxingBot_A: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2'
  | 'tft6_vi_boxingbot_click1.tft_arenaskin_set6'
  | 'tft6_vi_boxingbot_click2.tft_arenaskin_set6'
  | 'tft6_vi_boxingbot_click3.tft_arenaskin_set6'
  | 'Win1'
  | 'tft6_vi_boxingbot_winstreak1.tft_arenaskin_set6'
  | 'tft6_vi_boxingbot_loss1.tft_arenaskin_set6'
  | 'tft6_vi_boxingbot_lossstreak1.tft_arenaskin_set6'
  | 'TurnOn'
  | 'tft6_vi_boxingbot_lossstreakin.tft_arenaskin_set6'
  | 'Idle3'
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
        material={materials.VI_POI_BoxingBot_A}
        skeleton={nodes.mesh_0.skeleton}
        position={[-302.27, 117.54, -196.51]}
        scale={0.04}
      />
    </group>
  )
}, areEqual)

export default Model
