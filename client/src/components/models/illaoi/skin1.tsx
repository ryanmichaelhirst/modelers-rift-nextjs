import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Tentacle_Mat_Skin01: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Spell1'
  | 'Idle1_Base'
  | 'Attack2'
  | 'Attack1'
  | 'Attack3'
  | 'Spell4'
  | 'Idle1_In1'
  | 'Death'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Passive'
  | 'Spell2'
  | 'Attack_Tower'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Run_Slow'
  | 'illaoi_spell3_a'
  | 'Spell3_B_Long'
  | 'Spell3_B_Short'
  | 'Spell3_B_Medium'
  | 'Idle_Transition'
  | 'Spell3_B_Medium_Further'
  | 'Laugh'
  | 'Joke'
  | 'Spell4_ToIdle'
  | 'Dance'
  | 'Dance_In'
  | 'Spell2_Long'
  | 'Spell3_a_toidle'
  | 'Spell2_To_Run'
  | 'Spell2_Long_to_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_Long_A'
  | 'Spell2_Long_B'
  | 'Crit'
  | 'Spell3_A_Scale'
  | 'Recall_Leadout'
  | 'Spell1_To_Run'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tentacle_Mat_Skin01}
        skeleton={nodes.mesh_0.skeleton}
        position={[-80.45, -7.28, -42.92]}
        scale={0.03}
      />
    </group>
  )
}
