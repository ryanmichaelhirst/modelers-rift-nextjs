import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    WEAPON: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    exile_redeemed_base_shade: THREE.MeshBasicMaterial
    blinn1SG2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack1_Ult'
  | 'Attack2'
  | 'Attack2_Ult'
  | 'Attack3'
  | 'riven_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit_Ult'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle1_Ult'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Spell1A'
  | 'riven_spell1a'
  | 'Spell1B'
  | 'riven_spell1b'
  | 'Spell1C'
  | 'riven_spell1c'
  | 'Spell2'
  | 'riven_spell2'
  | 'Spell3'
  | 'Spell3_ULT'
  | 'Spell4A'
  | 'Spell4B'
  | 'Taunt'
  | 'Joke'
  | 'Run'
  | 'Run_Ult'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.WEAPON} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.exile_redeemed_base_shade}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.blinn1SG2}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
