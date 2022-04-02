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
    mesh_0_3: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Root_Lower: THREE.Bone
    Sword_World: THREE.Bone
    Sheath_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Effects_Root: THREE.Bone
    Recall_Main: THREE.Bone
  }
  materials: {
    Yasuo_Skin18_MAT: THREE.MeshBasicMaterial
    Yasuo_Skin18_WaterBottle_Mat: THREE.MeshBasicMaterial
    Yasuo_Skin18_Instrument_Mat: THREE.MeshBasicMaterial
    Yasuo_Skin18_Recall_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'yasuo_idle_in'
  | 'yasuo_idle1'
  | 'Attack2'
  | 'yasuo_sheath_run'
  | 'yasuo_run1'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_First'
  | 'Spell1_Dash'
  | 'Spell3'
  | 'Run2'
  | 'yasuo_spell2'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Death'
  | 'yasuo_run_haste'
  | 'Spell4'
  | 'Spell1A'
  | 'Spell1B'
  | 'Spell1C'
  | 'Spell1_Wind'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'Run_Fast_In'
  | 'Joke'
  | 'Taunt'
  | 'Laugh'
  | 'Spell2_0'
  | 'Run_Fast_Loop'
  | 'yasuo_idle_in_sheathed'
  | 'Run_Fast_IN_Sheathed'
  | 'yasuo_recall_windown'
  | 'yasuo_recall'
  | 'yasuo_idle2'
  | 'yasuo_dance_loop'
  | 'yasuo_dance_in'
  | 'Run_Haste'
  | 'Sheath_Run'
  | 'Idle_Out'
  | 'Run_Haste_Out'
  | 'Sheath_Run_Haste'
  | 'yasuo_run_out'
  | 'Run_Out_Loop'
  | 'Attack1'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
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
        <primitive object={nodes.Root_Upper} />
        <primitive object={nodes.Root_Lower} />
        <primitive object={nodes.Sword_World} />
        <primitive object={nodes.Sheath_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Effects_Root} />
        <primitive object={nodes.Recall_Main} />
      </group>
      <group position={[-143.46, -4.08, -174.51]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Yasuo_Skin18_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Yasuo_Skin18_WaterBottle_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Yasuo_Skin18_Instrument_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Yasuo_Skin18_Recall_Mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
