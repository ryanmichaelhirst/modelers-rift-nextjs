import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_CSTM_HEALTHBAR: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Buffbone_Cstm_Recall_3: THREE.Bone
    Buffbone_Cstm_Recall_2: THREE.Bone
    Buffbone_Cstm_Recall_1: THREE.Bone
  }
  materials: {
    initialShadingGroup2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack_Tumble'
  | 'Attack_Ult'
  | 'Attack_TumbleUlt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'vayne_tumble_idle1'
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Run_Tumble'
  | 'Run_Ult'
  | 'vayne_tumbleult_run'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_CSTM_HEALTHBAR} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Recall_3} />
        <primitive object={nodes.Buffbone_Cstm_Recall_2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.initialShadingGroup2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
