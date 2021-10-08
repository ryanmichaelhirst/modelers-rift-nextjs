import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
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
    JinxMine_Skin01_Mat: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.Jaw_Top} />
        <primitive object={nodes.Jaw_Bot} />
        <primitive object={nodes.Cstm_Buffbone_R_Eye} />
        <primitive object={nodes.Cstm_Buffbone_L_Eye} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.JinxMine_Skin01_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
