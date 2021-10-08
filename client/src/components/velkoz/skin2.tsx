import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_EyeBallTarget: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    blinn4: THREE.MeshBasicMaterial
    Tentacle: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'velkoz_channel_windup'
  | 'Death_Base'
  | 'Run'
  | 'Recall_Winddown'
  | 'Taunt'
  | 'velkoz_spell2'
  | 'Spell4_In'
  | 'Spell1'
  | 'velkoz_idle1v2'
  | 'Joke'
  | 'Laugh'
  | 'velkoz_spell3'
  | 'Spell4_Base'
  | 'Respawn'
  | 'velkoz_attack1'
  | 'velkoz_attack3'
  | 'velkoz_attack2'
  | 'Dance'
  | 'Recall'
  | 'velkoz_lookaround'
  | 'Spell3_LeadOut'
  | 'Spell4_LeadOut'
  | 'Spell2_LeadOut'
  | 'Run_Haste'
  | 'Crit_Base'
  | 'Turn_Additve_Right'
  | 'Turn_Additve_Left'
  | 'TurnZero_Additive'
  | 'velkoz_idle_in'
  | 'Idle_In_Additive'
  | 'velkoz_crit'
  | 'Spell3_Upper'
  | 'velkoz_spell4_in'
  | 'Recall_Leadout'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Cstm_EyeBallTarget} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn4} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Tentacle}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
