import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Mystic_Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lux_skin07_run_homeguard'
  | 'Dance_Intro'
  | 'lux_skin07_recall_beginningall'
  | 'Dance_Loop'
  | 'Channel'
  | 'Run_Haste'
  | 'Run_Homeguard_IN'
  | 'lux_skin07_idle1'
  | 'Attack1'
  | 'Attack3'
  | 'Attack2'
  | 'Run_Variation'
  | 'Crit'
  | 'Idle3'
  | 'Idle2'
  | 'Idle1'
  | 'Respawn'
  | 'Idle4'
  | 'Channel_Wndup'
  | 'Transform_Mystic'
  | 'Recall_Winddown'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Laugh'
  | 'Idle_In'
  | 'Spell4'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'Run_Slow'
  | 'lux_skin07_recall_exit_mystic'
  | 'Run_Base'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Mystic_Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-63.94, -0.92, -45.3]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
