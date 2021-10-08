import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Cstm_Buffbone_Weapon_Attack1: THREE.Bone
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
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'azir_run'
  | 'azir_spell4'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'Respawn'
  | 'azir_idle4'
  | 'Channel'
  | 'azir_run_in'
  | 'azir_idle3'
  | 'azir_run_variant'
  | 'Recall_LeadIn'
  | 'Recall_Leadout'
  | 'Recall_Loop'
  | 'azir_recall_winddown'
  | 'Joke'
  | 'azir_laugh'
  | 'Taunt_Base'
  | 'azir_spell2'
  | 'Run_Haste'
  | 'Run'
  | 'azir_run_slow_in'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Death'
  | 'Buffbones'
  | 'azir_spell3_dash'
  | 'azir_spell3_dash_exit'
  | 'azir_spellp'
  | 'azir_attack_command'
  | 'Turn0'
  | 'Turn90'
  | 'TurnNeg90'
  | 'Turn180'
  | 'TurnNeg180'
  | 'azir_attack_command_turnleft'
  | 'azir_attack_command_turnright'
  | 'Spell3_Dash_LOOP'
  | 'KnockupIn'
  | 'KnockUp_Loop'
  | 'GA_Death'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
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
        <primitive object={nodes.Cstm_Buffbone_Weapon_Attack1} />
        <primitive object={nodes.Weapon_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Azir_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
