import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    BuffBone_Glb_GROUND_Loc: THREE.Bone
    BuffBone_Glb_CHANNEL_Loc: THREE.Bone
  }
  materials: {
    ubyr_base_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'udyr_spirit_base_channelwndup'
  | 'Death'
  | 'udyr_spirit_tiger_idle'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'udyr_spirit_tiger_idle_enter'
  | 'Brush_Idle'
  | 'Dance'
  | 'udyr_spirit_base_emote'
  | 'udyr_spirit_base_emote_loop'
  | 'udyr_spirit_base_laugh_loop'
  | 'udyr_spirit_base_taunt_loop'
  | 'udyr_spirit_tiger_summon'
  | 'udyr_spirit_base_recall'
  | 'udyr_spirit_base_recallloop'
  | 'udyr_spirit_base_channelwndup_loop'
  | 'udyr_spirit_tiger_attackmax'
  | 'Attack1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.BuffBone_Glb_GROUND_Loc} />
        <primitive object={nodes.BuffBone_Glb_CHANNEL_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.ubyr_base_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-87.32, -0.59, -73.3]}
        scale={0.01}
      />
    </group>
  )
}
