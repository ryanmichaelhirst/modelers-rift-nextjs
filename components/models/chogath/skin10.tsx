import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_CSTM_L_MISSILE_1: THREE.Bone
    BUFFBONE_CSTM_L_MISSILE_2: THREE.Bone
    BUFFBONE_CSTM_R_MISSILE_2: THREE.Bone
    BUFFBONE_CSTM_R_MISSILE_1: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    chogath_battlecast_MD_blinn3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Laugh'
  | 'Run'
  | 'Run1'
  | 'Run2'
  | 'Run3'
  | 'Run4'
  | 'Run5'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'Idle1'
  | 'chogath_battlecast_recall_loop'
  | 'chogath_battlecast_recall_windup'
  | 'Crit'
  | 'Attack1'
  | 'Recall_Winddown'
  | 'VorpalSpikes'
  | 'VorpalShoulder'
  | 'Run6'
  | 'Spell4'
  | 'Stacked'
  | 'Dance'
  | 'Joke'
  | 'Attack2'
  | 'Death'
  | 'Idle2'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_L_MISSILE_1} />
        <primitive object={nodes.BUFFBONE_CSTM_L_MISSILE_2} />
        <primitive object={nodes.BUFFBONE_CSTM_R_MISSILE_2} />
        <primitive object={nodes.BUFFBONE_CSTM_R_MISSILE_1} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.chogath_battlecast_MD_blinn3}
        skeleton={nodes.mesh_0.skeleton}
        position={[-156.97, -1.6, -287.74]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
