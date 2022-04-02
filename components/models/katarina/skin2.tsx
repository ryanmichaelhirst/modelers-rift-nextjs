import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Katarina_Skin02_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
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
  | 'Recall'
  | 'Run2'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Idle2'
  | 'katarina_spell3'
  | 'katarina_crit'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Katarina_Skin02_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-40.81, -8.72, -56.42]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
