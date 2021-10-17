import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Main: THREE.Bone
  }
  materials: {
    Ward_VS_Lion_MD_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spawn' | 'Attack1' | 'Death' | 'Idle1' | 'Hit'
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
        <primitive object={nodes.Main} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ward_VS_Lion_MD_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-32.68, 0.03, -12.87]}
        scale={0}
      />
    </group>
  )
}
