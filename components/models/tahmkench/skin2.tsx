import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Hat2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    TahmKench_Skin02_MAT: THREE.MeshBasicMaterial
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
  | 'tahmkench_run_aggro'
  | 'IdleIn'
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
  | 'Respawn'
  | 'Joke'
  | 'Spell1_Alt_Out_ToIdle'
  | 'Spell1_Out_ToIdle'
  | 'Spell1_Alt_Up'
  | 'Spell1_Up'
  | 'tahmkench_spell2_channel.tahmkench_rework'
  | 'spell2_channel_arrive.tahmkench_rework'
  | 'tahmkench_spell4_alt.tahmkench_rework'
  | 'tahmkench_spell4_alt_short.tahmkench_rework'
  | 'tahmkench_spell4_cast2.tahmkench_rework'
  | 'tahmkench_spell4_long.tahmkench_rework'
  | 'Spell4_Short'
  | 'tahmkench_run_spell2'
  | 'tahmkench_run_spell2_fast'
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
        <primitive object={nodes.Snap_Hat2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.TahmKench_Skin02_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-177.35, -3.87, -158.71]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
