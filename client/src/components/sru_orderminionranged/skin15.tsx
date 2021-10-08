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
    Minion_Snowdown_Caster_Order_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Win1'
  | 'minion_caster_death3'
  | 'Lose1'
  | 'Attack2'
  | 'minion_caster_death'
  | 'Death_Caster'
  | 'Run'
  | 'Death'
  | 'Idle1'
  | 'Attack1'
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
        material={materials.Minion_Snowdown_Caster_Order_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
