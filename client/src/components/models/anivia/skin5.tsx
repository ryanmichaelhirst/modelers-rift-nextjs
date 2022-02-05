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
    Egg: THREE.Bone
    Egg_Mid: THREE.Bone
    Egg_Top: THREE.Bone
    R_Wing_Break2: THREE.Bone
    Body_Break: THREE.Bone
    R_Wing_Break1: THREE.Bone
    Head_Break: THREE.Bone
    Hips_Break: THREE.Bone
    L_Wing_Break1: THREE.Bone
    L_Wing_Break2: THREE.Bone
    Tail_Break: THREE.Bone
    Tail_Tassel_Break: THREE.Bone
    R_Leg_Break: THREE.Bone
    L_Leg_Break: THREE.Bone
  }
  materials: {
    Anivia_BlackIce_Main: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke'
  | 'anivia_blackice_run'
  | 'Taunt_Base'
  | 'anivia_blackice_laugh'
  | 'Attack1'
  | 'Attack2'
  | 'Spell3'
  | 'anivia_blackice_idle1'
  | 'Death_Egg'
  | 'Revive'
  | 'Death'
  | 'anivia_blackice_idle1_1flap'
  | 'anivia_blackice_run_glide'
  | 'anivia_blackice_idle3'
  | 'anivia_blackice_run_1flap'
  | 'anivia_blackice_idle1_enter'
  | 'anivia_blackice_run_enter'
  | 'anivia_blackice_idle1_glide'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'anivia_blackice_spell1l'
  | 'anivia_blackice_spell1r'
  | 'anivia_blackice_spell2l'
  | 'anivia_blackice_spell2r'
  | 'Respawn'
  | 'Spell1_Left'
  | 'Spell1_Leftback'
  | 'Spell1_Right'
  | 'Spell1_Rightback'
  | 'Blackice_Joke'
  | 'anivia_blackice_dance_in'
  | 'anivia_blackice_dance_loop'
  | 'Egg_Below'
  | 'anivia_blackice_taunt'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Egg} />
        <primitive object={nodes.Egg_Mid} />
        <primitive object={nodes.Egg_Top} />
        <primitive object={nodes.R_Wing_Break2} />
        <primitive object={nodes.Body_Break} />
        <primitive object={nodes.R_Wing_Break1} />
        <primitive object={nodes.Head_Break} />
        <primitive object={nodes.Hips_Break} />
        <primitive object={nodes.L_Wing_Break1} />
        <primitive object={nodes.L_Wing_Break2} />
        <primitive object={nodes.Tail_Break} />
        <primitive object={nodes.Tail_Tassel_Break} />
        <primitive object={nodes.R_Leg_Break} />
        <primitive object={nodes.L_Leg_Break} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Anivia_BlackIce_Main}
        skeleton={nodes.mesh_0.skeleton}
        position={[-150.51, -39.76, -83.24]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
