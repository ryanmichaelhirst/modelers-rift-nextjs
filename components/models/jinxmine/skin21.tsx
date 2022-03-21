import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Jaw_Bot: THREE.Bone
    Jaw_Top: THREE.Bone
  }
  materials: {
    JinxMine_Teeth_MAT: THREE.MeshBasicMaterial
    HardLight: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Attack1'
  | 'Idle2'
  | 'Attack2'
  | 'jinxmine_attack'
  | 'jinxmine_attack2'
  | 'jinxmine_attack3'
  | 'jinxmine_idle'
  | 'jinxmine_idle2'
  | 'jinxmine_idle4'
  | 'Idle3'
  | 'Attack3'
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
        <primitive object={nodes.Jaw_Bot} />
        <primitive object={nodes.Jaw_Top} />
      </group>
      <group position={[-23.61, 5.86, -33.72]} scale={0}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.JinxMine_Teeth_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.HardLight}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
