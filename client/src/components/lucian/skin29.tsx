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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'lucian_joke'
  | 'lucian_laugh'
  | 'Taunt_Base'
  | 'Idle2_Base'
  | 'lucian_idle3'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'lucian_run1'
  | 'Crit2'
  | 'Run1_In'
  | 'lucian_idle_in'
  | 'Idle_Ready'
  | 'Idle_ReadyOut'
  | 'Spell3'
  | 'Run_Haste'
  | 'Spell4_0'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_90'
  | 'Spell3_-90'
  | 'Dance'
  | 'Crit1_Fast'
  | 'Crit2_Fast'
  | 'Spell4_180'
  | 'Spell4_-180'
  | 'lucian_spell3'
  | 'Spell4_Arms'
  | 'Spell4_Idle_0'
  | 'Spell4_Idle_180'
  | 'Spell4_Idle_-180'
  | 'Spell4_Idle_90'
  | 'Spell4_Idle_-90'
  | 'lucian_spell4_arms'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'lucian_passive'
  | 'lucian_run2'
  | 'Run2_In'
  | 'Passive_180'
  | 'Passive_-180'
  | 'Passive_90'
  | 'Passive_-90'
  | 'Buffbones'
  | 'lucian_passive_crit'
  | 'Passive_Override'
  | 'Spell1'
  | 'lucian_taunt'
  | 'lucian_idle1'
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
        <primitive object={nodes.Recall_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Recall} skeleton={nodes.mesh_0_2.skeleton} />
    </group>
  )
}
