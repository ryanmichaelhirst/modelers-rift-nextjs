import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    ROOT: THREE.Bone
    BUFFBONE_CSTM_DUST: THREE.Bone
  }
  materials: {
    ['riotRig:cassiopeia_base_RG_v04_blinn1']: THREE.MeshBasicMaterial
    ['riotRig:blinn1']: THREE.MeshBasicMaterial
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'Run'
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
        <primitive object={nodes.ROOT} />
        <primitive object={nodes.BUFFBONE_CSTM_DUST} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials['riotRig:cassiopeia_base_RG_v04_blinn1']}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials['riotRig:blinn1']}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
