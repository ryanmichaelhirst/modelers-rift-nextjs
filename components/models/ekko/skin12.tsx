import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Bat2World: THREE.Bone
    Wood: THREE.Bone
    Cauldron: THREE.Bone
    Candy_01: THREE.Bone
    Candy_02: THREE.Bone
    Candy_03: THREE.Bone
    Candy_04: THREE.Bone
    Candy_05: THREE.Bone
  }
  materials: {
    Ekko_Harrowing_MAT: THREE.MeshBasicMaterial
    Skin12_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Base'
  | 'Death'
  | 'Laugh'
  | 'Spell3'
  | 'Taunt_Base'
  | 'punkgenius_joke'
  | 'Run_Slow'
  | 'Run_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Spell4'
  | 'Spell2_Cast'
  | 'Idle_In'
  | 'Run_ALT_B'
  | 'Run_Haste'
  | 'Attack_P_1'
  | 'Attack_P_2'
  | 'Attack_P_3'
  | 'punkgenius_idle01'
  | 'punkgenius_idle02'
  | 'Idle01_to_Idle2'
  | 'Spell4_End'
  | 'Spell4_End_To_Idle'
  | 'Spell4_End_To_Run'
  | 'Spell3_Attack'
  | 'Spell1'
  | 'punkgenius_idle03'
  | 'Run_In2'
  | 'Spell3_Dash_to_Idle'
  | 'Spell3_Run'
  | 'Spell3_Dash_to_Run'
  | 'Spell1_To_Idle'
  | 'Attack_Tower'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'punkgenius_spell1_catch'
  | 'Spell1_Catch_Standing'
  | 'Recall'
  | 'Respawn'
  | 'Attack3'
  | 'Dance_Loop'
  | 'Crit'
  | 'Joke_Loop'
  | 'Taunt_loop'
  | 'punkgenius_spell1_catch_standing'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Bat2World} />
        <primitive object={nodes.Wood} />
        <primitive object={nodes.Cauldron} />
        <primitive object={nodes.Candy_01} />
        <primitive object={nodes.Candy_02} />
        <primitive object={nodes.Candy_03} />
        <primitive object={nodes.Candy_04} />
        <primitive object={nodes.Candy_05} />
      </group>
      <group position={[-99.97, -0.5, -97.68]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Ekko_Harrowing_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin12_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
