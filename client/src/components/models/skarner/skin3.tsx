import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_CHEST_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    L_TREADS: THREE.MeshBasicMaterial
    BODY: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'skarner_skin03_attack1'
  | 'skarner_skin03_attack2'
  | 'skarner_skin03_attack3'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'skarner_skin03_spell4_idle'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell4_Backstep'
  | 'Spell3_Base'
  | 'skarner_skin03_spell4_rev_impale'
  | 'skarner_skin03_spell4_w'
  | 'skarner_skin03_spell4_q'
  | 'Spell4_Dance_IN'
  | 'Taunt'
  | 'Buffbones_Idle'
  | 'Run_In'
  | 'Idle_In'
  | 'Dance_In'
  | 'Spell3_Upper'
  | 'Spell4'
  | 'Dance_Loop'
  | 'Attack_Turret1'
  | 'Attack_Turret2'
  | 'Run_Haste'
  | 'skarner_skin03_run2'
  | 'skarner_skin03_spell2'
  | 'Spell1_Upper'
  | 'skarner_skin03_spell1'
  | 'skarner_skin03_run3'
  | 'Run90'
  | 'Run-90'
  | 'skarner_skin03_run4'
  | 'Spell4_Dance_Loop'
  | 'skarner_skin03_crit'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Recall_Winddown'
  | 'Spell42IdleBack_Trans'
  | 'Respawn'
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
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CHEST_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <group position={[-139, 0.33, -140.42]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.L_TREADS}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.BODY}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
