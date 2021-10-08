import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Trundle_ForgottenDeities_MD_Trundle_ForgottenDeities_MAT1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'trundle_2013_idle2'
  | 'trundle_2013_idle3'
  | 'trundle_2013_laugh'
  | 'Spell1'
  | 'Spell1A'
  | 'Spell2'
  | 'Spell3'
  | 'trundle_2013_taunt'
  | 'trundle_2013_idle1'
  | 'trundle_2013_idle1_leadin_01'
  | 'Attack1'
  | 'Respawn'
  | 'Stun'
  | 'RunHomeguard'
  | 'Recall'
  | 'trundle_2013_run'
  | 'trundle_2013_runalt'
  | 'RunExhaust'
  | 'Joke'
  | '2013_Dance'
  | 'trundle_2013_recall'
  | '2013_Spell4'
  | 'Spell4'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Trundle_ForgottenDeities_MD_Trundle_ForgottenDeities_MAT1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
