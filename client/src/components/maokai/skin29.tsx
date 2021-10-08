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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Sapling_Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Seed3: THREE.Bone
    Seed2: THREE.Bone
    Seed1: THREE.Bone
    Tree: THREE.Bone
    SaplingHead_FX: THREE.Bone
    Tree5: THREE.Bone
    F1_Root: THREE.Bone
    F2_Root: THREE.Bone
    F3_Root: THREE.Bone
  }
  materials: {
    Glass: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Sapling: THREE.MeshBasicMaterial
    Tree: THREE.MeshBasicMaterial
    Meep: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell1'
  | 'maokai_spell2_down.skins_maokai_skin16'
  | 'Spell2U'
  | 'maokai_spell2_down_idle.skins_maokai_skin16'
  | 'Spell4'
  | 'Buffbones'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Sapling_Root} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Seed3} />
        <primitive object={nodes.Seed2} />
        <primitive object={nodes.Seed1} />
        <primitive object={nodes.Tree} />
        <primitive object={nodes.SaplingHead_FX} />
        <primitive object={nodes.Tree5} />
        <primitive object={nodes.F1_Root} />
        <primitive object={nodes.F2_Root} />
        <primitive object={nodes.F3_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Glass} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Body} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Sapling} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Tree} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Meep} skeleton={nodes.mesh_0_4.skeleton} />
    </group>
  )
}
