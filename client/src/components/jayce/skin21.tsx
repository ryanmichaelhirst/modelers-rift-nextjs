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
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_HEALTHBAR_LOC: THREE.Bone
    Recall_Platform: THREE.Bone
    Recall_flag_jnt1: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    blades: THREE.MeshBasicMaterial
    platform: THREE.MeshBasicMaterial
    flag: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'jayce_melee_idle1'
  | 'jayce_melee_idle2'
  | 'jayce_melee_idle3'
  | 'jayce_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Ranged_Spell1'
  | 'jayce_ranged_spell2_attack2'
  | 'Ranged_Spell3'
  | 'jayce_ranged_spell1'
  | 'Ranged_Attack1'
  | 'Ranged_Attack2'
  | 'jayce_ranged_attack1'
  | 'Run_Fast'
  | 'jayce_ranged_run1'
  | 'jayce_ranged_run2.pie_c_legacy_bugs_2021'
  | 'Ranged_Spell2_Attack1'
  | 'Ranged_Spell2_Attack2'
  | 'Melee_Passive'
  | 'Ranged_Passive'
  | 'jayce_joke'
  | 'jayce_ranged_idle1'
  | 'jayce_ranged_idle2'
  | 'jayce_ranged_idle3'
  | 'jayce_dance_loop_melee.pie_c_legacy_bugs_2021'
  | 'jayce_dance_windup'
  | 'Recall'
  | 'Attack1'
  | 'jayce_taunt'
  | 'jayce_taunt_melee'
  | 'jayce_joke_melee'
  | 'jayce_laugh_melee'
  | 'jayce_dance_windup_range'
  | 'jayce_dance_loop'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_HEALTHBAR_LOC} />
        <primitive object={nodes.Recall_Platform} />
        <primitive object={nodes.Recall_flag_jnt1} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.blades} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.platform}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.flag} skeleton={nodes.mesh_0_4.skeleton} />
    </group>
  )
}
