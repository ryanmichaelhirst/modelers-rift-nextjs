import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Rocket_Base_To_World: THREE.Bone
    Snap_Rocket_Mid_To_World: THREE.Bone
    Snap_Rocket_End_To_World: THREE.Bone
    Snap_Rocket_Holder_To_World: THREE.Bone
    Snap_Rocket_To_World: THREE.Bone
    L_Snap_Weapon_To_World: THREE.Bone
    R_Snap_Weapon_To_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Heimerdinger_Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'heimerdinger_base_channel_loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'heimerdinger_base_laugh'
  | 'Run'
  | 'heimerdinger_base_spell2'
  | 'Spell3_Base'
  | 'Taunt_Base'
  | 'heimerdinger_base_northadjust'
  | 'heimerdinger_base_adjustbase'
  | 'Idle_In1'
  | 'heimerdinger_base_run_haste1'
  | 'Run_Fast'
  | 'heimerdinger_base_recall'
  | 'heimerdinger_base_spell1'
  | 'Idle2_Base'
  | 'Spell4_In'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Run_Swag'
  | 'Dance_Loop'
  | 'heimerdinger_base_joke'
  | 'heimerdinger_base_idle4'
  | 'heimerdinger_base_channel_windup'
  | 'heimerdinger_base_respawn'
  | 'heimerdinger_base_runin_haste1'
  | 'Idle_In2'
  | 'heimerdinger_base_idle1'
  | 'heimerdinger_base_joke2'
  | 'heimerdinger_base_taunt'
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
        <primitive object={nodes.Snap_Rocket_Base_To_World} />
        <primitive object={nodes.Snap_Rocket_Mid_To_World} />
        <primitive object={nodes.Snap_Rocket_End_To_World} />
        <primitive object={nodes.Snap_Rocket_Holder_To_World} />
        <primitive object={nodes.Snap_Rocket_To_World} />
        <primitive object={nodes.L_Snap_Weapon_To_World} />
        <primitive object={nodes.R_Snap_Weapon_To_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Heimerdinger_Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-103.62, 0.31, -65.92]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
