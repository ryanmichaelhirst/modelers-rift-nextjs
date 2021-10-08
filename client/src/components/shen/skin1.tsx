import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    L_sword: THREE.Bone
    R_sword: THREE.Bone
  }
  materials: {
    frozen_weapon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Spell1_Attack1'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'Spell1_Attack2'
  | 'shen_passive_attack.ruinedking'
  | 'Spell1_Attack3'
  | 'shen_attack1.ruinedking'
  | 'Idle_In'
  | 'shen_spell1_attack1.ruinedking'
  | 'shen_spell1_attack2.ruinedking'
  | 'shen_spell1_attack3.ruinedking'
  | 'shen_spell1.ruinedking'
  | 'Spell4'
  | 'Run1'
  | 'Walk'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.L_sword} />
        <primitive object={nodes.R_sword} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.frozen_weapon}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
