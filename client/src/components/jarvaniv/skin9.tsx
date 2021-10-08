import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Weapon1_World_Snap: THREE.Bone
    C_Buffbone_Cstm_FX1_Loc: THREE.Bone
    C_Buffbone_Cstm_FX2_Loc: THREE.Bone
    C_Buffbone_Cstm_FX3_Loc: THREE.Bone
    C_Buffbone_Cstm_FX4_Loc: THREE.Bone
    C_Buffbone_Cstm_FX5_Loc: THREE.Bone
    C_Buffbone_Glb_healthbar_Loc: THREE.Bone
  }
  materials: {
    Jarvan_Hextech_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'Passive'
  | 'Run'
  | 'Run3'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Spell6'
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Weapon1_World_Snap} />
        <primitive object={nodes.C_Buffbone_Cstm_FX1_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_FX2_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_FX3_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_FX4_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_FX5_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_healthbar_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jarvan_Hextech_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
