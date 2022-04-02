import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    ROOT: THREE.Bone
    BUFFBONE_CSTM_DUST: THREE.Bone
  }
  materials: {
    ['riotRig:cassiopeia_base_RG_v04_blinn1']: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'Run'
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
        <primitive object={nodes.ROOT} />
        <primitive object={nodes.BUFFBONE_CSTM_DUST} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials['riotRig:cassiopeia_base_RG_v04_blinn1']}
        skeleton={nodes.mesh_0.skeleton}
        position={[4.44, -4.29, -97.84]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
