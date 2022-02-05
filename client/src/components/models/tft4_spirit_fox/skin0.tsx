import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Fox_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'spiritfox_idle01.tft_arenaskin_spiritblossom'
  | 'spiritfox_idlewin.tft_arenaskin_spiritblossom'
  | 'spiritfox_idlelose01.tft_arenaskin_spiritblossom'
  | 'spiritfox_idle02.tft_arenaskin_spiritblossom'
  | 'spiritfox_idlevictoryin.tft_arenaskin_spiritblossom'
  | 'spiritfox_idlevictoryloop.tft_arenaskin_spiritblossom'
  | 'spiritfox_idledefeat01.tft_arenaskin_spiritblossom'
  | 'spiritfox_idledefeatin.tft_arenaskin_spiritblossom'
  | 'spiritfox_idlevictoryout.tft_arenaskin_spiritblossom'
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
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Fox_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-16.3, 0.29, -163.5]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
