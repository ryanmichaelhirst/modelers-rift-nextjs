import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Tail_1_Ground: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_R_Wing2World: THREE.Bone
    Snap_L_Wing2World: THREE.Bone
    Snap_L_Shoulder2World: THREE.Bone
  }
  materials: {
    Galio_Debonair_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_Passive'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'IdleIn'
  | 'Joke'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Spell1_To_Run'
  | 'galio_spell2_idle'
  | 'galio_spell2_run'
  | 'Spell2_Idle_Cast'
  | 'Spell2_Run_Cast'
  | 'Spell2_TRA'
  | 'Spell3_Hit'
  | 'Spell3_Windup'
  | 'Spell4_In'
  | 'Spell4_Out'
  | 'Spell4_Channel'
  | 'Spell4_Short'
  | 'Spell4_Short_IN'
  | 'Spell4_Short_OUT'
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
        <primitive object={nodes.Tail_1_Ground} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_R_Wing2World} />
        <primitive object={nodes.Snap_L_Wing2World} />
        <primitive object={nodes.Snap_L_Shoulder2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Galio_Debonair_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-120.08, -2.28, -184.79]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
