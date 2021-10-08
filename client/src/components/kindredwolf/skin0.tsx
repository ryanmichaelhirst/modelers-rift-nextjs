import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    appleMat: THREE.MeshBasicMaterial
    wolf_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Laugh'
  | 'Joke'
  | 'wolf_w_attack1'
  | 'Turn_0'
  | 'Turn_90'
  | 'Turn_-90'
  | 'Recall'
  | 'Death'
  | 'wolf_idle_01'
  | 'Taunt'
  | 'Idle1_Base'
  | 'Run'
  | 'IdleIn'
  | 'wolf_idle_base_movement_variant1'
  | 'Idle_Base_Variant2'
  | 'Spell1'
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
        material={materials.appleMat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.wolf_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
