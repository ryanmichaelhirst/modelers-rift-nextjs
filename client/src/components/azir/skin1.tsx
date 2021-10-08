import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Cstm_Buffbone_Weapon_Attack1: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_World: THREE.Bone
  }
  materials: {
    Azir_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'azir_attack1'
  | 'azir_attack2'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'azir_run'
  | 'azir_spell2'
  | 'azir_spell4'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'azir_respawn'
  | 'azir_idle4'
  | 'Channel'
  | 'azir_run_in'
  | 'azir_idle3'
  | 'azir_run_variant'
  | 'Joke'
  | 'azir_laugh'
  | 'Taunt_Base'
  | 'Run_Haste'
  | 'Run'
  | 'azir_run_slow_in'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Recall_Leadout'
  | 'Recall_Windup'
  | 'Recall_Winddown'
  | 'Buffbones'
  | 'Recall_Loop'
  | 'azir_attack_command'
  | 'azir_attack_command_turnright'
  | 'azir_attack_command_turnleft'
  | 'KnockupIn'
  | 'KnockUp_Loop'
  | 'azir_spellp'
  | 'azir_spell3_dash'
  | 'azir_spell3_dash_exit'
  | 'Spell3_Dash_LOOP'
  | 'Turn0'
  | 'Turn180'
  | 'Turn90'
  | 'TurnNeg180'
  | 'TurnNeg90'
  | 'GA_Death'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Cstm_Buffbone_Weapon_Attack1} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon_World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Azir_Mat} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
