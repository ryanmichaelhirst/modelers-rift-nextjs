import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Coin7: THREE.Bone
    Coin6: THREE.Bone
    Coin5: THREE.Bone
    Coin4: THREE.Bone
    Coin3: THREE.Bone
    Coin2: THREE.Bone
    Coin1: THREE.Bone
    Treasure_Chest: THREE.Bone
    Treasure_Chest_Cover: THREE.Bone
    Tire: THREE.Bone
  }
  materials: {
    blinn5: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_run_haste'
  | 'thresh_spell2'
  | 'thresh_attack1_mid'
  | 'thresh_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_idle3'
  | 'thresh_joke'
  | 'thresh_laugh'
  | 'thresh_spell4'
  | 'Taunt_Base'
  | 'thresh_idle_in1'
  | 'thresh_idle_in2'
  | 'thresh_idle4'
  | 'Recall_Windup'
  | 'Respawn'
  | 'thresh_attack1_long'
  | 'Spell3_P0'
  | 'thresh_spell3'
  | 'thresh_spell1_pull1'
  | 'thresh_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_spell1_pull2'
  | 'thresh_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'Recall_Loop'
  | 'thresh_taunt2'
  | 'Dance_Loop'
  | 'thresh_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_spell3_p-180'
  | 'Lantern_Null'
  | 'Undersea_Idle1_Chesttire_1frame'
  | 'thresh_attack2_short'
  | 'thresh_attack2_mid'
  | 'Undersea_Recall_Loop'
  | 'Undersea_Recall_Windup'
  | 'Recall_Windup2'
  | 'Recall_Loop2'
  | 'Undersea_Recall_Loop2'
  | 'Undersea_Recall_Windup2'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Coin7} />
        <primitive object={nodes.Coin6} />
        <primitive object={nodes.Coin5} />
        <primitive object={nodes.Coin4} />
        <primitive object={nodes.Coin3} />
        <primitive object={nodes.Coin2} />
        <primitive object={nodes.Coin1} />
        <primitive object={nodes.Treasure_Chest} />
        <primitive object={nodes.Treasure_Chest_Cover} />
        <primitive object={nodes.Tire} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn5}
        skeleton={nodes.mesh_0.skeleton}
        position={[-133.72, -42.11, -98.73]}
        scale={0.03}
      />
    </group>
  )
}
