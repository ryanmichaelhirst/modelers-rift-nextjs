import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    SoccerBall: THREE.Bone
    Soccer_Net_Root: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
  }
  materials: {
    Skin12_Recall_Mat: THREE.MeshBasicMaterial
    LeeSin_Base_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'Spell1B'
  | 'Taunt'
  | 'Recall'
  | 'additive_neck'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell2U'
  | 'Spell3'
  | 'Spell4'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.SoccerBall} />
        <primitive object={nodes.Soccer_Net_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin12_Recall_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.LeeSin_Base_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
