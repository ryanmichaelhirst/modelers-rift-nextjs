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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Weapon2World: THREE.Bone
    AsheCrown_Main: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    XinZhao_MAT: THREE.MeshBasicMaterial
    XinZhao_Skin20_AsheCrown_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Idle1'
  | 'xinzhao_run'
  | 'Spell6'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Attack3'
  | 'Attack3_To_Idle'
  | 'IdleHaste_To_runHaste'
  | 'Idle_In'
  | 'Idle_In_Haste'
  | 'Idle_To_runHaste'
  | 'Run_Haste'
  | 'Spell1_Attack1'
  | 'Spell1_Attack1_To_Idle'
  | 'xinzhao_spell1_attack2_to_run'
  | 'Spell1_Attack2'
  | 'Spell1_Attack2_To_Idle'
  | 'xinzhao_spell1_attack1_to_run'
  | 'Spell1_Attack3'
  | 'Spell1_Attack3_To_Run'
  | 'xinzhao_spell2_stabandslash'
  | 'xinzhao_spell2_stabandslash_to_idle'
  | 'Spell3_DashToAlly'
  | 'Spell6_To_Idle'
  | 'Spell6_To_Run'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.AsheCrown_Main} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-62.49, -54.68, -116.27]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.XinZhao_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.XinZhao_Skin20_AsheCrown_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
