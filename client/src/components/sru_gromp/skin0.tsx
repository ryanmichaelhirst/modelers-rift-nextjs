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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Mushroom: THREE.Bone
    Mini_Root: THREE.Bone
  }
  materials: {
    Toad_Mat: THREE.MeshBasicMaterial
    Toad_Spawn_Mat: THREE.MeshBasicMaterial
    SRU_Gromp_mini_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_gromp_idle1'
  | 'Attack1_Mid'
  | 'Run'
  | 'Death'
  | 'sru_gromp_idle2'
  | 'sru_gromp_idle1_aggro'
  | 'sru_gromp_idle4'
  | 'sru_gromp_idle3'
  | 'sru_gromp_idle1_aggro2'
  | 'sru_gromp_idle1_aggro3'
  | 'sru_gromp_idle1_n2a'
  | 'sru_gromp_idle1_a2n'
  | 'sru_gromp_spawn'
  | 'sru_gromp_idle5'
  | 'sru_gromp_idle6'
  | 'sru_gromp_idle1_aggro4'
  | 'sru_gromp_attack1b'
  | 'Attack1_Left'
  | 'Attack1_Right'
  | 'Attack1b_Left'
  | 'Attack1b_Right'
  | 'sru_gromp_idle1_aggro_lookat_l'
  | 'sru_gromp_idle1_aggro_lookat_r'
  | 'sru_gromp_idle1_aggro_lookat_mid'
  | 'sru_gromp_attack1'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Mushroom} />
        <primitive object={nodes.Mini_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Toad_Mat} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Toad_Spawn_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.SRU_Gromp_mini_mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
