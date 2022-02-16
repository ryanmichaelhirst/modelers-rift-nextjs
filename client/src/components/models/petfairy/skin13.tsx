import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Flower_Root: THREE.Bone
    Tail3_Snap: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Weapon_1: THREE.Bone
  }
  materials: {
    Eye_Default: THREE.MeshBasicMaterial
    Body_MAT: THREE.MeshBasicMaterial
    Flower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'petfairy_idle1.littlelegends_10_10'
  | 'Taunt'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Joke'
  | 'Interact'
  | 'Run_Haste'
  | 'Dance'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'petfairy_damage.littlelegends_10_10'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'petfairy_idle2.littlelegends_10_10'
  | 'Celebrate_to_Idle'
  | 'petfairy_greeting_to_idle.littlelegends_10_10'
  | 'petfairy_joke.littlelegends_10_10'
  | 'petfairy_cast_to_idle.littlelegends_10_10'
  | 'Recall'
  | 'petfairy_dance.littlelegends_10_10'
  | 'petfairy_taunt.littlelegends_10_10'
  | 'petfairy_dive_out_to_idle.littlelegends_10_10'
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
        <primitive object={nodes.Flower_Root} />
        <primitive object={nodes.Tail3_Snap} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Weapon_1} />
      </group>
      <group position={[-224.41, 0, -261.51]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Eye_Default}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Flower}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
