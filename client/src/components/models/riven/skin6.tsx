import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    WEAPON: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Buffbones_Cstm_Swords: THREE.Bone
  }
  materials: {
    riven_Arcade: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'riven_attack1'
  | 'riven_attack1_ult'
  | 'riven_attack2'
  | 'riven_attack2_ult'
  | 'riven_attack3'
  | 'Channel_Base'
  | 'riven_channel_windup'
  | 'Crit_Base'
  | 'riven_crit'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'riven_idle1_ult'
  | 'Idle2_Base'
  | 'riven_idle3'
  | 'riven_laugh'
  | 'riven_spell1a'
  | 'riven_spell1b'
  | 'riven_spell1c'
  | 'riven_spell2'
  | 'Spell3_Base'
  | 'riven_spell4a'
  | 'riven_spell4b'
  | 'Taunt_Base'
  | 'riven_joke'
  | 'Run_Base'
  | 'riven_run_ult'
  | 'riven_skin05_recall_winddown'
  | 'Idle1_Hair'
  | 'Run_Hair'
  | 'riven_skin05_run_hair'
  | 'Attack1_Hair'
  | 'Attack2_Hair'
  | 'Attack1_ULT_Hair'
  | 'Attack3_Hair'
  | 'Crit_Hair'
  | 'Dance_Hair'
  | 'Death_Hair'
  | 'Idle1_Ult_Hair'
  | 'Idle2_Hair'
  | 'Idle3_Hair'
  | 'Joke_Hair'
  | 'Laugh_Hair'
  | 'Spell1a_Hair'
  | 'Spell1c_Hair'
  | 'Spell1b_Hair'
  | 'Taunt_Hair'
  | 'Channel_Hair'
  | 'riven_skin05_channel_windup_hair'
  | 'Spell2_Hair'
  | 'Spell3_Hair'
  | 'Spell4a_Hair'
  | 'Spell4b_Hair'
  | 'Recall'
  | 'Recall_Leadout'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.WEAPON} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Buffbones_Cstm_Swords} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.riven_Arcade}
        skeleton={nodes.mesh_0.skeleton}
        position={[-44.29, -2.13, -13]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
