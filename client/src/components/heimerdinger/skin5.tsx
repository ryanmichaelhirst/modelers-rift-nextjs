import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
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
    Recall_Chair: THREE.Bone
  }
  materials: {
    Heimerdinger_Body: THREE.MeshBasicMaterial
    Heimerdinger_Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'heimerdinger_base_channel_loop'
  | 'heimerdinger_base_channel_intro_windup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'heimerdinger_base_laugh'
  | 'Run'
  | 'heimerdinger_base_spell2'
  | 'heimerdinger_base_spell3'
  | 'heimerdinger_skin05_taunt'
  | 'heimerdinger_base_northadjust'
  | 'heimerdinger_base_adjustbase'
  | 'Idle_In1'
  | 'heimerdinger_skin05_run_haste1'
  | 'Run_Fast'
  | 'heimerdinger_skin05_recall'
  | 'heimerdinger_skin05_spell1'
  | 'heimerdinger_skin05_idle2'
  | 'Spell4_In'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Run_Swag'
  | 'Dance_Loop'
  | 'heimerdinger_base_joke'
  | 'heimerdinger_base_idle4'
  | 'heimerdinger_base_channel_windup'
  | 'heimerdinger_base_respawn'
  | 'heimerdinger_skin05_runin_haste1'
  | 'Idle_In2'
  | 'heimerdinger_base_idle1'
  | 'heimerdinger_base_joke2'
  | 'heimerdinger_skin05_irisclosed'
  | 'heimerdinger_skin05_irisopen'
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
        <primitive object={nodes.Recall_Chair} />
      </group>
      <group position={[-102.74, -84.52, -93.73]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Heimerdinger_Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Heimerdinger_Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
