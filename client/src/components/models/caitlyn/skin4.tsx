import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Teacup_Root: THREE.Bone
    Flag_StickTip: THREE.Bone
    Rifle_World_Snap: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Flag: THREE.MeshBasicMaterial
    Teacup: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'run.caitlyn_art_sustainability_update'
  | 'Passive'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4_0'
  | 'Taunt'
  | 'Run_Homeguard'
  | 'Spell2_To_Run'
  | 'Spell4_To_Run'
  | 'Spell3_To_Run'
  | 'Spell3_To_Idle'
  | 'run_fast.caitlyn_art_sustainability_update'
  | 'Attack_to_run'
  | 'Idle_In'
  | 'Run_Haste'
  | 'Attack1_To_Idle'
  | 'passive_to_idle.caitlyn_art_sustainability_update'
  | 'attack_to_run.caitlyn_art_sustainability_update'
  | 'Attack2_To_Idle'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'run_variant.caitlyn_art_sustainability_update'
  | 'run_fast_variant.caitlyn_art_sustainability_update'
  | 'Spell2_To_Idle'
  | 'knockup_start.caitlyn_art_sustainability_update'
  | 'KnockUp_Loop'
  | 'Stunned'
  | 'Spawn'
  | 'Respawn'
  | 'Dance_In'
  | 'Recall'
  | 'run_variant2.caitlyn_art_sustainability_update'
  | 'Recall_Winddown'
  | 'run_in.caitlyn_art_sustainability_update'
  | 'run_in_90.caitlyn_art_sustainability_update'
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
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Teacup_Root} />
        <primitive object={nodes.Flag_StickTip} />
        <primitive object={nodes.Rifle_World_Snap} />
      </group>
      <group position={[-60.39, 0.02, -93.74]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Flag} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Teacup}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
