import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    ReindeerPoro: THREE.MeshBasicMaterial
    lambert5SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Run1'
  | 'Run2'
  | 'poro_idle2'
  | 'poro_idle3'
  | 'Death'
  | 'poro_idle4'
  | 'poro_idle1'
  | 'HappyLick'
  | 'Jump'
  | 'poro_run2'
  | 'poro_throw'
  | 'poro_throw2'
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
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.ReindeerPoro}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.lambert5SG1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
