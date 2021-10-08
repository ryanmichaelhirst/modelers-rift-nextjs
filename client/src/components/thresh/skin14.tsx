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
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Cstm_Buffbone_Portal1: THREE.Bone
    Cstm_Buffbone_Portal2: THREE.Bone
    Cstm_Buffbone_Portal3: THREE.Bone
    Cstm_Buffbone_Portal4: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    PulsefireThresh_MAT: THREE.MeshBasicMaterial
    PulsefireThresh_Blade_MAT: THREE.MeshBasicMaterial
    NeckRings_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_skin14_run_haste'
  | 'thresh_skin14_spell2'
  | 'thresh_skin14_attack1_mid'
  | 'thresh_skin14_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_skin14_idle3'
  | 'thresh_skin14_joke'
  | 'thresh_skin14_laugh'
  | 'thresh_skin14_spell4'
  | 'Taunt_Base'
  | 'thresh_skin14_idle_in1'
  | 'thresh_skin14_idle_in2'
  | 'thresh_skin14_idle4'
  | 'Respawn'
  | 'thresh_skin14_attack1_long'
  | 'Spell3_P0'
  | 'thresh_skin14_spell3'
  | 'thresh_skin14_spell1_pull1'
  | 'thresh_skin14_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_skin14_spell1_pull2'
  | 'thresh_skin14_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_skin14_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_skin14_taunt2'
  | 'Dance_Loop'
  | 'thresh_skin14_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_skin14_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_skin14_attack2_mid'
  | 'thresh_skin14_attack2_short'
  | 'Recall'
  | 'thresh_skin14_lantern_spin'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Cstm_Buffbone_Portal1} />
        <primitive object={nodes.Cstm_Buffbone_Portal2} />
        <primitive object={nodes.Cstm_Buffbone_Portal3} />
        <primitive object={nodes.Cstm_Buffbone_Portal4} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.PulsefireThresh_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.PulsefireThresh_Blade_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.NeckRings_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
