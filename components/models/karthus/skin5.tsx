import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Book2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Karthus: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'karthus_laugh'
  | 'Run_Base'
  | 'karthus_spell2'
  | 'Spell4'
  | 'Spell4_Loop'
  | 'Taunt_Base'
  | 'karthus_idle_in'
  | 'Idle_Passive'
  | 'Attack2'
  | 'Spell1_A'
  | 'Spell1_B'
  | 'Spell1_C'
  | 'karthus_run'
  | 'Run_In'
  | 'Recall'
  | 'Recall_Leadout'
  | 'karthus_passive_spell4'
  | 'karthus_passive_spell1'
  | 'karthus_spell1a'
  | 'Dance_In'
  | 'karthus_spell1_b'
  | 'karthus_spell1_c'
  | 'karthus_joke'
  | 'Run_Haste'
  | 'Spell3'
  | 'Idle2_Base'
  | 'karthus_passive_spell2'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Book2World} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Karthus}
        skeleton={nodes.mesh_0.skeleton}
        position={[-93.66, 8.65, -54.29]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
