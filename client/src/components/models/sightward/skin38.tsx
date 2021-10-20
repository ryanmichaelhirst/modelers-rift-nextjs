import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Ward: THREE.Bone
    Ward_Platform: THREE.Bone
    Chair: THREE.Bone
  }
  materials: {
    SnowDown_Poro_ShadowIsles_MD_lambert4207: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1_Base' | 'Attack1' | 'Death' | 'Idle_In' | 'Idle2_Base'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Ward} />
        <primitive object={nodes.Ward_Platform} />
        <primitive object={nodes.Chair} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SnowDown_Poro_ShadowIsles_MD_lambert4207}
        skeleton={nodes.mesh_0.skeleton}
        position={[-204.14, -4.78, -322.68]}
        scale={0.03}
      />
    </group>
  )
}
