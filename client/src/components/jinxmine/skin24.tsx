import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
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

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Jaw_Bot} />
        <primitive object={nodes.Jaw_Top} />
      </group>
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
  )
}
