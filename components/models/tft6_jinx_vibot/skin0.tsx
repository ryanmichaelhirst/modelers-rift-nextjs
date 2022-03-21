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
    Jinx_Vibot_A_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Idle6'
  | 'tft6_jinx_vibot_idle7.tft_arenaskin_set6'
  | 'tft6_jinx_vibot_idle8.tft_arenaskin_set6'
  | 'tft6_jinx_vibot_transition.tft_arenaskin_set6'
  | 'Win1'
  | 'tft6_jinx_vibot_winstreak1.tft_arenaskin_set6'
  | 'tft6_jinx_vibot_idle1.tft_arenaskin_set6'
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
        material={materials.Jinx_Vibot_A_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-75.84, 0.03, -23.6]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
