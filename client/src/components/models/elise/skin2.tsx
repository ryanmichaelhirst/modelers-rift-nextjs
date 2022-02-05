import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    R_Spider: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Root: THREE.Bone
    L_Spider: THREE.Bone
    L_Web2: THREE.Bone
    L_Web1: THREE.Bone
    R_Web2: THREE.Bone
    R_Web1: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Elise_Skin02_spiders_MAT: THREE.MeshBasicMaterial
    Elise_Skin02_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'elise_skin02_recall'
  | 'Skin02_Recall'
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'elise_idle1'
  | 'elise_idle2'
  | 'elise_idle3'
  | 'Spell1'
  | 'Channel_Wndup'
  | 'elise_idle1_in'
  | 'KnockedUp'
  | 'elise_recall'
  | 'elise_recall2'
  | 'elise_run1'
  | 'Stunned'
  | 'Spell3'
  | 'Attack3'
  | 'elise_dance_in'
  | 'elise_dance'
  | 'Crit'
  | 'elise_joke'
  | 'elise_laugh'
  | 'Run'
  | 'Recall_Winddown'
  | 'Death'
  | 'Spell2'
  | 'elise_run1_wndup'
  | 'elise_idle4'
  | 'elise_taunt'
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
        <primitive object={nodes.R_Spider} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_Spider} />
        <primitive object={nodes.L_Web2} />
        <primitive object={nodes.L_Web1} />
        <primitive object={nodes.R_Web2} />
        <primitive object={nodes.R_Web1} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-123.89, -2.34, -60.25]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Elise_Skin02_spiders_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Elise_Skin02_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
