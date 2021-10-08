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
    Root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    Weapon: THREE.Bone
    Weapon_Parent: THREE.Bone
  }
  materials: {
    polySurface82SG3: THREE.MeshBasicMaterial
    Fizz_Weapon_Mat: THREE.MeshBasicMaterial
    Fizz_Weapon_World_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'Death'
  | 'Idle6'
  | 'Joke'
  | 'Spell2'
  | 'fizz_skin04_spell3c'
  | 'Taunt'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell3A'
  | 'Spell3B'
  | 'Spell3C'
  | 'Spell4'
  | 'Recall'
  | 'Recall_Leadout'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Weapon_Parent} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.polySurface82SG3}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Fizz_Weapon_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Fizz_Weapon_World_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
