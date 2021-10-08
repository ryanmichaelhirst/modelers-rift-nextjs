import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Dragon_Root: THREE.Bone
    Dragon_L_Buffbone_Glb_Foot_Loc: THREE.Bone
    Dragon_C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Dragon_C_Buffbone_Glb_Center_Loc: THREE.Bone
    Dragon_Buffbone_Glb_Ground_Loc: THREE.Bone
    Dragon_R_Buffbone_Glb_Foot_Loc: THREE.Bone
    Dragon_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Dragon_Buffbone_Glb_Channel_Loc: THREE.Bone
    Dragon_C_Buffbone_Glb_Chest_Loc: THREE.Bone
    Dragon_L_EyeBuffbone_LOC: THREE.Bone
    Dragon_R_EyeBuffbone_LOC: THREE.Bone
  }
  materials: {
    lambert6: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Recall'
  | 'xinzhao_skin13_run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Spell6'
  | 'Taunt'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Attack3'
  | 'Attack3_To_Idle'
  | 'IdleHaste_To_runHaste'
  | 'Idle_In'
  | 'Idle_In_Haste'
  | 'Idle_To_runHaste'
  | 'runHaste_to_Run'
  | 'Run_02'
  | 'Run_Haste'
  | 'Run_To_RunHaste'
  | 'Spell1_Attack1'
  | 'Spell1_Attack1_To_Idle'
  | 'xinzhao_skin13_spell1_attack2_to_run'
  | 'Spell1_Attack2'
  | 'Spell1_Attack2_To_Idle'
  | 'xinzhao_skin13_spell1_attack1_to_run'
  | 'Spell1_Attack3'
  | 'Spell1_Attack3_To_Run'
  | 'xinzhao_skin13_spell2_stabandslash'
  | 'xinzhao_skin13_spell2_stabandslash_to_idle'
  | 'Spell2_SlashStab_To_Run'
  | 'Spell3_DashToAlly'
  | 'Spell6_To_Idle'
  | 'Spell6_To_Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Dragon_Root} />
        <primitive object={nodes.Dragon_L_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.Dragon_C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Dragon_C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Dragon_Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Dragon_R_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.Dragon_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Dragon_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Dragon_C_Buffbone_Glb_Chest_Loc} />
        <primitive object={nodes.Dragon_L_EyeBuffbone_LOC} />
        <primitive object={nodes.Dragon_R_EyeBuffbone_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert6} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Recall} skeleton={nodes.mesh_0_1.skeleton} />
    </group>
  )
}
