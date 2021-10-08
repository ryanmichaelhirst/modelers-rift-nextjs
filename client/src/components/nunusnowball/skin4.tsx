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
    hull: THREE.MeshBasicMaterial
    Nunu_Snowball_Bot_Core_Mat: THREE.MeshBasicMaterial
    snowball_screen: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Run'
  | 'Death'
  | 'nunusnowball_forward_l'
  | 'nunusnowball_forward_r'
  | 'nunubot_ball_spell2_in'
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
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.hull} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Nunu_Snowball_Bot_Core_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.snowball_screen}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
