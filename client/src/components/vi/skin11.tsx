import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Ground: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Teacup: THREE.Bone
    Buffbone_Cstm_Spell1: THREE.Bone
    L_IN_Hand: THREE.Bone
    R_IN_Hand: THREE.Bone
    Hologram_Main: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Glove: THREE.MeshBasicMaterial
    Goggle: THREE.MeshBasicMaterial
    Orig_Hand: THREE.MeshBasicMaterial
    Recall_Hand: THREE.MeshBasicMaterial
    VI_Skin11_Body_MAT: THREE.MeshBasicMaterial
    Jhin_Holo: THREE.MeshBasicMaterial
    L_Holo: THREE.MeshBasicMaterial
    R_Holo: THREE.MeshBasicMaterial
    Teacup: THREE.MeshBasicMaterial
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
  | 'vi_skin11_spell1_idle'
  | 'vi_skin11_spell1_idleintro'
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
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Buffbone_Cstm_Spell1} />
        <primitive object={nodes.L_IN_Hand} />
        <primitive object={nodes.R_IN_Hand} />
        <primitive object={nodes.Hologram_Main} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Glove} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Goggle} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Orig_Hand}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Recall_Hand}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.VI_Skin11_Body_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Jhin_Holo}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.L_Holo} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.R_Holo} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Teacup} skeleton={nodes.mesh_0_8.skeleton} />
    </group>
  )
}
