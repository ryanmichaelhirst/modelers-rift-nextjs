import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Bird_Space: THREE.Bone
  }
  materials: {
    BlueBuff_Bird_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spawn' | 'sru_bird_idle_tree1' | 'sru_bird_death' | 'sru_bird_idle_tree2' | 'Destroy'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Bird_Space} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.BlueBuff_Bird_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
