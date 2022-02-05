import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    L_arm_helper: THREE.Bone
    R_Arm_helper: THREE.Bone
    weapon: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    blinn2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tryndamere_attack1'
  | 'tryndamere_attack2'
  | 'Channel_Base'
  | 'tryndamere_skin06_channel_windup'
  | 'Crit_Base'
  | 'Death_Base'
  | 'Idle2_Base'
  | 'tryndamere_skin06_idle3'
  | 'tryndamere_skin06_idle4'
  | 'tryndamere_laugh'
  | 'tryndamere_spell1'
  | 'tryndamere_spell2'
  | 'Spell3'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'tryndamere_joke'
  | 'tryndamere_run_rage'
  | 'tryndamere_skin06_attack1'
  | 'Attack2_Beard'
  | 'tryndamere_skin06_crit'
  | 'Dance_Base'
  | 'tryndamere_skin06_death'
  | 'Idle1_Base'
  | 'Joke_Beard'
  | 'Laugh_Beard'
  | 'tryndamere_skin06_recall'
  | 'tryndamere_skin06_recall_leadout'
  | 'tryndamere_skin06_recall_winddown'
  | 'Run_Base'
  | 'tryndamere_skin06_run_rage'
  | 'Spell1_Beard'
  | 'Spell2_Beard'
  | 'tryndamere_skin06_spell4'
  | 'Idle1_Beard'
  | 'Idle2_Beard'
  | 'Idle3_Beard'
  | 'Idle4_Beard'
  | 'Run_Beard'
  | 'Taunt_Beard'
  | 'Dance_Beard'
  | 'Channel_Beard'
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
        <primitive object={nodes.L_arm_helper} />
        <primitive object={nodes.R_Arm_helper} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-82.09, -0.09, -37.35]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
