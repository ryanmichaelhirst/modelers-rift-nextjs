import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Pelvis: THREE.Bone
    Weapon: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Spine_Halo: THREE.Bone
  }
  materials: {
    Jayce_Skin04_mat1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'jayce_melee_idle1'
  | 'jayce_melee_idle2'
  | 'jayce_melee_idle3'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Ranged_Spell1'
  | 'jayce_ranged_spell2_attack2'
  | 'Ranged_Spell3'
  | 'jayce_ranged_spell1'
  | 'Ranged_Attack1'
  | 'Ranged_Attack2'
  | 'jayce_ranged_attack1'
  | 'Run_Fast'
  | 'jayce_ranged_run1'
  | 'jayce_ranged_run2'
  | 'Ranged_Spell2_Attack1'
  | 'Ranged_Spell2_Attack2'
  | 'Melee_Passive'
  | 'Ranged_Passive'
  | 'Joke'
  | 'Taunt'
  | 'jayce_ranged_idle1'
  | 'jayce_ranged_idle2'
  | 'jayce_ranged_idle3'
  | 'jayce_dance_loop'
  | 'jayce_dance_windup'
  | 'Recall_Loop'
  | 'Recall_Windup'
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
        <primitive object={nodes.Pelvis} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Spine_Halo} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jayce_Skin04_mat1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-88, -53.11, -158.87]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
