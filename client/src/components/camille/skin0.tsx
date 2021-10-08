import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
  }
  materials: {
    Camille_Base_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_In'
  | 'Idle1_In2'
  | 'Idle1_In3'
  | 'camille_idle1'
  | 'Idle_Loop'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_In'
  | 'Run_In2'
  | 'Spell1'
  | 'Spell1_2'
  | 'Spell1_2_to_Idle'
  | 'Spell1_To_Haste_-180'
  | 'Spell1_To_Haste_0'
  | 'Spell1_To_Haste_180'
  | 'Spell2_-180'
  | 'Spell2_-90'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_90'
  | 'Spell2_To_Idle'
  | 'Spell3_-180'
  | 'Spell3_-90'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_90'
  | 'Spell3_Base'
  | 'Spell3_Dash1_-180'
  | 'camille_spell3_dash1'
  | 'Spell3_Dash1_180'
  | 'Spell3_Dash2'
  | 'Spell3_Dash2_Short'
  | 'Spell3_Dash2_Short_to_Idle'
  | 'Spell3_Hit'
  | 'Spell3_Wall'
  | 'Spell4'
  | 'Taunt'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Camille_Base_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
