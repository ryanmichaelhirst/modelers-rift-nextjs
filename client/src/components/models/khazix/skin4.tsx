import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    R_Buffbone_Cstm_Recall: THREE.Bone
    L_Buffbone_Cstm_Recall: THREE.Bone
  }
  materials: {
    Arms: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'khazix_attack_passive'
  | 'Attack2'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Evo2E'
  | 'Evo2Q'
  | 'Evo2R'
  | 'Evo2W'
  | 'khazix_evo_overrides'
  | 'khazix_bbs'
  | 'Joke'
  | 'KnockUp'
  | 'Laugh'
  | 'khazix_runheadtwitch'
  | 'khazix_runwingjitter'
  | 'khazix_channel_loop'
  | 'khazix_channel_transition'
  | 'khazix_dance1'
  | 'khazix_dance2'
  | 'khazix_idle1'
  | 'khazix_idle2'
  | 'khazix_idle3'
  | 'khazix_idle4'
  | 'khazix_idle_leadin1'
  | 'khazix_idle_leadin2'
  | 'khazix_idle_leadin3'
  | 'khazix_recall_loop'
  | 'khazix_recall_windup'
  | 'khazix_run'
  | 'khazix_runfly'
  | 'khazix_runfast1'
  | 'khazix_runfastfly'
  | 'khazix_runfast2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'khazix_runbrush'
  | 'Spell1'
  | 'Spell1_Evo'
  | 'Spell2'
  | 'Spell2_Evo'
  | 'Spell3'
  | 'Spell3_Evo'
  | 'Spell3_Evo_Landing'
  | 'Spell3_Landing'
  | 'Spell3_Standup'
  | 'Taunt'
  | 'Spell3_Evo_Standup'
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
        <primitive object={nodes.R_Buffbone_Cstm_Recall} />
        <primitive object={nodes.L_Buffbone_Cstm_Recall} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Arms}
        skeleton={nodes.mesh_0.skeleton}
        position={[-137.48, -0.85, -141.59]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
