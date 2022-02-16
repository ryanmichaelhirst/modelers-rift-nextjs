import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Jaw_Top: THREE.Bone
    Jaw_Bot: THREE.Bone
  }
  materials: {
    JinxMine_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Attack1'
  | 'Idle2'
  | 'Attack2'
  | 'jinxmine_skin29_attack'
  | 'jinxmine_skin29_attack2'
  | 'jinxmine_skin29_attack3'
  | 'jinxmine_idle'
  | 'jinxmine_idle2'
  | 'jinxmine_idle3'
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
        <primitive object={nodes.Jaw_Top} />
        <primitive object={nodes.Jaw_Bot} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.JinxMine_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-42.86, -0.29, -41.55]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
