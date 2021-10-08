import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_CSTM_EXTRA: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    R_Buffbone_Cstm_Foot_Loc: THREE.Bone
    L_Buffbone_Cstm_Foot_Loc: THREE.Bone
  }
  materials: {
    Default6: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'brand_zombie_idle1'
  | 'brand_zombie_idle2'
  | 'brand_zombie_idle3'
  | 'brand_zombie_joke'
  | 'brand_zombie_laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'brand_zombie_dance_windup'
  | 'brand_zombie_respawn'
  | 'brand_zombie_run_in'
  | 'brand_zombie_run_fast'
  | 'Idle_Enter'
  | 'brand_zombie_idlevarient1'
  | 'brand_zombie_idlevarient2'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'brand_zombie_run_chase'
  | 'Dance_Loop'
  | 'brand_zombie_idlevarient3'
  | 'brand_zombie_run_fast_in'
  | 'brand_zombie_run_chase_in'
  | 'brand_zombie_run_a'
  | 'brand_zombie_idle1_in'
  | 'brand_zombie_idle2_in'
  | 'brand_zombie_idle3_in'
  | 'brand_zombie_run_fast_a'
  | 'brand_zombie_run_fast_a_in'
  | 'brand_zombie_run_fast_a_out'
  | 'brand_zombie_run_b'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_EXTRA} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.R_Buffbone_Cstm_Foot_Loc} />
        <primitive object={nodes.L_Buffbone_Cstm_Foot_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Default6}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
