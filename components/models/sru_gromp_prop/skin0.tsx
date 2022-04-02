import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Mini_Root: THREE.Bone
  }
  materials: {
    SRU_Gromp_mini_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Idle1_Base'
  | 'Idle2'
  | 'sru_gromp_prop_run'
  | 'Explore_Base'
  | 'BaseRun'
  | 'LaneRun'
  | 'Destroy'
  | 'Idle_Hold'
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
        <primitive object={nodes.Mini_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SRU_Gromp_mini_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-36.58, -0.65, -28.74]}
        scale={0}
      />
    </group>
  )
}, areEqual)

export default Model
