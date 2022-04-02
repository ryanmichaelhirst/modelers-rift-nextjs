import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
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
  }
  materials: {
    Urgot_Battlecast_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Attack1_InCombat_Bwd'
  | 'Attack1_InCombat_Fwd'
  | 'Attack1_InCombat_Left'
  | 'Attack1_InCombat_Right'
  | 'Attack2_Bwd'
  | 'Attack2_Fwd'
  | 'Attack2_Left'
  | 'Attack2_Right'
  | 'CounterAnim_-135'
  | 'CounterAnim_-179'
  | 'CounterAnim_-45'
  | 'CounterAnim_135'
  | 'CounterAnim_179'
  | 'CounterAnim_45'
  | 'Crit_Bwd'
  | 'Crit_Fwd'
  | 'Crit_Left'
  | 'Crit_Right'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Idle1_Base'
  | 'urgot_bc_idle'
  | 'Idle_Fidget_02'
  | 'Idle_In'
  | 'urgot_bc_joke'
  | 'Knockup_Base'
  | 'KnockUp_Loop'
  | 'urgot_bc_laugh'
  | 'urgot_bc_passive'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'urgot_bc_hasterun_bwd'
  | 'urgot_bc_hasterun_fwd'
  | 'urgot_bc_hasterun_left'
  | 'urgot_bc_hasterun_right'
  | 'Run_Bwd'
  | 'Run_Fwd'
  | 'Run_Left'
  | 'Run_Right'
  | 'Run_To_Idle'
  | 'Spell1_Bwd'
  | 'Spell1_Fwd'
  | 'Spell1_Left'
  | 'Spell1_Right'
  | 'Spell2Cast'
  | 'urgot_bc_spell2left_-179'
  | 'urgot_bc_spell2left_179'
  | 'urgot_bc_spell2left'
  | 'urgot_bc_spell2_-179'
  | 'urgot_bc_spell2_179'
  | 'urgot_bc_spell2'
  | 'urgot_bc_spell3_grabthrow_bwd'
  | 'urgot_bc_spell3_grabthrow_fwd'
  | 'urgot_bc_spell3_grabthrow_left'
  | 'urgot_bc_spell3_grabthrow_right'
  | 'Spell3_Move_Bwd'
  | 'Spell3_Move_Fwd'
  | 'Spell3_Move_Left'
  | 'Spell3_Move_Right'
  | 'Spell3_Recovery_Bwd'
  | 'Spell3_Recovery_Fwd'
  | 'Spell3_Recovery_Left'
  | 'Spell3_Recovery_Right'
  | 'Spell3_Recovery_RunBwd'
  | 'Spell3_Recovery_RunFwd'
  | 'Spell3_Recovery_RunLeft'
  | 'Spell3_Recovery_RunRight'
  | 'urgot_bc_spell3_recovery_fwd'
  | 'urgot_bc_spell3_bwd'
  | 'urgot_bc_spell3_right'
  | 'urgot_bc_spell3_left'
  | 'Spell4_Bwd'
  | 'urgot_bc_spell4_execute'
  | 'Spell4_Fwd'
  | 'urgot_bc_spell4_fwd'
  | 'Spell4_Left'
  | 'urgot_bc_spell4_additve_intro'
  | 'urgot_bc_spell4_additve_loop'
  | 'Spell4_Right'
  | 'Stun'
  | 'urgot_bc_taunt'
  | 'urgot_bc_haste_turn_0'
  | 'urgot_bc_haste_turnleft_180'
  | 'urgot_bc_haste_turnleft_90'
  | 'urgot_bc_haste_turnright_180'
  | 'urgot_bc_haste_turnright_90'
  | 'TurnLeft_180'
  | 'TurnLeft_90'
  | 'TurnRight_180'
  | 'TurnRight_90'
  | 'Turn_0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Urgot_Battlecast_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-206.12, -4.95, -179.02]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
