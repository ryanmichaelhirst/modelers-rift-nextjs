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
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Ekko_SKT_MAT: THREE.MeshBasicMaterial
    lambert18SG1: THREE.MeshBasicMaterial
    book: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_Base'
  | 'Death'
  | 'Laugh'
  | 'Spell3'
  | 'Taunt_Base'
  | 'punkgenius_joke'
  | 'Run_Slow'
  | 'Run_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Spell4'
  | 'Spell2_Cast'
  | 'Idle_In'
  | 'Run_ALT_B'
  | 'Run_Haste'
  | 'Attack_P_1'
  | 'Attack_P_2'
  | 'Attack_P_3'
  | 'punkgenius_idle01'
  | 'punkgenius_idle02'
  | 'Idle01_to_Idle2'
  | 'Spell4_End'
  | 'Spell4_End_To_Idle'
  | 'Spell4_End_To_Run'
  | 'Spell3_Attack'
  | 'Spell1'
  | 'punkgenius_idle03'
  | 'Run_In2'
  | 'Spell3_Dash_to_Idle'
  | 'Spell3_Run'
  | 'Spell3_Dash_to_Run'
  | 'Spell1_To_Idle'
  | 'Attack_Tower'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'punkgenius_spell1_catch'
  | 'Spell1_Catch_Standing'
  | 'Recall'
  | 'Respawn'
  | 'Attack3'
  | 'Dance_Loop'
  | 'Crit'
  | 'Joke_Loop'
  | 'Taunt_loop'
  | 'punkgenius_spell1_catch_standing'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ekko_SKT_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.lambert18SG1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.book} skeleton={nodes.mesh_0_2.skeleton} />
    </group>
  )
}
