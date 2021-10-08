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
    Chair_Skin10: THREE.Bone
    Step2_Skin10: THREE.Bone
    Step1_Skin10: THREE.Bone
  }
  materials: {
    UPD_Zed_Championship_MD_Zed_Championship_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_idle1'
  | 'zed_run'
  | 'zed_spell1'
  | 'Spell2'
  | 'zed_spell3'
  | 'Joke'
  | 'zed_idle_leadin1'
  | 'zed_run_leadin'
  | 'zed_dance_leadin'
  | 'zed_dance'
  | 'Taunt_SH'
  | 'Joke_SH_Loss'
  | 'Joke_SH_Win'
  | 'zed_idle_leadin2'
  | 'zed_idle_leadin3'
  | 'Spell4_Strike'
  | 'Dance'
  | 'Taunt'
  | 'Attack_Spell4'
  | 'Spawn'
  | 'Laugh'
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
        <primitive object={nodes.Chair_Skin10} />
        <primitive object={nodes.Step2_Skin10} />
        <primitive object={nodes.Step1_Skin10} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.UPD_Zed_Championship_MD_Zed_Championship_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
