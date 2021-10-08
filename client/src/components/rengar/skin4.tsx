import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
  }
  materials: {
    Rengar_Predator_Base_MD_Material: THREE.MeshBasicMaterial
  }
}

type ActionName =
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
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rengar_skin02_hood_on'
  | 'rengar_spell1_tra'
  | 'Spell1_Run2_TRA'
  | 'Spell1_Run_TRA'
  | 'Spell2_Run'
  | 'Spell4_Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Rengar_Predator_Base_MD_Material}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
