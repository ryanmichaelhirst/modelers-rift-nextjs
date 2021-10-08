import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Center: THREE.Bone
    Base: THREE.Bone
  }
  materials: {
    VFXPassive: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Spawn' | 'Idle' | 'Timer' | 'Idle_In' | 'Appear'
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
        <primitive object={nodes.Center} />
        <primitive object={nodes.Base} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.VFXPassive}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
