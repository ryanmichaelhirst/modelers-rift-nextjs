import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
    R_Buffbone_Glb_EyeGround_Loc: THREE.Bone
    L_Buffbone_Glb_EyeGround_Loc: THREE.Bone
    Dragon_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Dragon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel_In'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'idle3.pie_c_10_20'
  | 'Joke_In'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell1B'
  | 'Spell2'
  | 'spell3_cast.pie_c_10_20'
  | 'Spell3'
  | 'spell4_1.pie_c_10_20'
  | 'Taunt_In'
  | 'spell3_castmoving.pie_c_10_20'
  | 'Idle1_In'
  | 'Run_Homeguard'
  | 'Spell4_ToRun'
  | 'Run_Haste'
  | 'Spell4_ToIdle'
  | 'Spell1_Attack'
  | 'Joke_Loop'
  | 'Taunt'
  | 'Respawn'
  | 'Recall'
  | 'idle1_in_2.pie_c_10_20'
  | 'idle4.pie_c_10_20'
  | 'idle1_tohomeguard.pie_c_10_20'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Healthbar} />
        <primitive object={nodes.R_Buffbone_Glb_EyeGround_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_EyeGround_Loc} />
        <primitive object={nodes.Dragon_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Dragon}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
