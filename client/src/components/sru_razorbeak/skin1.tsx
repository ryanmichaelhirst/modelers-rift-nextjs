import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    lambert5: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Aggro1'
  | 'Run'
  | 'Attack1'
  | 'Death_Base'
  | 'Spawn'
  | 'sru_razorbeak_idle_normal1'
  | 'sru_razorbeak_idle_normal2'
  | 'sru_razorbeak_idle_aggro_l45'
  | 'sru_razorbeak_idle_aggro_r45'
  | 'sru_razorbeak_idle_aggro_0'
  | 'sru_razorbeak_idle_aggro_l135'
  | 'sru_razorbeak_idle_aggro_r135'
  | 'sru_razorbeak_a2n'
  | 'sru_razorbeak_n2a'
  | 'Idle_Aggro3'
  | 'Idle_Aggro2'
  | 'sru_razorbeak_ranged_attack2'
  | 'sru_razorbeak_ranged_attack3'
  | 'sru_razorbeak_nspawn'
  | 'sru_razorbeak_idle_normal3'
  | 'sru_razorbeak_idle_normal4'
  | 'sru_razorbeak_death2'
  | 'sru_razorbeak_idle_normal5'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert5} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
