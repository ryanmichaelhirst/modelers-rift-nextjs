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
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2_Base'
  | 'sru_antlermouse_run_right'
  | 'sru_antlermouse_run_left'
  | 'sru_antlermouse_run'
  | 'sru_antlermouse_run_fwdright'
  | 'sru_antlermouse_idlewait'
  | 'sru_antlermouse_hiding'
  | 'sru_antlermouse_peeking'
  | 'Explore_Base'
  | 'sru_antlermouse_peekinghold'
  | 'IdleToPeek_TRANS'
  | 'BaseRunHide'
  | 'BaseRunHide2'
  | 'sru_antlermouse_midlanerun'
  | 'Destroy'
  | 'Explore_Hold'
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
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-16.43, -0.18, -81.44]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
