import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    Ribbon1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Death'
  | 'Idle1'
  | 'Run'
  | 'Spawn5'
  | 'Spawn4'
  | 'Spawn3'
  | 'Spawn2'
  | 'Spawn1'
  | 'BlackIce_Spawn4'
  | 'BlackIce_Spawn3'
  | 'BlackIce_Spawn2'
  | 'BlackIce_Spawn1'
  | 'BlackIce_Dead'
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
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ribbon1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
