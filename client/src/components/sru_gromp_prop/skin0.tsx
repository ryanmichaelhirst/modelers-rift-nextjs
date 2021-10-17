import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Mini_Root: THREE.Bone
  }
  materials: {
    SRU_Gromp_mini_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Idle1_Base'
  | 'Idle2'
  | 'sru_gromp_prop_run'
  | 'Explore_Base'
  | 'BaseRun'
  | 'LaneRun'
  | 'Destroy'
  | 'Idle_Hold'
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
        <primitive object={nodes.Mini_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SRU_Gromp_mini_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-36.58, -0.65, -28.74]}
        scale={0}
      />
    </group>
  )
}
