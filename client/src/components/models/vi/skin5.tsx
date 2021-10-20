import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Teacup: THREE.Bone
  }
  materials: {
    Vi_LunarRevel_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spell2_A'
  | 'Taunt_Base'
  | 'vi_run2'
  | 'vi_idle1_in_b'
  | 'vi_spell1_idleintro'
  | 'Channel'
  | 'Attack_AfterUlt'
  | 'Attack1'
  | 'Attack3'
  | 'Attack2'
  | 'Recall'
  | 'Dance_Base'
  | 'Stunned'
  | 'Idle1_Base'
  | 'vi_run1_in'
  | 'Spell1_Run'
  | 'vi_idle_in'
  | 'Crit'
  | 'vi_joke'
  | 'vi_laugh'
  | 'Channel_Wndup'
  | 'Recall_Winddown'
  | 'Spell1'
  | 'vi_dance_in'
  | 'vi_spell1_idle'
  | 'Spell3'
  | 'Spell2'
  | 'Spell4'
  | 'vi_run1'
  | 'Death'
  | 'Spell4_Run'
  | 'vi_idle1_in_c'
  | 'Spell4_Hit'
  | 'Idle2_Base'
  | 'vi_spell4'
  | 'vi_joke2'
  | 'vi_run2_in'
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
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Teacup} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Vi_LunarRevel_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-74.06, -0.28, -37.78]}
        scale={0.01}
      />
    </group>
  )
}
