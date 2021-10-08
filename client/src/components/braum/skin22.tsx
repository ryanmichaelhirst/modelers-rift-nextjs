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
    Origin: THREE.Bone
    Poro: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Braum: THREE.MeshBasicMaterial
    Poro: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'braum_skin01_taunt'
  | 'Run_Base'
  | 'Run'
  | 'Attack1'
  | 'braum_passive_attack_01'
  | 'braum_spell3_punch045'
  | 'braum_spell3_punch0-45'
  | 'braum_idle_in'
  | 'Spell3_Idle0'
  | 'Spell3_Idle-180'
  | 'Spell3_Idle90'
  | 'Spell3_Idle-90'
  | 'Spell3_Run0'
  | 'Spell3_Run179'
  | 'Spell3_Run-179'
  | 'Spell3_Run90'
  | 'Spell3_Run-90'
  | 'Spell2'
  | 'Spell3_Idle180'
  | 'braum_critical_attack_01'
  | 'Spell3_Punch135'
  | 'Spell3_Punch-135'
  | 'Spell3_Punch179'
  | 'Spell3_Punch-179'
  | 'Spell3_Punch45'
  | 'Spell3_Punch-45'
  | 'Spell3_Punch0'
  | 'Spell1'
  | 'Spell4'
  | 'Dance_Windup'
  | 'Dance_Loop'
  | 'Passive_Attack_01'
  | 'Death'
  | 'braum_laugh'
  | 'Attack_Turret'
  | 'Idle_01_In'
  | 'Idle_01_Loop'
  | 'braum_spell3_leap0'
  | 'braum_channel_in'
  | 'braum_channel_loop'
  | 'Spell3_Leapleft'
  | 'Spell3_Leapright'
  | 'Spell3_Leapback'
  | 'Spell3_Leapforward'
  | 'Spell3_Punch045'
  | 'Spell3_Punch0-45'
  | 'Recall'
  | 'braum_skin01_joke'
  | 'Idle_Shield'
  | 'Channel_Wndup'
  | 'Spell3_Punch0179'
  | 'Spell3_Punch0-179'
  | 'Spell3_Punchleft-179'
  | 'Spell3_Punchleft-45'
  | 'Spell3_Punchright179'
  | 'Spell3_Punchright45'
  | 'braum_joke2_into'
  | 'Joke2_Loop'
  | 'braum_joke_in'
  | 'braum_joke_loop'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Origin} />
        <primitive object={nodes.Poro} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Braum} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Poro} skeleton={nodes.mesh_0_1.skeleton} />
    </group>
  )
}
