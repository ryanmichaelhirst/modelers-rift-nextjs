import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    JT_BASE: THREE.Bone
  }
  materials: {
    ['teemo_trap_astronaut_PET_RG_v01:lambert2']: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Death' | 'Idle1' | 'Run'
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
        <primitive object={nodes.JT_BASE} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials['teemo_trap_astronaut_PET_RG_v01:lambert2']}
        skeleton={nodes.mesh_0.skeleton}
        position={[-36.46, -2.58, -23.08]}
        scale={0}
      />
    </group>
  )
}
