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
    lambert4: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'shopkeeper_hermit_robot_idle1'
  | 'shopkeeper_hermit_robot_idle2'
  | 'shopkeeper_hermit_robot_idle3'
  | 'shopkeeper_hermit_robot_idle4'
  | 'shopkeeper_hermit_robot_leaving1'
  | 'shopkeeper_hermit_robot_entering1'
  | 'Hiding'
  | 'shopkeeper_hermit_robot_annoyed1'
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
        material={materials.lambert4}
        skeleton={nodes.mesh_0.skeleton}
        position={[-24.74, 6.34, -23.97]}
        scale={0}
      />
    </group>
  )
}, areEqual)

export default Model
