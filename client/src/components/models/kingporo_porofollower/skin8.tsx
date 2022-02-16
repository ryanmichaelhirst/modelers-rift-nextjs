import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    StarGuardian_Poro: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Run1'
  | 'Run2'
  | 'poro_idle2'
  | 'poro_idle3'
  | 'Death'
  | 'poro_idle1'
  | 'HappyLick'
  | 'Jump'
  | 'poro_starguardian_run2'
  | 'poro_starguardian_throw'
  | 'poro_starguardian_throw2'
  | 'poro_throw'
  | 'poro_throw2'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.StarGuardian_Poro}
        skeleton={nodes.mesh_0.skeleton}
        position={[-149.09, 1.05, -145.1]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
