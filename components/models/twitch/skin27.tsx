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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Bag: THREE.Bone
    Snap_Sword: THREE.Bone
    Snap_Rod: THREE.Bone
    Weapon: THREE.Bone
    Cheese: THREE.Bone
    RecallWeapon1: THREE.Bone
    RecallWeapon2: THREE.Bone
  }
  materials: {
    Twitch_RPG_MAT: THREE.MeshBasicMaterial
    Twitch_Cheese_Mat: THREE.MeshBasicMaterial
    RecallWeapons_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'twitch_base_joke'
  | 'Spell1'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Run'
  | 'Dance_Base'
  | 'Spell2'
  | 'Run_Haste'
  | 'Run_Fast'
  | 'Channel_Wndup'
  | 'Channel'
  | 'Run_Stealth'
  | 'Idle_Stealth'
  | 'twitch_base_laugh'
  | 'twitch_skin27_recall'
  | 'Crit'
  | 'Spell3'
  | 'Idle2_Base'
  | 'Spell4'
  | 'twitch_base_idle3'
  | 'twitch_base_idlein_run1'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Taunt_Base'
  | 'twitch_base_dancein'
  | 'twitch_skin27_bag'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Bag} />
        <primitive object={nodes.Snap_Sword} />
        <primitive object={nodes.Snap_Rod} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Cheese} />
        <primitive object={nodes.RecallWeapon1} />
        <primitive object={nodes.RecallWeapon2} />
      </group>
      <group position={[-64.27, -5.76, -179.75]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Twitch_RPG_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Twitch_Cheese_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.RecallWeapons_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
