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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Book2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall01_R_Shoulder: THREE.Bone
    Recall01_L_Shoulder: THREE.Bone
    Recall02_R_Shoulder: THREE.Bone
    Recall02_L_Shoulder: THREE.Bone
    Recall03_R_Shoulder: THREE.Bone
    Recall03_L_Shoulder: THREE.Bone
    Recall04_R_Shoulder: THREE.Bone
    Recall04_L_Shoulder: THREE.Bone
  }
  materials: {
    FrontCloth: THREE.MeshBasicMaterial
    Recall_Arm: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'karthus_laugh'
  | 'Run_Base'
  | 'karthus_spell2'
  | 'Spell4'
  | 'Spell4_Loop'
  | 'Taunt_Base'
  | 'karthus_idle_in'
  | 'Idle_Passive'
  | 'Attack2'
  | 'Spell1_A'
  | 'Spell1_B'
  | 'Spell1_C'
  | 'karthus_run'
  | 'Run_In'
  | 'Recall'
  | 'karthus_passive_spell4'
  | 'karthus_passive_spell1'
  | 'karthus_spell1a'
  | 'Dance_In'
  | 'karthus_spell1_b'
  | 'karthus_spell1_c'
  | 'karthus_joke'
  | 'Run_Haste'
  | 'Spell3'
  | 'Idle2_Base'
  | 'karthus_passive_spell2'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Book2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall01_R_Shoulder} />
        <primitive object={nodes.Recall01_L_Shoulder} />
        <primitive object={nodes.Recall02_R_Shoulder} />
        <primitive object={nodes.Recall02_L_Shoulder} />
        <primitive object={nodes.Recall03_R_Shoulder} />
        <primitive object={nodes.Recall03_L_Shoulder} />
        <primitive object={nodes.Recall04_R_Shoulder} />
        <primitive object={nodes.Recall04_L_Shoulder} />
      </group>
      <group position={[-96.25, 0.28, -61.43]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.FrontCloth}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Arm}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
