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
    Pelvis_Translate: THREE.Bone
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_Buffbone_Glb_Ground_Loc: THREE.Bone
    Recall_Buffbone_Glb_Channel_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_Center_Loc: THREE.Bone
    Recall_Root_Plush: THREE.Bone
  }
  materials: {
    Veigar_Skin23_Body: THREE.MeshBasicMaterial
    Eyes1: THREE.MeshBasicMaterial
    Eyes2: THREE.MeshBasicMaterial
    Eyes3: THREE.MeshBasicMaterial
    pet: THREE.MeshBasicMaterial
    plush: THREE.MeshBasicMaterial
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
  | 'Laugh'
  | 'Recall'
  | 'Run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Spell1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Pelvis_Translate} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Recall_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Recall_Root_Plush} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Veigar_Skin23_Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Eyes1} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Eyes2} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Eyes3} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.pet} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.plush} skeleton={nodes.mesh_0_5.skeleton} />
    </group>
  )
}
