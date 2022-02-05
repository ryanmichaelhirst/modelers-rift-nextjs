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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Snap_Hat2World_Skin01: THREE.Bone
    Bar_Skin01: THREE.Bone
    Bottle2_Skin01: THREE.Bone
    Bottle3_Skin01: THREE.Bone
    Bottle4_Skin01: THREE.Bone
    Bottle5_Skin01: THREE.Bone
    Bottle1_Skin01: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Jihn_Mesh_Only_Jihn_Skin01_MAT: THREE.MeshBasicMaterial
    Bar: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle_Base'
  | 'Run'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'TestPose'
  | 'Attack1'
  | 'Attack3'
  | 'jhin_attack4'
  | 'jhin_idle01_variant'
  | 'Attack2'
  | 'Run_Fast'
  | 'Run_Passive'
  | 'Laugh'
  | 'Spell2'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Reload'
  | 'Spell1'
  | 'Joke'
  | 'Spell4_Idle'
  | 'jhin_spell4_shooting1'
  | 'Recall'
  | 'Reload_Recoil'
  | 'Run_Haste'
  | 'RunHaste'
  | 'Run_Injured'
  | 'Run_Slow'
  | 'Spell3_To_Run'
  | 'Spell2_To_Run'
  | 'Spell4_To_Run'
  | 'Idle_In'
  | 'jhin_spell2_to_run'
  | 'Respawn'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Snap_Hat2World_Skin01} />
        <primitive object={nodes.Bar_Skin01} />
        <primitive object={nodes.Bottle2_Skin01} />
        <primitive object={nodes.Bottle3_Skin01} />
        <primitive object={nodes.Bottle4_Skin01} />
        <primitive object={nodes.Bottle5_Skin01} />
        <primitive object={nodes.Bottle1_Skin01} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-64.59, -3.71, -28.33]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Jihn_Mesh_Only_Jihn_Skin01_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Bar}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
