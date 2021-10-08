import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
    Snap_Bow1: THREE.Bone
    Snap_Bow2: THREE.Bone
    Snap_Crystal1: THREE.Bone
    Snap_Crystal2: THREE.Bone
    Snap_Crystal3: THREE.Bone
  }
  materials: {
    Varus_Skin09_MD_MAT: THREE.MeshBasicMaterial
    Varus_Skin09_Weapon_MD_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'varus_idle1'
  | 'varus_idle2'
  | 'varus_idle3'
  | 'varus_idle4'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Spell1'
  | 'Spell1_Walk'
  | 'Spell1_Idle'
  | 'Spell1_Fire'
  | 'Joke'
  | 'Run'
  | 'Run2'
  | 'Recall'
  | 'Respawn'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Healthbar} />
        <primitive object={nodes.Snap_Bow1} />
        <primitive object={nodes.Snap_Bow2} />
        <primitive object={nodes.Snap_Crystal1} />
        <primitive object={nodes.Snap_Crystal2} />
        <primitive object={nodes.Snap_Crystal3} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Varus_Skin09_MD_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Varus_Skin09_Weapon_MD_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
