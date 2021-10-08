import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    L_sword: THREE.Bone
    R_sword: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
  }
  materials: {
    Shen_Pulsefire_Mat2: THREE.MeshBasicMaterial
    Shen_Pulsefire_Mat: THREE.MeshBasicMaterial
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
  | 'Recall'
  | 'Buffbones_Additive'
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
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.L_sword} />
        <primitive object={nodes.R_sword} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.Buffbone_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Shen_Pulsefire_Mat2}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Shen_Pulsefire_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
