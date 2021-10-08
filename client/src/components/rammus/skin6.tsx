import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    lambert2SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'rammus_attack1'
  | 'rammus_attack2'
  | 'Channel'
  | 'rammus_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rammus_laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Idle1_Arms'
  | 'Idle2_Arms'
  | 'Attack1_Arms'
  | 'Attack2_Arms'
  | 'Crit_Arms'
  | 'Dance_Arms'
  | 'Laugh_Arms'
  | 'rammus_metal_idle1_fingers_a'
  | 'rammus_metal_idle1_fingers_b'
  | 'rammus_metal_idle1_fingers_c'
  | 'rammus_metal_channel_wndup'
  | 'spell4_jump.srt_rammus_wr_parity'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert2SG1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
