import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    L_RoboArm_World: THREE.Bone
    R_RoboArm_World: THREE.Bone
  }
  materials: {
    Super_Chaos_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Win1'
  | 'Win2'
  | 'Attack1'
  | 'Attack2'
  | 'Stunned'
  | 'Idle1'
  | 'Lose1'
  | 'Lose2'
  | 'superminion_red_death2'
  | 'Death_Base'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_RoboArm_World} />
        <primitive object={nodes.R_RoboArm_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Super_Chaos_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
