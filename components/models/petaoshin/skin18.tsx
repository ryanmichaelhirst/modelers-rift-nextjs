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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Guitar: THREE.Bone
  }
  materials: {
    AoShin_Body_Mat: THREE.MeshBasicMaterial
    EyeDefault: THREE.MeshBasicMaterial
    EyeGod: THREE.MeshBasicMaterial
    Guitar: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Celebrate'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'damaged.littlelegends_10_19'
  | 'Death'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'Run_To_Idle'
  | 'Run_Base'
  | 'idle_to_run_haste.littlelegends_10_19'
  | 'Taunt'
  | 'Joke_Intro'
  | 'Joke_Loop'
  | 'celebrate.littlelegends_10_19'
  | 'taunt.littlelegends_10_19'
  | 'Greeting'
  | 'laugh_intro.littlelegends_10_19'
  | 'Laugh_Loop'
  | 'joke_in.littlelegends_10_19'
  | 'joke_loop.littlelegends_10_19'
  | 'Celebrate_to_Idle'
  | 'dive_out_to_idle.littlelegends_10_19'
  | 'cast_cycle_intro.littlelegends_10_19'
  | 'idle_variant.littlelegends_10_19'
  | 'Celebrate_to_Run'
  | 'interact_a.littlelegends_10_19'
  | 'interact_b.littlelegends_10_19'
  | 'greeting_to_idle.littlelegends_10_19'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Guitar} />
      </group>
      <group position={[-36.91, -37.6, -190.33]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.AoShin_Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.EyeGod}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Guitar}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
