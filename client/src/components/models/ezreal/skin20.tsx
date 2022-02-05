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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    PetRoot: THREE.Bone
  }
  materials: {
    Ezreal_Skin20_MAT: THREE.MeshBasicMaterial
    Pet: THREE.MeshBasicMaterial
    Ezreal_Skin18_Wing_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ezreal_attack1'
  | 'ezreal_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_Windup'
  | 'ezreal_spell3_exit'
  | 'Spell3_Exit_NoTarget_Idle'
  | 'Run_To_Idle'
  | 'ezreal_idle2'
  | 'ezreal_run'
  | 'ezreal_attack4'
  | 'ezreal_attack2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Spell3_Exit_NoTarget_Run'
  | 'Spell3_Exit_Run'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Joke'
  | 'Spell3_Generic'
  | 'ezreal_spell3_exit_notarget'
  | 'Respawn'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'ezreal_skin18_homeguard'
  | 'ezreal_skin18_homeguard_variant'
  | 'Run_Homeguard_IN'
  | 'ezreal_skin18_recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.PetRoot} />
      </group>
      <group position={[-83.82, -53.22, -106.31]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Ezreal_Skin20_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Pet}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Ezreal_Skin18_Wing_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
