import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Root_Krab: THREE.Bone
    Weapon: THREE.Bone
  }
  materials: {
    SightWard_Skin60_TX_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spawn' | 'Idle1' | 'Death' | 'Hit'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Root_Krab} />
        <primitive object={nodes.Weapon} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SightWard_Skin60_TX_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
