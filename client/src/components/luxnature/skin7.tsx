import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Weapon: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Nature_Staff: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Transform_Dark'
  | 'lux_skin07_run_homeguard'
  | 'Dance_Intro'
  | 'lux_skin07_recall_beginningall'
  | 'Transform_Magma'
  | 'Dance_Loop'
  | 'Channel'
  | 'Run_Haste'
  | 'Run_Homeguard_IN'
  | 'Transform_Nature'
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
  | 'Transform_Mystic'
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
  | 'Run_Slow'
  | 'lux_skin07_recall_exit_nature'
  | 'Run_Base'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Nature_Staff}
        skeleton={nodes.mesh_0.skeleton}
        position={[-62.55, -0.69, -54.25]}
        scale={0.02}
      />
    </group>
  )
}
