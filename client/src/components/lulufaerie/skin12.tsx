import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Run_Base'
  | 'Idle1_Base'
  | 'lulu_skin04_pet_idle_in'
  | 'Run_In'
  | 'lulu_skin04_pet_attack1'
  | 'lulu_skin04_pet_attack2'
  | 'lulu_skin04_pet_run2'
  | 'lulu_skin04_pet_run3'
  | 'Dance'
  | 'Laugh'
  | 'Idle2_Base'
  | 'Recall'
  | 'lulu_skin04_pet_recall'
  | 'Bits'
  | 'Joke'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
