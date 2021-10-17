import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Teacup: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Rocket1: THREE.Bone
    Rocket2: THREE.Bone
    Rocket3: THREE.Bone
    Rocket4: THREE.Bone
    Recall_Root: THREE.Bone
    F1_Root: THREE.Bone
    F2_Root: THREE.Bone
    F3_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Rocket: THREE.MeshBasicMaterial
    BodyMan: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Spell2'
  | 'Attack3'
  | 'Recall'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Crit'
  | 'Spell1'
  | 'Spell1_Run'
  | 'Spell4_Hit'
  | 'Spell4_Run'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'vi_idle_in'
  | 'Spell3'
  | 'vi_idle1_in_b'
  | 'Attack_AfterUlt'
  | 'Spell2_A'
  | 'vi_spell1_idle'
  | 'vi_spell1_idleintro'
  | 'Dance_Base'
  | 'vi_dance_in'
  | 'vi_idle1_in_c'
  | 'vi_joke'
  | 'vi_joke2'
  | 'vi_laugh'
  | 'Taunt_Base'
  | 'Spell4'
  | 'vi_run1'
  | 'vi_run1_in'
  | 'vi_run2'
  | 'vi_run2_in'
  | 'vi_spell4'
  | 'Stunned'
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
        <primitive object={nodes.Teacup} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Ground} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Rocket1} />
        <primitive object={nodes.Rocket2} />
        <primitive object={nodes.Rocket3} />
        <primitive object={nodes.Rocket4} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.F1_Root} />
        <primitive object={nodes.F2_Root} />
        <primitive object={nodes.F3_Root} />
      </group>
      <group position={[-78.48, -0.05, -24.01]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Rocket}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.BodyMan}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
