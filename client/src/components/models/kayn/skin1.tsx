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
    C_Hair2_Ground: THREE.Bone
    True_World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Kayne_Skin01_mat: THREE.MeshBasicMaterial
    Skin01_Slayer_MAT: THREE.MeshBasicMaterial
    Skin01_Assassin_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Eye_Cycle'
  | 'Idle1_In'
  | 'Idle1_In2'
  | 'Idle1_In_Assassin'
  | 'Idle1_In_Slayer'
  | 'Idle1_Slayer'
  | 'Idle1_Base'
  | 'Idle2_Assassin'
  | 'Idle2_Base'
  | 'Idle3_Assassin'
  | 'kayn_idle1_assassin'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh'
  | 'Laugh_to_Idle'
  | 'Recall'
  | 'Recall_Leadout'
  | 'kayn_skin01_recall_assassin'
  | 'kayn_skin01_recall_slayer'
  | 'Run'
  | 'Run_Assassin'
  | 'Run_Slayer'
  | 'Spell1_Circle'
  | 'Spell1_Dash'
  | 'Spell1_Stop'
  | 'Spell1_Exit_To_Run'
  | 'Spell2'
  | 'Spell2_Assassin_Cast'
  | 'Spell2_Slayer'
  | 'Spell2_Slayer_Run'
  | 'Spell2_Slayer_Idle'
  | 'Spell2_Idle'
  | 'Spell2_Into_Run'
  | 'Spell3'
  | 'Spell3_Idle'
  | 'Spell3_Run'
  | 'Spell3_Run_In'
  | 'Spell4_Air'
  | 'Spell4_Hit'
  | 'Taunt_loop'
  | 'Taunt_Start'
  | 'Transform_Assassin'
  | 'Transform_Slayer'
  | 'kayn_spell4_air'
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
        <primitive object={nodes.C_Hair2_Ground} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <group position={[-55.03, -1.24, -133.14]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Kayne_Skin01_mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin01_Slayer_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Skin01_Assassin_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
