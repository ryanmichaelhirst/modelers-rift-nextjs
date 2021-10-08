import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Transition'
  | 'Channel_Wndup'
  | 'Death'
  | 'Laugh'
  | 'Recall_Loop'
  | 'Recall_Winddown'
  | 'Recall_Windup'
  | 'Stunned'
  | 'Taunt'
  | 'reksai_spell2_unburrow'
  | 'reksai_run_burrowed'
  | 'reksai_idle01_burrowed'
  | 'Idle1_Base'
  | 'reksai_spell2'
  | 'Spell1'
  | 'Run-90'
  | 'Run90'
  | 'Spell3'
  | 'Attack1'
  | 'Attack2'
  | 'Attack4'
  | 'Attack3'
  | 'Idle_In'
  | 'Spell1B'
  | 'reksai_idle02'
  | 'Spell2'
  | 'Spell2_Unburrow'
  | 'Crit1'
  | 'Crit2'
  | 'Spell1_Burrowed'
  | 'Spell2_Knockup'
  | 'TurretAttack01'
  | 'Run1'
  | 'Run01_Variant_Tongue'
  | 'Spell4'
  | 'RunHaste'
  | 'KnockUp'
  | 'Joke'
  | 'Spell4_Unburrowed'
  | 'Dance'
  | 'Recall'
  | 'Tail-30'
  | 'Tail0'
  | 'Spell4_Run'
  | 'Spell3_Burrowed'
  | 'Attack5'
  | 'Attack6'
  | 'Spell3_Burrowed_Exit'
  | 'Respawn'
  | 'Run_Slow'
  | 'Buffbones'
  | 'Spell4_Airtime'
  | 'Spell4_Cast'
  | 'Spell4_Hit'
  | 'Spell4_Emerge'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
