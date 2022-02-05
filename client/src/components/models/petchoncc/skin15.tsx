import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Food1: THREE.Bone
    Food2: THREE.Bone
    Food3: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Weapon_1: THREE.Bone
  }
  materials: {
    EyeDefault: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Food_Veggie: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'petchoncc_idle1.littlelegends_10_19'
  | 'TauntIntro'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Joke'
  | 'petchoncc_interact.littlelegends_10_19'
  | 'Laugh'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'petchoncc_castloop.littlelegends_10_19'
  | 'petchoncc_damaged.littlelegends_10_19'
  | 'Death_Intro'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'petchoncc_castloop_intro.littlelegends_10_19'
  | 'petchoncc_dive_out_to_idle.littlelegends_10_19'
  | 'petchoncc_greeting_to_idle.littlelegends_10_19'
  | 'Death_Loop'
  | 'petchoncc_damged_to_idle.littlelegends_10_19'
  | 'TauntLoop'
  | 'Celebrate_to_Idle'
  | 'petchoncc_idle2.littlelegends_10_19'
  | 'petchoncc_cast_to_idle.littlelegends_10_19'
  | 'Idle_To_runHaste'
  | 'Recall'
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
        <primitive object={nodes.Food1} />
        <primitive object={nodes.Food2} />
        <primitive object={nodes.Food3} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Weapon_1} />
      </group>
      <group position={[-78.66, -1.74, -105.29]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Food_Veggie}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
