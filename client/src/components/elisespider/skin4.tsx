import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
  }
  materials: {
    EliseSpider_SKT_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Run_Base'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'elisespider_idle1'
  | 'elisespider_idle1_in'
  | 'KnockedUp'
  | 'Spell1'
  | 'elisespider_spell3_c'
  | 'elisespider_spell3_d'
  | 'elisespider_spell3_e'
  | 'Stunned'
  | 'elisespider_recall_loop'
  | 'elisespider_recall_wndup'
  | 'elisespider_run1'
  | 'Attack3'
  | 'Crit'
  | 'elisespider_joke'
  | 'elisespider_laugh'
  | 'elisespider_taunt'
  | 'Spell2'
  | 'Death'
  | 'elisespider_idle2'
  | 'elisespider_idle3'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.EliseSpider_SKT_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
