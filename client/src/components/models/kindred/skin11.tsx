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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Tiny_Bow: THREE.Bone
    Arrow_B: THREE.Bone
    Arrow_A: THREE.Bone
    Rock: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Mask: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    RecallOne_SpiritWisp_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Props: THREE.MeshBasicMaterial
    SpiritWisp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Tpose'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Spell1Left'
  | 'Attack_Passive'
  | 'Crit'
  | 'Spell1Right'
  | 'lamb_spell2_arm.pie_c_10_16'
  | 'Spell3'
  | 'Spell1Forward'
  | 'Idle_Loop'
  | 'Attack3'
  | 'Attack1'
  | 'Idle_In'
  | 'Attack2'
  | 'Joke'
  | 'lamb_run'
  | 'lamb_run_variant01'
  | 'Spell1Back'
  | 'Laugh'
  | 'Spell3_2'
  | 'Dance_Base'
  | 'Dance_Loop'
  | 'Recall'
  | 'Death'
  | 'Spell4'
  | 'Taunt'
  | 'Spell2_Idle'
  | 'Respawn'
  | 'Channel'
  | 'Channel_Wndup'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Tiny_Bow} />
        <primitive object={nodes.Arrow_B} />
        <primitive object={nodes.Arrow_A} />
        <primitive object={nodes.Rock} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Mask} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.RecallOne_SpiritWisp_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <group position={[-98.16, -46.33, -92.35]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Props}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.SpiritWisp}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
