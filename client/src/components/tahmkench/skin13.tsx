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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Hat2World: THREE.Bone
    Throne: THREE.Bone
    CardRoot1: THREE.Bone
    CardRoot2: THREE.Bone
    CardRoot3: THREE.Bone
    CardRoot4: THREE.Bone
    CardRoot5: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hat: THREE.MeshBasicMaterial
    Throne: THREE.MeshBasicMaterial
    Cards: THREE.MeshBasicMaterial
    Pattern: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle_Aggro'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell3'
  | 'Taunt'
  | 'tahmkench_run_haste'
  | 'tahmkench_run_slow'
  | 'tahmkench_run_aggro'
  | 'IdleIn'
  | 'Attack3'
  | 'Spit'
  | 'Recall'
  | 'tahmkench_spell1'
  | 'tahmkench_spell1_alt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell1_Alt_Out'
  | 'Spell1_Out'
  | 'Idle_Aggro_toIdle'
  | 'Idlein_Aggro'
  | 'Respawn'
  | 'Joke'
  | 'Spell1_Alt_Out_ToIdle'
  | 'Spell1_Out_ToIdle'
  | 'Spell1_Alt_Up'
  | 'Spell1_Up'
  | 'tahmkench_spell4_cast2.tahmkench_rework'
  | 'tahmkench_spell4_alt_short.tahmkench_rework'
  | 'Spell4_Short'
  | 'tahmkench_spell4_long.tahmkench_rework'
  | 'tahmkench_spell4_alt.tahmkench_rework'
  | 'tahmkench_spell2_channel.tahmkench_rework'
  | 'spell2_channel_arrive.tahmkench_rework'
  | 'tahmkench_run_spell4.tahmkench_rework'
  | 'tahmkench_run_spell4_fast.tahmkench_rework'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Hat2World} />
        <primitive object={nodes.Throne} />
        <primitive object={nodes.CardRoot1} />
        <primitive object={nodes.CardRoot2} />
        <primitive object={nodes.CardRoot3} />
        <primitive object={nodes.CardRoot4} />
        <primitive object={nodes.CardRoot5} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Hat} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Throne} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Cards} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Pattern} skeleton={nodes.mesh_0_4.skeleton} />
    </group>
  )
}
