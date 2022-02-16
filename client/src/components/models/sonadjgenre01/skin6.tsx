import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Weapon: THREE.Bone
    Back_Speakers: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Zero_Loc: THREE.Bone
  }
  materials: {
    Base: THREE.MeshBasicMaterial
    Holo: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sona_skin06_attack1'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'sona_skin06_dance'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'sona_skin06_joke'
  | 'sona_skin06_laugh'
  | 'Run_Base'
  | 'Spell1_Upper'
  | 'sona_skin06_spell2'
  | 'Spell3_Upper'
  | 'sona_skin06_spell4'
  | 'sona_skin06_taunt'
  | 'sona_skin06_deckeffects'
  | 'sona_skin06_attack2'
  | 'sona_skin06_run_in'
  | 'sona_skin06_idle_in'
  | 'Recall'
  | 'Channel_In'
  | 'Turn_0'
  | 'Turn_90'
  | 'Turn_-90'
  | 'Turn_180'
  | 'Turn_-180'
  | 'sona_skin06_respawn_windup'
  | 'sona_skin06_transition_in'
  | 'sona_skin06_transition_out'
  | 'Respawn_Loop'
  | 'sona_skin06_respawn_to_run'
  | 'sona_skin06_run_haste'
  | 'Recall_Leadout'
  | 'sona_skin06_joke_holograms'
  | 'sona_skin06_death_holograms'
  | 'sona_skin06_respawn_windup_holograms'
  | 'sona_skin06_transition_out_holograms'
  | 'sona_skin06_transition_in_holograms'
  | 'sona_skin06_taunt_holograms'
  | 'sona_skin06_spell1'
  | 'sona_skin06_spell3'
  | 'Crit_Low'
  | 'sona_skin06_recall_winddown'
  | 'sona_skin06_idle1_tt'
  | 'sona_skin06_tt_runidle_tran'
  | 'Death_Low'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Back_Speakers} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Zero_Loc} />
      </group>
      <group position={[-105.22, -2.91, -230.42]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Base} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Holo} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
