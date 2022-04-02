import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Mini_Root: THREE.Bone
    Jetski: THREE.Bone
    Root: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Frog: THREE.MeshBasicMaterial
    JetSki: THREE.MeshBasicMaterial
    RekSai_PoolParty_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Taunt'
  | 'Idle1_Base'
  | 'Idle_In'
  | 'reksai_idle02'
  | 'Dance'
  | 'Recall'
  | 'Recall_Leadout'
  | 'reksai_skin02_homeguard_emerge'
  | 'reksai_skin02_spell2'
  | 'Idle_to_homeguard'
  | 'reksai_skin02_runhaste_transition'
  | 'RunHaste_trans_run'
  | 'RunHaste'
  | 'Channel'
  | 'Channel_Transition'
  | 'Channel_Wndup'
  | 'Death'
  | 'Laugh'
  | 'Recall_Winddown'
  | 'Stunned'
  | 'reksai_spell2_unburrow'
  | 'reksai_run_burrowed'
  | 'reksai_idle01_burrowed'
  | 'reksai_spell2'
  | 'Spell1'
  | 'Run-90'
  | 'Run90'
  | 'Spell3'
  | 'Attack1'
  | 'Attack2'
  | 'Attack4'
  | 'Attack3'
  | 'Spell1B'
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
  | 'KnockUp'
  | 'Run_Slow'
  | 'Tail-30'
  | 'Tail0'
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
        <primitive object={nodes.Mini_Root} />
        <primitive object={nodes.Jetski} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-170.56, -129.98, -256.04]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Frog}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.JetSki}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.RekSai_PoolParty_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
