import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
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
    RekSai_Skin01_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Transition'
  | 'Channel_Wndup'
  | 'Death'
  | 'Laugh'
  | 'Recall_Winddown'
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
  | 'Run_Slow'
  | 'Spell4_Unburrowed'
  | 'Dance'
  | 'Recall'
  | 'Tail-30'
  | 'Tail0'
  | 'Recall_Leadout'
  | 'Attack5'
  | 'Attack6'
  | 'Spell4_Run'
  | 'Spell3_Burrowed'
  | 'Spell3_Burrowed_Exit'
  | 'Joke'
  | 'Respawn'
  | 'Buffbones'
  | 'Spell4_Airtime'
  | 'Spell4_Cast'
  | 'Spell4_Emerge'
  | 'Spell4_Hit'
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
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.RekSai_Skin01_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-171.2, -6.42, -210.85]}
        scale={0.02}
      />
    </group>
  )
}
