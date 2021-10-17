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
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Karma_Snowdown_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Taunt_Base'
  | 'Recall_Winddown'
  | 'Channel'
  | 'karma_2012_run'
  | 'Attack1'
  | 'Attack2'
  | 'Recall'
  | 'Dance_Base'
  | 'Idle1_Base'
  | 'IdleLoop'
  | 'DiskSpinOnce'
  | 'DiskSpin'
  | 'karma_2012_spell2'
  | 'Crit'
  | 'karma_2012_joke'
  | 'karma_2012_laugh'
  | 'Channel_Wndup'
  | 'Spell3_Base'
  | 'Spell1'
  | 'Death'
  | 'Idle2_Base'
  | 'karma_2012_idle_enter'
  | 'karma_2012_dance_loop'
  | 'Run_Fast'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Karma_Snowdown_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-51.97, -0.3, -46.22]}
        scale={0.01}
      />
    </group>
  )
}
