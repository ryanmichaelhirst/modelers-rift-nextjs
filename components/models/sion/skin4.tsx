import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Sion: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Death'
  | 'Joke'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Attack2'
  | 'sion_spell4_run'
  | 'Run'
  | 'Attack1'
  | 'Idle1_Base'
  | 'Spell1_Chrg'
  | 'Passive_Attack1'
  | 'Passive_Attack2'
  | 'Passive_Idle1'
  | 'sion_passive_run'
  | 'Spell1_Hit1'
  | 'Spell1_Hit2'
  | 'Idle_In'
  | 'Attack3'
  | 'Run_Fast'
  | 'Attack_Tower'
  | 'Run_Haste'
  | 'Passive_Death'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Stunned'
  | 'sion_passive_run_in'
  | 'Laugh'
  | 'sion_knockedup'
  | 'Passive_Dash'
  | 'Recall'
  | 'Spell4'
  | 'Spell4_Hit'
  | 'Attack_Tower2'
  | 'Spell2_B'
  | 'Spell4_RunIn'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Idle2_Base'
  | 'Dance_Spin'
  | 'Spell4_Stop'
  | 'Run_Slow'
  | 'KnockedUp_In'
  | 'Passive_Dance_IN'
  | 'sion_dance_spin'
  | 'Passive_Dance_LOOP'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sion}
        skeleton={nodes.mesh_0.skeleton}
        position={[-132.08, -1.2, -69.83]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
