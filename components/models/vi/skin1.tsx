import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Teacup: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Vi_Racer_MD_lambert8: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'vi_attack1'
  | 'vi_attack2'
  | 'vi_spell2'
  | 'vi_attack3'
  | 'Channel_Base'
  | 'Channel_Wndup'
  | 'Death'
  | 'Crit_Base'
  | 'vi_spell1'
  | 'vi_spell1_run'
  | 'vi_spell4_hit'
  | 'vi_spell4_run'
  | 'vi_idle_in'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Spell3_Base'
  | 'vi_idle1_in_b'
  | 'vi_run1'
  | 'vi_run1_in'
  | 'vi_attack_afterult'
  | 'vi_spell2_a'
  | 'vi_spell1_idle'
  | 'vi_spell1_idleintro'
  | 'Dance_Base'
  | 'vi_dance_in'
  | 'vi_idle1_in_c'
  | 'vi_joke'
  | 'vi_joke2'
  | 'vi_laugh'
  | 'Taunt_Base'
  | 'Spell4'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'Idle_Gloves_Closed'
  | 'Attack3_Gloves'
  | 'Spell1_IdleIntro_Gloves'
  | 'Spell1_Idle_Gloves'
  | 'vi_run2'
  | 'vi_run2_in'
  | 'Attack1_Gloves'
  | 'Attack2_Gloves'
  | 'Channel_Gloves'
  | 'Crit_Gloves'
  | 'Shake_Gloves'
  | 'vi_spell4'
  | 'Spell2_Gloves'
  | 'Spell2_A_Gloves'
  | 'Spell4_hit_Gloves'
  | 'vi_racer_glassesoff'
  | 'vi_racer_glasseson'
  | 'GlassesOff_In'
  | 'GlassesOn_In'
  | 'vi_racer_glassesoff_in'
  | 'vi_racer_glasseson_in'
  | 'Stunned'
  | 'vi_idle1'
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
        <primitive object={nodes.Teacup} />
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Vi_Racer_MD_lambert8}
        skeleton={nodes.mesh_0.skeleton}
        position={[-66.38, -1.45, -20.62]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
