import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Xmas_Pole_Skin07: THREE.Bone
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Katarina_Skin07_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Candycane_Below'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Taunt'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke'
  | 'Run2'
  | 'Spell3'
  | 'Spell4'
  | 'Idle2'
  | 'Spell2_Throw'
  | 'RunHaste'
  | 'Idle_In'
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
        <primitive object={nodes.Xmas_Pole_Skin07} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Katarina_Skin07_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-40.8, -10.39, -53.75]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
