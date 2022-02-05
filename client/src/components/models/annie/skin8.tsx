import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    R_Teddy: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Bear_Shoulder: THREE.Bone
    L_Bear_Elbow: THREE.Bone
    L_Bear_Hip: THREE.Bone
    R_Bear_Elbow: THREE.Bone
    R_Bear_Shoulder: THREE.Bone
    R_Bear_Hip: THREE.Bone
    Bear_Spine1: THREE.Bone
    Bear_Spine2: THREE.Bone
    Bear_Head: THREE.Bone
    Bear_Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Cstm_Buffbone_Idle_Fire: THREE.Bone
  }
  materials: {
    AnniePanda_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'annie_2012_dance'
  | 'Death'
  | 'annie_2012_idle1'
  | 'annie_2012_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'annie_2012_taunt'
  | 'annie_2012_idle_enter'
  | 'annie_2012_joke'
  | 'annie_2012_recall'
  | 'annie_2012_recall_idle'
  | 'Panda'
  | 'annie_panda_recall'
  | 'Recall_Winddown'
  | 'annie_2012_dance_loop'
  | '2012_Channel'
  | '2012_Channel_Windup'
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
        <primitive object={nodes.R_Teddy} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Bear_Shoulder} />
        <primitive object={nodes.L_Bear_Elbow} />
        <primitive object={nodes.L_Bear_Hip} />
        <primitive object={nodes.R_Bear_Elbow} />
        <primitive object={nodes.R_Bear_Shoulder} />
        <primitive object={nodes.R_Bear_Hip} />
        <primitive object={nodes.Bear_Spine1} />
        <primitive object={nodes.Bear_Spine2} />
        <primitive object={nodes.Bear_Head} />
        <primitive object={nodes.Bear_Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Cstm_Buffbone_Idle_Fire} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.AnniePanda_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-321.66, -1.38, -53.68]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
