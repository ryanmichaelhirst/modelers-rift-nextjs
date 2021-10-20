import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Crystal: THREE.Bone
    R_Wing_01: THREE.Bone
    R_Wing_02: THREE.Bone
    R_Wing_03: THREE.Bone
    L_Wing_01: THREE.Bone
    L_Wing_02: THREE.Bone
    L_Wing_03: THREE.Bone
    Root: THREE.Bone
  }
  materials: {
    Ward_Championship_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Death' | 'Hit' | 'Idle1' | 'Spawn'
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
        <primitive object={nodes.Crystal} />
        <primitive object={nodes.R_Wing_01} />
        <primitive object={nodes.R_Wing_02} />
        <primitive object={nodes.R_Wing_03} />
        <primitive object={nodes.L_Wing_01} />
        <primitive object={nodes.L_Wing_02} />
        <primitive object={nodes.L_Wing_03} />
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ward_Championship_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-50.86, 0, -36.76]}
        scale={0.01}
      />
    </group>
  )
}
