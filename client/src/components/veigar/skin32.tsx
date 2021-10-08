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
    Pelvis_Translate: THREE.Bone
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Asteroids: THREE.Bone
    Asteroids1: THREE.Bone
    Asteroids2: THREE.Bone
    Asteroids3: THREE.Bone
    Asteroids4: THREE.Bone
    Asteroids9: THREE.Bone
    Asteroids8: THREE.Bone
    Asteroids7: THREE.Bone
    Asteroids6: THREE.Bone
    Asteroids5: THREE.Bone
    F1_Root: THREE.Bone
    F2_Root: THREE.Bone
    F3_Root: THREE.Bone
  }
  materials: {
    Glass: THREE.MeshBasicMaterial
    Energy: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Asteroids: THREE.MeshBasicMaterial
    Meep: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Asteroids} />
        <primitive object={nodes.Asteroids1} />
        <primitive object={nodes.Asteroids2} />
        <primitive object={nodes.Asteroids3} />
        <primitive object={nodes.Asteroids4} />
        <primitive object={nodes.Asteroids9} />
        <primitive object={nodes.Asteroids8} />
        <primitive object={nodes.Asteroids7} />
        <primitive object={nodes.Asteroids6} />
        <primitive object={nodes.Asteroids5} />
        <primitive object={nodes.F1_Root} />
        <primitive object={nodes.F2_Root} />
        <primitive object={nodes.F3_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Glass} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Energy} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Body} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Asteroids}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Meep} skeleton={nodes.mesh_0_4.skeleton} />
    </group>
  )
}
