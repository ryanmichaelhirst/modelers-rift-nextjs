import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
  }
  materials: {
    EliseSpider_SKT_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Run_Base'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'elisespider_idle1'
  | 'elisespider_idle1_in'
  | 'KnockedUp'
  | 'Spell1'
  | 'elisespider_spell3_c'
  | 'elisespider_spell3_d'
  | 'elisespider_spell3_e'
  | 'Stunned'
  | 'elisespider_recall_loop'
  | 'elisespider_recall_wndup'
  | 'elisespider_run1'
  | 'Attack3'
  | 'Crit'
  | 'elisespider_joke'
  | 'elisespider_laugh'
  | 'elisespider_taunt'
  | 'Spell2'
  | 'Death'
  | 'elisespider_idle2'
  | 'elisespider_idle3'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.EliseSpider_SKT_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-118.07, 7.41, -128.9]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
