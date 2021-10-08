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
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Tiny_Bow: THREE.Bone
    Arrow_B: THREE.Bone
    Arrow_A: THREE.Bone
    Rock: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Mask: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    RecallOne_SpiritWisp_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recallface: THREE.MeshBasicMaterial
    Maskface: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Props: THREE.MeshBasicMaterial
    SpiritWisp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Tpose'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Spell1Left'
  | 'Attack_Passive'
  | 'Crit'
  | 'Spell1Right'
  | 'lamb_spell2_arm.pie_c_10_16'
  | 'Spell3'
  | 'Spell1Forward'
  | 'Idle_Loop'
  | 'Attack3'
  | 'Attack1'
  | 'Idle_In'
  | 'Attack2'
  | 'Joke'
  | 'lamb_run'
  | 'lamb_run_variant01'
  | 'Spell1Back'
  | 'Laugh'
  | 'Spell3_2'
  | 'Dance_Base'
  | 'Dance_Loop'
  | 'Recall'
  | 'Death'
  | 'Spell4'
  | 'Taunt'
  | 'Spell2_Idle'
  | 'Respawn'
  | 'Channel'
  | 'Channel_Wndup'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Tiny_Bow} />
        <primitive object={nodes.Arrow_B} />
        <primitive object={nodes.Arrow_A} />
        <primitive object={nodes.Rock} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Mask} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.RecallOne_SpiritWisp_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Recallface}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Maskface}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Props} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.SpiritWisp}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
