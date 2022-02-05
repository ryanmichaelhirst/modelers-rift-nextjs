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
    Jinx_Culturekit_A_MAT1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Win1'
  | 'tft6_jinx_monkeybot_loss1.tft_arenaskin_set6'
  | 'tft6_jinx_monkeybot_win1.tft_arenaskin_set6'
  | 'tft6_jinx_monkeybot_lossstreakin.tft_arenaskin_set6'
  | 'Idle2'
  | 'tft6_jinx_monkeybot_lossstreak1.tft_arenaskin_set6'
  | 'TurnOn'
  | 'tft6_jinx_monkeybot_click1.tft_arenaskin_set6'
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
        material={materials.Jinx_Culturekit_A_MAT1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-381.31, -0.4, -248.12]}
        scale={0.05}
      />
    </group>
  )
}, areEqual)

export default Model
