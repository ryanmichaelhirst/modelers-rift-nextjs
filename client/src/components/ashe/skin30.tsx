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
    Main_Arrow: THREE.Bone
    Bow_01: THREE.Bone
    Bow_Trg: THREE.Bone
    R_Arm_Socket: THREE.Bone
    Cape_Master: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Arm_Socket: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Dragon_Root: THREE.Bone
    Dragon_R_DragonWing01: THREE.Bone
    Dragon_L_DragonWing01: THREE.Bone
  }
  materials: {
    VFXbow: THREE.MeshBasicMaterial
    Arrow: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Wings: THREE.MeshBasicMaterial
    Bow: THREE.MeshBasicMaterial
    Dragon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Laugh'
  | 'Recall'
  | 'Run'
  | 'Run2'
  | 'Run3'
  | 'Spell1'
  | 'Spell1_In'
  | 'Spell4'
  | 'Taunt'
  | 'ashe_skin09_taunt'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_R'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Joke'
  | 'Spell2'
  | 'Spell3'
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
        <primitive object={nodes.Main_Arrow} />
        <primitive object={nodes.Bow_01} />
        <primitive object={nodes.Bow_Trg} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.Cape_Master} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Dragon_Root} />
        <primitive object={nodes.Dragon_R_DragonWing01} />
        <primitive object={nodes.Dragon_L_DragonWing01} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.VFXbow} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Arrow} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Body} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Wings} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Bow} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Dragon} skeleton={nodes.mesh_0_5.skeleton} />
    </group>
  )
}
