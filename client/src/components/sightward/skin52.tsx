import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snow_Base: THREE.Bone
    L_SnowBoard: THREE.Bone
    R_SnowBoard: THREE.Bone
  }
  materials: {
    Gnar_Skin03_Snowman_MAT: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Snow_Base} />
        <primitive object={nodes.L_SnowBoard} />
        <primitive object={nodes.R_SnowBoard} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Gnar_Skin03_Snowman_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-54.67, 0.02, -51.46]}
        scale={0.01}
      />
    </group>
  )
}
