import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Root: THREE.Bone
    ash: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Quinn_Phoenix_MD_Standardmaterial1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'quinn_attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_Dash'
  | 'Spell3_Flip'
  | 'Attack1_P'
  | 'Run_Base'
  | 'Idle1_In'
  | 'Idle1_Base'
  | 'Recall'
  | 'Run_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Taunt'
  | 'Channel'
  | 'quinn_channel_leadin'
  | 'quinn_channel_windup'
  | 'Idle2_Base'
  | 'quinn_idle3'
  | 'Spell4'
  | 'Spell4_In'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Stunned'
  | 'Dance_Base'
  | 'quinn_dance_in'
  | 'Attack4'
  | 'Channel_Wndup'
  | 'Run_Haste'
  | 'quinn_spell4_idle'
  | 'quinn_spell4_idlein'
  | 'quinn_spell4_flap'
  | 'quinn_spell4_glide'
  | 'quinn_spell4_runin'
  | 'Spell4_Channel'
  | 'quinn_spell4_idle_tra'
  | 'quinn_phoenix_ashunderground'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.ash} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Quinn_Phoenix_MD_Standardmaterial1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-71.21, -0.89, -20.83]}
        scale={0.01}
      />
    </group>
  )
}
