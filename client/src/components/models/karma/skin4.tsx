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
    L_Fan: THREE.Bone
    R_Fan: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Karma_Skin05_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'karma_2012_classic_dance'
  | 'karma_2012_classic_dance_loop'
  | 'karma_2012_idle_enter'
  | 'karma_2012_idle1'
  | 'karma_2012_idle2'
  | 'karma_2012_joke'
  | 'karma_2012_laugh'
  | 'karma_2012_run'
  | 'Spell1'
  | 'karma_2012_spell2'
  | 'karma_2012_spell3'
  | 'karma_2012_taunt'
  | 'Death'
  | 'DiskSpin'
  | 'Crit'
  | 'Attack1'
  | 'Attack2'
  | 'DiskSpinOnce'
  | 'Recall'
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
        <primitive object={nodes.L_Fan} />
        <primitive object={nodes.R_Fan} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Karma_Skin05_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-98.67, -1.34, -65.35]}
        scale={0.01}
      />
    </group>
  )
}
