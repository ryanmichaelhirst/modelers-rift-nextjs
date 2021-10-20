import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    nocture_cyberTemplar: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nocturne_cyber_templar_idle3'
  | 'nocturne_cyber_templar_idle4'
  | 'Joke'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4B'
  | 'Taunt_Base'
  | 'Idle_Enter'
  | 'nocturne_cyber_templar_laugh'
  | 'Run_Windup'
  | 'nocturne_cyber_templar_spell4_3_windup'
  | 'Spell4_Base'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'nocturne_cyber_templar_recall_loop'
  | 'nocturne_cyber_templar_recall_windup'
  | 'nocturne_cyber_templar_recall_winddown'
  | 'nocturne_cyber_templar_run_loop'
  | 'Shake'
  | 'Spell2'
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
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.nocture_cyberTemplar}
        skeleton={nodes.mesh_0.skeleton}
        position={[-117.64, -9.37, -46.02]}
        scale={0.01}
      />
    </group>
  )
}
