import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    L_Sword: THREE.Bone
    R_Sword: THREE.Bone
    Smear_Sword: THREE.Bone
    Smear_Sword2: THREE.Bone
  }
  materials: {
    Zed_Main_Mat: THREE.MeshBasicMaterial
    Smear1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_attack1'
  | 'zed_crit'
  | 'Death'
  | 'zed_idle1'
  | 'zed_idle2'
  | 'zed_idle3'
  | 'Laugh'
  | 'zed_run'
  | 'Run_Fast'
  | 'zed_spell1'
  | 'Spell2'
  | 'zed_spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Joke'
  | 'Run_Haste'
  | 'zed_idle_leadin1'
  | 'zed_run_leadin'
  | 'zed_idle4'
  | 'Channel_Wndup'
  | 'zed_channel_leadin'
  | 'zed_channel'
  | 'zed_dance_leadin'
  | 'zed_dance'
  | 'Joke_KG_Loss'
  | 'Joke_KG_Win'
  | 'zed_idle_leadin2'
  | 'zed_idle_leadin3'
  | 'Spell4_Strike'
  | 'zed_attack_spell4'
  | 'zed_attack2_part1'
  | 'zed_attack2'
  | 'zed_spell2_cast'
  | 'Spawn'
  | 'Recall_Winddown'
  | 'Recall'
  | 'zed_attack_passive'
  | 'zed_taunt_kg'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.L_Sword} />
        <primitive object={nodes.R_Sword} />
        <primitive object={nodes.Smear_Sword} />
        <primitive object={nodes.Smear_Sword2} />
      </group>
      <group position={[-83.74, 0.03, -45.19]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Zed_Main_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Smear1}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
