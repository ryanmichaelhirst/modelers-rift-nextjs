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
    Buffbone_Cstm_EyeBallTarget: THREE.Bone
  }
  materials: {
    viktor_bot: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'velkoz_skin01_channel_windup'
  | 'Crit_Base'
  | 'Spell1'
  | 'Death_Base'
  | 'Run'
  | 'Recall_Leadout'
  | 'Recall_Winddown'
  | 'velkoz_skin01_spell2'
  | 'velkoz_skin01_spell4_in'
  | 'velkoz_skin01_idle'
  | 'velkoz_skin01_spell3'
  | 'Spell4_Base'
  | 'Respawn'
  | 'velkoz_skin01_attack1'
  | 'velkoz_skin01_attack2'
  | 'Recall'
  | 'velkoz_skin01_lookaround'
  | 'Spell3_LeadOut'
  | 'Spell4_LeadOut'
  | 'Spell2_LeadOut'
  | 'Run_Haste'
  | 'velkoz_skin01_attack3'
  | 'Laugh'
  | 'Taunt'
  | 'Dance'
  | 'Joke'
  | 'Buffbones'
  | 'velkoz_skin01_crit'
  | 'Idle_In_Additive'
  | 'Spell3_Upper'
  | 'velkoz_turn_zeroadditive'
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
        <primitive object={nodes.Buffbone_Cstm_EyeBallTarget} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.viktor_bot}
        skeleton={nodes.mesh_0.skeleton}
        position={[-321.6, -236.9, -434.04]}
        scale={0.04}
      />
    </group>
  )
}
