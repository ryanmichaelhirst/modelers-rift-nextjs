import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Balloon_Root: THREE.Bone
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    recallGeo: THREE.MeshBasicMaterial
    Lulu_Skin04_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall_Leadout'
  | 'Recall'
  | 'lulu_idle2'
  | 'Channel'
  | 'Run_Haste'
  | 'Run'
  | 'lulu_spell3'
  | 'Attack1'
  | 'lulu_idle1'
  | 'Attack2'
  | 'Run3'
  | 'lulu_idle0'
  | 'lulu_idle4'
  | 'Crit'
  | 'Channel_Wndup'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Laugh'
  | 'Spell4'
  | 'lulu_idle3'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'Dance'
  | 'Run_Fast'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Balloon_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.recallGeo} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Lulu_Skin04_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
