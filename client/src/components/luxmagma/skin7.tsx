import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon: THREE.Bone
  }
  materials: {
    Magma_Body: THREE.MeshBasicMaterial
    Magma_Lines: THREE.MeshBasicMaterial
    Magma_Collar: THREE.MeshBasicMaterial
    Magma_Staff: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lux_skin07_run_homeguard'
  | 'Dance_Intro'
  | 'lux_skin07_recall_beginningall'
  | 'Transform_Magma'
  | 'Dance_Loop'
  | 'Channel'
  | 'Run_Haste'
  | 'Run_Homeguard_IN'
  | 'lux_skin07_idle1'
  | 'Attack1'
  | 'Attack3'
  | 'Attack2'
  | 'Run_Variation'
  | 'Crit'
  | 'Idle3'
  | 'Idle2'
  | 'Idle1'
  | 'Respawn'
  | 'Idle4'
  | 'Channel_Wndup'
  | 'Recall_Winddown'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Laugh'
  | 'Idle_In'
  | 'Spell4'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'TurnR'
  | 'Run_Slow'
  | 'TurnL'
  | 'lux_skin07_recall_exit_magma'
  | 'Run_Base'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Magma_Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Magma_Lines}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Magma_Collar}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Magma_Staff}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
