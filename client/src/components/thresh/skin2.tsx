import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Skin02_Platform: THREE.Bone
  }
  materials: {
    Thresh_Skin02_Mat: THREE.MeshBasicMaterial
    Thresh_Skin02_Platform_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_run_haste'
  | 'thresh_spell2'
  | 'thresh_attack1_mid'
  | 'thresh_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_idle3'
  | 'thresh_joke'
  | 'thresh_laugh'
  | 'thresh_spell4'
  | 'Taunt_Base'
  | 'thresh_idle_in1'
  | 'thresh_idle_in2'
  | 'thresh_idle4'
  | 'Respawn'
  | 'thresh_attack1_long'
  | 'Spell3_P0'
  | 'thresh_spell3'
  | 'thresh_spell1_pull1'
  | 'thresh_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_spell1_pull2'
  | 'thresh_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_taunt2'
  | 'Dance_Loop'
  | 'thresh_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_attack2_mid'
  | 'thresh_attack2_short'
  | 'Recall'
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
        <primitive object={nodes.Skin02_Platform} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Thresh_Skin02_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Thresh_Skin02_Platform_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
