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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Root: THREE.Bone
    Arrow: THREE.Bone
  }
  materials: {
    quinn_woad_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'quinn_attack1'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_Dash'
  | 'Spell3_Flip'
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
  | 'Run_Haste'
  | 'quinn_dance_in'
  | 'Dance_Base'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Crit'
  | 'Attack1_P'
  | 'Stunned'
  | 'Channel_Wndup'
  | 'Adjust'
  | 'quinn_spell4_idle'
  | 'quinn_spell4_idlein'
  | 'quinn_spell4_flap'
  | 'quinn_spell4_glide'
  | 'quinn_spell4_runin'
  | 'Spell4_Channel'
  | 'quinn_spell4_idle_tra'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Arrow} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.quinn_woad_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-70.97, 1.79, -33.57]}
        scale={0.01}
      />
    </group>
  )
}
