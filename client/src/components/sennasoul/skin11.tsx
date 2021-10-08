import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Spawn' | 'Idle' | 'Timer' | 'Idle_In' | 'Appear'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
