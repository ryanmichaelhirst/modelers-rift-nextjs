import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Ward_Tip: THREE.Bone
    L_Wing: THREE.Bone
    R_Wing: THREE.Bone
    Mustache: THREE.Bone
    Tie: THREE.Bone
    Mask: THREE.Bone
    L_Eyebow: THREE.Bone
    R_Eyebow: THREE.Bone
  }
  materials: {
    DefinitelyNot_Ward_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Attack1' | 'Death' | 'Spawn' | 'Hit'
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
        <primitive object={nodes.Ward_Tip} />
        <primitive object={nodes.L_Wing} />
        <primitive object={nodes.R_Wing} />
        <primitive object={nodes.Mustache} />
        <primitive object={nodes.Tie} />
        <primitive object={nodes.Mask} />
        <primitive object={nodes.L_Eyebow} />
        <primitive object={nodes.R_Eyebow} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.DefinitelyNot_Ward_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
