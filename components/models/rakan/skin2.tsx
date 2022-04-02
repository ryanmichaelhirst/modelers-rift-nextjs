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
    Root: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Wing3_Ground: THREE.Bone
    Wing_A2_Ground: THREE.Bone
    Wing_B2_Ground: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    MirrorRoot: THREE.Bone
  }
  materials: {
    Skin02_Body_MAT: THREE.MeshBasicMaterial
    Skin02_Wing_MAT: THREE.MeshBasicMaterial
    Mirror_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Duo_Recall'
  | 'Duo_Recall_Unto'
  | 'Duo_Recall_Ready'
  | 'Idle1_Base'
  | 'Idle1_variant1'
  | 'Idle1_variant2'
  | 'Idlein_2'
  | 'rakan_duo_dance_loop'
  | 'rakan_duo_dance_into'
  | 'rakan_dance_into'
  | 'rakan_dance_loop'
  | 'Run_Fast'
  | 'Run_Haste_Into'
  | 'Run_Haste_Out'
  | 'Run_Slow'
  | 'Run_Variant1'
  | 'Run_Variant2'
  | 'RunBase'
  | 'Spell1_B'
  | 'Spell1_To_Run'
  | 'Spell1_To_Walk'
  | 'Spell1_To_Idle'
  | 'Spell2_A'
  | 'Spell2_B'
  | 'rakan_w_exit_to_fast_run'
  | 'rakan_w_exit_to_run'
  | 'rakan_w_exit_to_idle'
  | 'Spell3_To_Run'
  | 'Spell3_To_Idle'
  | 'Spell4_Idle'
  | 'Spell4_Run'
  | 'Spell4_Charm1'
  | 'Spell4_Charm2'
  | 'Spell4_Charm3'
  | 'Spell4_Idlein'
  | 'Spell4_Into'
  | 'Taunt_loop'
  | 'taunt_wndup'
  | 'Attack1'
  | 'Attack2'
  | 'Death'
  | 'Idle_In'
  | 'Joke'
  | 'Laugh'
  | 'Melee_Attack1'
  | 'Melee_Attack2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Haste'
  | 'Run_Injured'
  | 'Spell1'
  | 'Spell3'
  | 'rakan_skin02_duo_recall'
  | 'rakan_skin02_duo_recall_into'
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
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Wing3_Ground} />
        <primitive object={nodes.Wing_A2_Ground} />
        <primitive object={nodes.Wing_B2_Ground} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.MirrorRoot} />
      </group>
      <group position={[-107.41, -5.84, -89.97]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin02_Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin02_Wing_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Mirror_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
