import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Recall01_Penguin_Root: THREE.Bone
  }
  materials: {
    Tristana_Driver_MAT: THREE.MeshBasicMaterial
    Tristana_Base_MAT: THREE.MeshBasicMaterial
    Tristana_Tooth_MAT: THREE.MeshBasicMaterial
    Tristana_Glass_MAT: THREE.MeshBasicMaterial
    Tristana_Penguin_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Run'
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2_LNG'
  | 'Spell3'
  | 'Taunt'
  | 'Crit'
  | 'tristana_dance_in'
  | 'tristana_dance_loop'
  | 'Idle_In'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Spell2_Mid'
  | 'Spell2_Shrt'
  | 'Channel_Wndup'
  | 'Stunned'
  | 'tristana_knockedup'
  | 'KnockedUp_In'
  | 'Run90'
  | 'Run-90'
  | 'Spell4'
  | 'tristana_attack1'
  | 'Run_Slow'
  | 'Run_Slow_IN_TRAN'
  | 'Run_Slow_OUT_TRAN'
  | 'Recall'
  | 'Respawn'
  | 'Spell2_In'
  | 'Recall_Winddown'
  | 'Joke'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Recall01_Penguin_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tristana_Driver_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Tristana_Base_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Tristana_Tooth_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Tristana_Glass_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Tristana_Penguin_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
