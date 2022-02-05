import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    FX_bone_body: THREE.Bone
    root: THREE.Bone
    BUFFBONE_CSTM_GROUND: THREE.Bone
  }
  materials: {
    FizzShark_Skin09_mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spell4' | 'Idle1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.FX_bone_body} />
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_CSTM_GROUND} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.FizzShark_Skin09_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-262.85, -66.55, -412.73]}
        scale={0.07}
      />
    </group>
  )
}, areEqual)

export default Model
