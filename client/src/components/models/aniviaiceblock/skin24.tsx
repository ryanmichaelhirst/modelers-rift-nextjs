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
    Ice: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Spawn1'
  | 'Spawn2'
  | 'Spawn3'
  | 'Spawn4'
  | 'Spawn5'
  | 'BlackIce_Dead'
  | 'BlackIce_Spawn1'
  | 'BlackIce_Spawn2'
  | 'BlackIce_Spawn3'
  | 'BlackIce_Spawn4'
  | 'Death'
  | 'Idle1'
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
        material={materials.Ice}
        skeleton={nodes.mesh_0.skeleton}
        position={[-458.03, -91.71, -71.61]}
        scale={0.06}
      />
    </group>
  )
}
