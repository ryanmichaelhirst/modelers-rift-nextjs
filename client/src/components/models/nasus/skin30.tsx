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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    HelmetRoot: THREE.Bone
    Buffbone_Weapon_WorldSnap: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Goop: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'Death'
  | 'Run'
  | 'spell2_full.pie_c_11_7'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Wndup'
  | 'Channel'
  | 'spell1.pie_c_11_7'
  | 'Crit'
  | 'Spell3_Upper'
  | 'spell4_full.pie_c_11_7'
  | 'Run_Haste'
  | 'Run_Fast'
  | 'joke.pie_c_11_7'
  | 'leadin.pie_c_11_7'
  | 'winddown.pie_c_legacy_bugs_2021'
  | 'Run_Ult'
  | 'run_fast.pie_c_11_7'
  | 'run_haste.pie_c_11_7'
  | 'Run1_In'
  | 'taunt.pie_c_11_7'
  | 'Idle2_Base'
  | 'Spell1_Upper'
  | 'Recall'
  | 'puppy_additive.pie_c_11_7'
  | 'puppy_smilingeyes.pie_c_11_7'
  | 'laugh.pie_c_11_7'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.HelmetRoot} />
        <primitive object={nodes.Buffbone_Weapon_WorldSnap} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <group position={[-104.63, -13.12, -39.82]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Goop}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
