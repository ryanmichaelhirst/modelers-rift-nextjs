import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Kindred_Skin01_Deamon_Apple: THREE.MeshBasicMaterial
    Kindred_Skin01_Demon_mat: THREE.MeshBasicMaterial
    Kindred_Skin01_Deamon_Hair: THREE.MeshBasicMaterial
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

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        material={materials.Kindred_Skin01_Deamon_Apple}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Kindred_Skin01_Demon_mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Kindred_Skin01_Deamon_Hair}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
