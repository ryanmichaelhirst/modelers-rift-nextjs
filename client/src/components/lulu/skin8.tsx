import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Weapon_Snap_To_World: THREE.Bone
  }
  materials: {
    Hat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lulu_run2'
  | 'lulu_idle2'
  | 'Channel'
  | 'lulu_skin05_attack1'
  | 'Eyes'
  | 'lulu_spell4'
  | 'lulu_idle1'
  | 'Run3'
  | 'Recall'
  | 'lulu_skin05_attack2'
  | 'lulu_spell3'
  | 'lulu_idle0'
  | 'lulu_idle4'
  | 'Channel_Wndup'
  | 'Spell4_Base'
  | 'Spell3_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Laugh'
  | 'lulu_idle3'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'Run_Base'
  | 'Dance'
  | 'lulu_skin05_run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Weapon_Snap_To_World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Hat} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
