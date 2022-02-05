import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Pot: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Hat2World: THREE.Bone
  }
  materials: {
    Skin01_Prop_Mat: THREE.MeshBasicMaterial
    Skin01_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle_Aggro'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell3'
  | 'Taunt'
  | 'tahmkench_run_haste'
  | 'tahmkench_run_slow'
  | 'tahmkench_skin01_run_aggro'
  | 'Attack3'
  | 'Spit'
  | 'Recall'
  | 'tahmkench_spell1'
  | 'tahmkench_spell1_alt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell1_Alt_Out'
  | 'Spell1_Out'
  | 'Idle_Aggro_toIdle'
  | 'Idlein_Aggro'
  | 'Joke'
  | 'Spell1_Alt_Out_ToIdle'
  | 'Spell1_Out_ToIdle'
  | 'Spell1_Alt_Up'
  | 'Spell1_Up'
  | 'spell2_channel_arrive.tahmkench_rework'
  | 'IdleIn'
  | 'tahmkench_run_spell4.tahmkench_rework'
  | 'tahmkench_run_spell4_fast.tahmkench_rework'
  | 'tahmkench_spell2_channel.tahmkench_rework'
  | 'tahmkench_spell4_alt.tahmkench_rework'
  | 'tahmkench_spell4_alt_short.tahmkench_rework'
  | 'tahmkench_spell4_cast2.tahmkench_rework'
  | 'tahmkench_spell4_long.tahmkench_rework'
  | 'Spell4_Short'
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
        <primitive object={nodes.Pot} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Hat2World} />
      </group>
      <group position={[-177.41, -3.28, -149.29]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin01_Prop_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin01_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
