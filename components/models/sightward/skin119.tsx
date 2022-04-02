import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Candy_01: THREE.Bone
    Candy_02: THREE.Bone
    Candy_03: THREE.Bone
    Candy_04: THREE.Bone
    Candy_05: THREE.Bone
  }
  materials: {
    Cat_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Hit' | 'Death' | 'Spawn' | 'Attack'
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
        <primitive object={nodes.Candy_01} />
        <primitive object={nodes.Candy_02} />
        <primitive object={nodes.Candy_03} />
        <primitive object={nodes.Candy_04} />
        <primitive object={nodes.Candy_05} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Cat_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-57.93, -0.5, -127.91]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
