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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Pistol_World_Snap: THREE.Bone
    Revolver_World_Snap: THREE.Bone
    Sword_World_Snap: THREE.Bone
    Sword_Clip_World_Snap: THREE.Bone
    Coin: THREE.Bone
  }
  materials: {
    Pistol: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tft6_samira_attack1_gun_hit.tft_set6'
  | 'tft6_samira_attack1_gun_start.tft_set6'
  | 'tft6_samira_attack1_hit.tft_set6'
  | 'tft6_samira_attack1_idle.tft_set6'
  | 'tft6_samira_attack1_start.tft_set6'
  | 'tft6_samira_attack2_gun_hit.tft_set6'
  | 'tft6_samira_attack2_gun_start.tft_set6'
  | 'tft6_samira_attack2_hit.tft_set6'
  | 'tft6_samira_attack2_idle.tft_set6'
  | 'tft6_samira_attack2_start.tft_set6'
  | 'tft6_samira_crit_hit.tft_set6'
  | 'tft6_samira_crit_idle.tft_set6'
  | 'Crit_In'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Run'
  | 'tft6_samira_spell_gun.tft_set6'
  | 'tft6_samira_spell_gun_idle.tft_set6'
  | 'tft6_samira_spell_sword.tft_set6'
  | 'tft6_samira_spell_sword_idle.tft_set6'
  | 'tft6_samira_challengerdash.tft_set6'
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
        <primitive object={nodes.Pistol_World_Snap} />
        <primitive object={nodes.Revolver_World_Snap} />
        <primitive object={nodes.Sword_World_Snap} />
        <primitive object={nodes.Sword_Clip_World_Snap} />
        <primitive object={nodes.Coin} />
      </group>
      <group position={[-56.47, -50.57, -114.73]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Pistol}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
