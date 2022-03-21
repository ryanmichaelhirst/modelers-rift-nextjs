import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Head: THREE.Bone
    Pelvis: THREE.Bone
    Front_Legs: THREE.Bone
    Spine: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle2_Base'
  | 'Idle1_Base'
  | 'sru_lizard_run'
  | 'RunHide'
  | 'sru_lizard_run_left'
  | 'sru_lizard_run_right'
  | 'BaseRun'
  | 'BaseHide'
  | 'Destroy'
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
        <primitive object={nodes.Head} />
        <primitive object={nodes.Pelvis} />
        <primitive object={nodes.Front_Legs} />
        <primitive object={nodes.Spine} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-26.64, 0.04, -58.69]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
