import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Wisp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_spiritwolf_idle1'
  | 'Idle1'
  | 'Run'
  | 'Death'
  | 'Aggro_Idle'
  | 'Idle_ToAggro'
  | 'Spawn'
  | 'Run_Toidle'
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
        material={materials.Wisp}
        skeleton={nodes.mesh_0.skeleton}
        position={[-5, -0.33, -4.14]}
        scale={0}
      />
    </group>
  )
}
