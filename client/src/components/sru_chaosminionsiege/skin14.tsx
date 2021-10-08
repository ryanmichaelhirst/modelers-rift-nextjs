import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Minion_Snowdown_Cannon_Chaos_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'cannon_chaos_attack1'
  | 'cannon_chaos_attack2'
  | 'Win1'
  | 'Win2'
  | 'Death'
  | 'cannon_chaos_death1'
  | 'Idle1'
  | 'Run'
  | 'Lose1'
  | 'Stunned'
  | 'cannon_chaos_attack3'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Minion_Snowdown_Cannon_Chaos_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
