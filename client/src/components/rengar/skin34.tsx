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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Smook01: THREE.Bone
    Smook02: THREE.Bone
    Smook03: THREE.Bone
    Snap_Weapon: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Laugh'
  | 'Run'
  | 'Run2'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Spell5'
  | 'Spell6'
  | 'Taunt'
  | 'rengar_recall'
  | 'rengar_recall_idle'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Joke'
  | 'Run1_Fast'
  | 'Attack4'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rengar_skin02_hood_on'
  | 'rengar_spell1_tra'
  | 'Spell1_Run2_TRA'
  | 'Spell1_Run_TRA'
  | 'Spell2_Idle'
  | 'Spell2_Run'
  | 'Spell4_Idle'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Smook01} />
        <primitive object={nodes.Smook02} />
        <primitive object={nodes.Smook03} />
        <primitive object={nodes.Snap_Weapon} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_1.skeleton} />
    </group>
  )
}
