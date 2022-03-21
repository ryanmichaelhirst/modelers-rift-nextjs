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
    MAT_CHAIN_SW: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'E_WIND_STRONG'
  | 'Idle1'
  | 'sim_e_break'
  | 'E_Broken'
  | 'N_Wind_Strong'
  | 'sim_n_break'
  | 'N_Broken'
  | 'sim_s_break'
  | 'S_Broken'
  | 'S_WIND_STRONG'
  | 'sim_w_break'
  | 'W_Broken'
  | 'W_WIND_STRONG'
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
        material={materials.MAT_CHAIN_SW}
        skeleton={nodes.mesh_0.skeleton}
        position={[-1462.07, -205.02, -88.84]}
        scale={0.18}
      />
    </group>
  )
}, areEqual)

export default Model
