import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    Buffbone_cstm_crystal: THREE.Bone
  }
  materials: {
    SRUAP_OrderTurret5: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1_Base' | 'Attack1' | 'Death' | 'sruap_orderturret5_spawn60'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.Buffbone_cstm_crystal} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SRUAP_OrderTurret5}
        skeleton={nodes.mesh_0.skeleton}
        position={[-432.57, -1021.71, -506.62]}
        scale={0.12}
      />
    </group>
  )
}, areEqual)

export default Model
