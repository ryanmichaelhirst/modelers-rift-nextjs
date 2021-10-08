import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Hookshot: THREE.Bone
  }
  materials: {
    Varus_Arctic_Mat: THREE.MeshBasicMaterial
    Hookshot_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death_Base'
  | 'varus_idle1'
  | 'varus_idle2'
  | 'varus_idle3'
  | 'varus_laugh'
  | 'Spell3'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Channel_Base'
  | 'varus_channel_windup'
  | 'Dance_Base'
  | 'Spell1'
  | 'Spell1_Walk'
  | 'Spell1_Idle'
  | 'Spell1_Fire'
  | 'varus_joke'
  | 'Run_Base'
  | 'varus_run2'
  | 'varus_base_weapon'
  | 'Recall'
  | 'Weapon_Idle'
  | 'Recall_Leadout'
  | 'varus_skin03_weapon_idle'
  | 'varus_skin03_taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Hookshot} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Varus_Arctic_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Hookshot_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
