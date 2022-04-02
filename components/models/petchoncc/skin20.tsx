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
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Food1: THREE.Bone
    Food2: THREE.Bone
    Food3: THREE.Bone
    PropRoot: THREE.Bone
    TrueWorld: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Weapon_1: THREE.Bone
  }
  materials: {
    EyeSad: THREE.MeshBasicMaterial
    Gourd: THREE.MeshBasicMaterial
    Gourd1: THREE.MeshBasicMaterial
    Props: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'petchoncc_idle1.littlelegends_10_19'
  | 'TauntIntro'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Laugh'
  | 'petchoncc_interact.littlelegends_10_19'
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
  | 'Joke'
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
        <primitive object={nodes.Food1} />
        <primitive object={nodes.Food2} />
        <primitive object={nodes.Food3} />
        <primitive object={nodes.PropRoot} />
        <primitive object={nodes.TrueWorld} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Weapon_1} />
      </group>
      <group position={[-78.51, -0.06, -125.37]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.EyeSad}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Gourd}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Gourd1}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Props}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
