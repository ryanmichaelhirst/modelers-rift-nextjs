import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Cane1: THREE.Bone
    Berry1: THREE.Bone
    Berry2: THREE.Bone
    Berry3: THREE.Bone
    L_Leaf: THREE.Bone
    R_Leaf: THREE.Bone
  }
  materials: {
    Ward_LunarRevel_Candycane_MD_blinn2: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1_Base' | 'Attack1' | 'Death' | 'Idle_In'
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
        <primitive object={nodes.Cane1} />
        <primitive object={nodes.Berry1} />
        <primitive object={nodes.Berry2} />
        <primitive object={nodes.Berry3} />
        <primitive object={nodes.L_Leaf} />
        <primitive object={nodes.R_Leaf} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ward_LunarRevel_Candycane_MD_blinn2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
