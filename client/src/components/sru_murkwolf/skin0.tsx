import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    wolf_mat1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_murkwolf_idle1'
  | 'sru_murkwolf_attack1'
  | 'sru_murkwolf_attack4'
  | 'sru_murkwolf_death'
  | 'sru_murkwolf_spawn'
  | 'sru_murkwolf_idle_aggro1'
  | 'sru_murkwolf_idle_aggro2'
  | 'sru_murkwolf_idle_n2a'
  | 'sru_murkwolf_idle_a2n'
  | 'Run_Base'
  | 'sru_murkwolf_pounce'
  | 'sru_murkwolf_death2'
  | 'sru_murkwolf_idle_aggro3'
  | 'sru_murkwolf_idle2'
  | 'sru_murkwolf_idle3'
  | 'sru_murkwolf_idle4'
  | 'sru_murkwolf_idle5'
  | 'Idle_Lookat_L45'
  | 'Idle_Lookat_R45'
  | 'Idle_Lookat_0'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.wolf_mat1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
