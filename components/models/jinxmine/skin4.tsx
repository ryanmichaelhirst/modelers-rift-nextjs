import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Jaw_Top: THREE.Bone
    Jaw_Bot: THREE.Bone
    Cstm_Buffbone_R_Eye: THREE.Bone
    Cstm_Buffbone_L_Eye: THREE.Bone
  }
  materials: {
    Jinx_Skin04_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Attack1'
  | 'Idle2'
  | 'Attack2'
  | 'jinxmine_skin04_idle1_attack1'
  | 'jinxmine_skin04_idle1_in'
  | 'jinxmine_skin04_idle2_in'
  | 'jinxmine_skin04_idle3_in'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.Jaw_Top} />
        <primitive object={nodes.Jaw_Bot} />
        <primitive object={nodes.Cstm_Buffbone_R_Eye} />
        <primitive object={nodes.Cstm_Buffbone_L_Eye} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jinx_Skin04_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-31.32, 1.27, -69.19]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
