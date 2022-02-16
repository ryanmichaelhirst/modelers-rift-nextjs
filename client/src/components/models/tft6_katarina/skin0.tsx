import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Katarina_Skin12_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Idle1'
  | 'Celebration'
  | 'tft6_katarina_spell_aoe.tft_set6'
  | 'tft6_katarina_spell_blink.tft_set6'
  | 'tft6_katarina_spell_in.tft_set6'
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
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Katarina_Skin12_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-40.42, -13.72, -61.49]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
