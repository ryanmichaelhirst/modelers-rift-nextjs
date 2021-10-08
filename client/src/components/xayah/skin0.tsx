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
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_FX_Loc: THREE.Bone
    Wing4_Ground: THREE.Bone
    Wing_A3_Ground: THREE.Bone
    Wing_B3_Ground: THREE.Bone
  }
  materials: {
    Xayah_Base_Mat: THREE.MeshBasicMaterial
    Xayah_Base_Weapon_Mat: THREE.MeshBasicMaterial
    Xayah_Base_Wing_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance_Loop'
  | 'Duo_Recall'
  | 'Duo_Recall_Unto'
  | 'Duo_Recall_Ready'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'IdleIn'
  | 'Run_Haste'
  | 'Spell4_2Idle'
  | 'Spell4_2run'
  | 'Spell4_2run_Fast'
  | 'Spell4_Lft180'
  | 'Spell4_Lft90'
  | 'Spell4_Rgt180'
  | 'Spell4_Rgt90'
  | 'xayah_duo_dance_loop'
  | 'xayah_duo_dance_into'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit1'
  | 'Crit2'
  | 'Dance_Base'
  | 'Death'
  | 'Idle_ToRun'
  | 'Idlein_Torun'
  | 'IdleIn_toRun_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Run_Slow'
  | 'Spell1'
  | 'Spell1_2Idle'
  | 'Spell1_2Run'
  | 'Spell1_2runfast'
  | 'Spell2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_RunBase'
  | 'Spell2_To_RunFast'
  | 'Spell3'
  | 'Spell3_2idle'
  | 'Spell3_2run'
  | 'Spell3_2runfast'
  | 'Spell4_Base'
  | 'Taunt'
  | 'xayah_wingturn'
  | 'xayah_wingturn_lft'
  | 'xayah_wingturn_rgt'
  | 'Wingturn_Lft_Small'
  | 'Wingturn_Rgt_Small'
  | 'Attack_W1'
  | 'Attack_W2'
  | 'Attack_W3'
  | 'Attack_W4'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_FX_Loc} />
        <primitive object={nodes.Wing4_Ground} />
        <primitive object={nodes.Wing_A3_Ground} />
        <primitive object={nodes.Wing_B3_Ground} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Xayah_Base_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Xayah_Base_Weapon_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Xayah_Base_Wing_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
