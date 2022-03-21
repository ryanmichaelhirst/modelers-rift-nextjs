import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Root_Lower: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Dragon_Root: THREE.Bone
  }
  materials: {
    Yasuo_Body_MAT: THREE.MeshBasicMaterial
    Yasuo_Sword_Smear_MAT: THREE.MeshBasicMaterial
    Flute_Mat: THREE.MeshBasicMaterial
    Dragon_Dragon_Truth_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'idle_in_unsheath.pie_c_11_21'
  | 'idle_01.pie_c_11_21'
  | 'Attack2'
  | 'run_in_raw.pie_c_11_21'
  | 'run1.pie_c_11_21'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_First'
  | 'Spell1_Dash'
  | 'Spell3'
  | 'Run2'
  | 'spell2_0.pie_c_11_21'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Death_In'
  | 'run_haste.pie_c_11_21'
  | 'Spell4'
  | 'Spell1A'
  | 'Spell1B'
  | 'Spell1C'
  | 'Spell1_Wind'
  | 'Channel_Loop'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'Run_Fast_In'
  | 'Joke_In'
  | 'Taunt_In'
  | 'Laugh'
  | 'Spell2_0'
  | 'Run_Fast_Loop'
  | 'run_to_idle.pie_c_11_21'
  | 'Run_Fast_IN_Sheathed'
  | 'yasuo_recall_loop'
  | 'recalltruth.pie_c_11_21'
  | 'idle_02.pie_c_11_21'
  | 'dance_loop_base.pie_c_11_21'
  | 'dance_in_base.pie_c_11_21'
  | 'Run_Haste'
  | 'Sheath_Run'
  | 'Idle_Out'
  | 'Run_Haste_Out'
  | 'Sheath_Run_Haste'
  | 'run_out_raw.pie_c_11_21'
  | 'Run_Out_Loop'
  | 'Attack1'
  | 'Taunt_loop'
  | 'spell1c_toidle.pie_c_11_21'
  | 'spell1c_torun.pie_c_11_21'
  | 'Spell1_Dash_ToIdle'
  | 'spell1_dash_torun.pie_c_11_21'
  | 'Death_Loop'
  | 'Run_Homeguard'
  | 'Run_INTO'
  | 'Respawn'
  | 'run_haste_out_loop.pie_c_11_21'
  | 'Joke_Loop'
  | 'Spell3_To_Idle'
  | 'Spell3_To_Run'
  | 'Run_Homeguard_IN'
  | 'homeguard_out_idle.pie_c_11_21'
  | 'Run_Homeguard_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Recall_Winddown'
  | 'dance_loop_fade.pie_c_11_21'
  | 'Channel_In'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Dragon_Root} />
      </group>
      <group position={[-57.74, -37.58, -384.19]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Yasuo_Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Yasuo_Sword_Smear_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Flute_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Dragon_Dragon_Truth_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
