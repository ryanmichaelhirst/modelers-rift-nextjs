import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon_World: THREE.Bone
    Shield: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Glasses: THREE.Bone
  }
  materials: {
    Sun_Sword_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'leona_skin10_attack1'
  | 'leona_skin10_attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell2_Idle'
  | 'leona_skin10_spell2_run'
  | 'Spell3'
  | 'Taunt'
  | 'Idle_In'
  | 'Spell2_Idle_In'
  | 'leona_skin10_spell2_activate_run'
  | 'Spell2_Deactivate'
  | 'leona_skin10_spell2_deactivate_run'
  | 'Spell4_RunIn'
  | 'Run_Homeguard_Trans'
  | 'Run_Homeguard_RunIn'
  | 'Run_Homeguard_IdleIn'
  | 'Idle1_Var1'
  | 'Run_Fast'
  | 'Spell4'
  | 'Idle1_Var2'
  | 'Recall_Winddown'
  | 'Recall'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Run_Homeguard'
  | 'leona_skin10_spell2_sunspin'
  | 'leona_skin10_spell2_close'
  | 'Spell2_RunFast'
  | 'Spell2_RunFast_Deactivate'
  | 'Joke'
  | 'Spell4_To_Idle'
  | 'Spell4_to_Spell2Idle'
  | 'Spell4_to_Spell2Run'
  | 'leona_skin10_run_in'
  | 'Spell3_To_Idle'
  | 'Spell3_to_Spell2'
  | 'leona_skin10_spell2_cloth'
  | 'leona_skin10_spell2_clothhit'
  | 'Gameplay_Video'
  | 'leona_skin10_spawn'
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
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Shield} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Glasses} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sun_Sword_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-194.75, -5.28, -66.08]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
