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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    twistedfate_underworld_MD_PROXY_blinn4: THREE.MeshBasicMaterial
    twistedfate_underworld_MD_PROXY_ALPHA_arm1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'twistedfate_2012_attack1'
  | 'twistedfate_2012_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Dance_Loop'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'twistedfate_2012_laugh'
  | 'Run_Base'
  | 'twistedfate_2012_spell1'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'twistedfate_2012_attack3'
  | 'twistedfate_2012_attack4'
  | 'twistedfate_2012_recall_idle'
  | 'twistedfate_2012_recall'
  | 'Knockup_Base'
  | 'twistedfate_2012_idle_enter'
  | 'twistedfate_2012_joke.pie_c_legacy_bugs_10_18'
  | 'twistedfate_underworld_idle1'
  | 'twistedfate_underworld_idle_enter'
  | 'twistedfate_underworld_run'
  | 'twistedfate_underworld_attack1'
  | 'twistedfate_underworld_attack2'
  | 'twistedfate_underworld_attack3'
  | 'twistedfate_underworld_attack4'
  | 'twistedfate_underworld_channel'
  | 'twistedfate_underworld_channel_windup'
  | 'twistedfate_underworld_crit'
  | 'twistedfate_underworld_death'
  | 'twistedfate_underworld_idle2'
  | 'twistedfate_underworld_joke'
  | 'twistedfate_underworld_knockup'
  | 'twistedfate_underworld_laugh'
  | 'twistedfate_underworld_recall'
  | 'twistedfate_underworld_recall_windup'
  | 'twistedfate_underworld_spell1'
  | 'twistedfate_underworld_spell4'
  | 'twistedfate_underworld_taunt'
  | 'Dance_Windup'
  | 'Walk'
  | 'Turn0'
  | 'TurnL'
  | 'TurnR'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.twistedfate_underworld_MD_PROXY_blinn4}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.twistedfate_underworld_MD_PROXY_ALPHA_arm1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
