import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
  }
  materials: {
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Death' | 'Idle1' | 'Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.C_Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert2} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
