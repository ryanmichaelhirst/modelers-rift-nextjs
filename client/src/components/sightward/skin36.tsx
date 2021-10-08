import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Ward: THREE.Bone
    Chair: THREE.Bone
    Ward_Platform: THREE.Bone
  }
  materials: {
    SnowDown_Poro_Battlecast_TX_CM: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1_Base' | 'Attack1' | 'Death' | 'Idle_In' | 'Idle2_Base'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Ward} />
        <primitive object={nodes.Chair} />
        <primitive object={nodes.Ward_Platform} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SnowDown_Poro_Battlecast_TX_CM}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
