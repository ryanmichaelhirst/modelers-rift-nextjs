import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Head: THREE.Bone
    Pelvis: THREE.Bone
    Front_Legs: THREE.Bone
    Spine: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle2_Base'
  | 'Idle1_Base'
  | 'sru_lizard_run'
  | 'RunHide'
  | 'sru_lizard_run_left'
  | 'sru_lizard_run_right'
  | 'BaseRun'
  | 'BaseHide'
  | 'Destroy'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Head} />
        <primitive object={nodes.Pelvis} />
        <primitive object={nodes.Front_Legs} />
        <primitive object={nodes.Spine} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
