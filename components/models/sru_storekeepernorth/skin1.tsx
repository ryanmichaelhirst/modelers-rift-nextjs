import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Watch: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_storekeepernorth_idle3'
  | 'Idle2_Base'
  | 'sru_storekeepernorth_spawn'
  | 'sru_storekeepernorth_idle4'
  | 'sru_storekeepernorth_idle5'
  | 'sru_storekeepernorth_idle6'
  | 'Idle1_Base'
  | 'sru_storekeepernorth_spawn2'
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
        <primitive object={nodes.Watch} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-92.39, -7.96, -86.13]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
