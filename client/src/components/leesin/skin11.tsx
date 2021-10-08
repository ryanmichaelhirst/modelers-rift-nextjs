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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    lambert13SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Spell2U'
  | 'Spell3'
  | 'Taunt'
  | 'Joke'
  | 'Recall'
  | 'Spell2'
  | 'Crit'
  | 'Idle1'
  | 'Recall_Winddown'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Godfist'
  | 'Respawn'
  | 'leesin_skin11_run1'
  | 'leesin_skin11_run2idle'
  | 'leesin_skin11_spell1'
  | 'Spell1Long'
  | 'Spell1longtrans'
  | 'Spell1mid'
  | 'Spell1midtrans'
  | 'Spell1Short'
  | 'Spell1shorttrans'
  | 'leesin_skin11_spell4a'
  | 'leesin_skin11_spell4b'
  | 'leesin_skin11_spell4c'
  | 'Attack_Lfinish'
  | 'Attack_Rkick'
  | 'leesin_skin11_attack_lpunch'
  | 'leesin_skin11_attack_kick02'
  | 'leesin_skin11_attack_rpunch'
  | 'leesin_skin11_run2runb'
  | 'RunB'
  | 'leesin_skin11_runbtorun'
  | 'Run_Homeguard'
  | 'Spell1_Upper'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert13SG1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
