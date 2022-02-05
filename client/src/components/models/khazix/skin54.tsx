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
    Buffbone_Cstm_Healthbar: THREE.Bone
    R_Flag_Base: THREE.Bone
    L_Flag_Base: THREE.Bone
  }
  materials: {
    Khazix_Championship_MAT: THREE.MeshBasicMaterial
    Khazix_Skin11_Recall_RiotLogo_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'khazix_channel_loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'khazix_dance1'
  | 'Death'
  | 'khazix_idle1'
  | 'Laugh'
  | 'khazix_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'khazix_evo_overrides'
  | 'Evo2E'
  | 'khazix_attack_passive'
  | 'Evo2Q'
  | 'Evo2W'
  | 'Evo2R'
  | 'khazix_idle2'
  | 'Joke'
  | 'Recall'
  | 'KnockUp'
  | 'khazix_runfast1'
  | 'khazix_runfast2'
  | 'khazix_runbrush'
  | 'Spell1_Evo'
  | 'Spell2_Evo'
  | 'Spell3_Evo'
  | 'khazix_runwingjitter'
  | 'khazix_idle3'
  | 'khazix_runheadtwitch'
  | 'khazix_idle_leadin1'
  | 'khazix_idle_leadin2'
  | 'khazix_idle_leadin3'
  | 'khazix_idle4'
  | 'khazix_runfastfly'
  | 'khazix_runfly'
  | 'Spell3_Evo_Landing'
  | 'Spell3_Evo_Standup'
  | 'Spell3_Landing'
  | 'Spell3_Standup'
  | 'khazix_channel_transition'
  | 'khazix_bbs'
  | 'khazix_dance2'
  | 'Spawn'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.R_Flag_Base} />
        <primitive object={nodes.L_Flag_Base} />
      </group>
      <group position={[-155.99, -74.2, -149.07]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Khazix_Championship_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Khazix_Skin11_Recall_RiotLogo_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
