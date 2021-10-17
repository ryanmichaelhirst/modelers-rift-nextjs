import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    blinn2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Spell1B'
  | 'Spell2U'
  | 'Spell3'
  | 'Taunt'
  | 'Joke'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'Spell2'
  | 'Attack2'
  | 'Attack4'
  | 'Attack3'
  | 'Crit'
  | 'Attack1'
  | 'Run_Base'
  | 'leesin_muaythai_run_a'
  | 'Spell4'
  | 'Idle1_Base'
  | 'Run2_Mask'
  | 'Run_A_Mask'
  | 'leesin_muaythai_idle1a'
  | 'leesin_muaythai_idle1b'
  | 'Spell1'
  | 'Dance'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-44.13, 0, -22.89]}
        scale={0.01}
      />
    </group>
  )
}
