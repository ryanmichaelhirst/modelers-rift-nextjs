import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    R_hand_grab: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    ___Default3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'blitzcrank_attack1'
  | 'blitzcrank_attack2'
  | 'Channel_Base'
  | 'blitzcrank_channel_windup'
  | 'Crit'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'blitzcrank_idle3'
  | 'blitzcrank_laugh'
  | 'Run_Base'
  | 'blitzcrank_i_spell1'
  | 'blitzcrank_spell1'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Run_Fly_Loop'
  | 'blitzcrank_i_idle2'
  | 'blitzcrank_i_idle3'
  | 'blitzcrank_i_attack1'
  | 'blitzcrank_i_idle1'
  | 'blitzcrank_i_attack2'
  | 'blitzcrank_i_dance'
  | 'blitzcrank_i_death'
  | 'blitzcrank_i_laugh'
  | 'blitzcrank_i_spell2'
  | 'blitzcrank_i_taunt'
  | 'blitzcrank_i_channel_windup'
  | 'blitzcrank_i_channel'
  | 'Run_Fly_Windup'
  | 'blitzcrank_i_spell3'
  | 'Buffbones'
  | 'blitzcrank_i_run'
  | 'Dance_Base'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.R_hand_grab} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.___Default3} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
