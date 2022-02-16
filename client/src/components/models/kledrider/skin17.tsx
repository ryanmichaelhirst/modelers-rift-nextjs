import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Gun2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
    Mini_Root: THREE.Bone
    RecallFace: THREE.Bone
  }
  materials: {
    Kled: THREE.MeshBasicMaterial
    Frog: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Death'
  | 'rider_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Joke'
  | 'Attack2'
  | 'Spell3'
  | 'Spell2'
  | 'Idle1'
  | 'Attack1'
  | 'rider_run2'
  | 'Mount_Off'
  | 'Mount_Off_to_Run'
  | 'Mount_On'
  | 'Spell2_1'
  | 'rider_spell2_3'
  | 'Spell2_2'
  | 'Spell2_3'
  | 'Recall'
  | 'Laugh_Loop'
  | 'rider_taunt'
  | 'rider_dance'
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
        <primitive object={nodes.Snap_Gun2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.Mini_Root} />
        <primitive object={nodes.RecallFace} />
      </group>
      <group position={[-45.25, -16.29, -68.44]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Kled} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Frog} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
