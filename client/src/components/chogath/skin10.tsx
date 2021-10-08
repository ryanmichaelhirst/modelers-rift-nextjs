import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_CSTM_L_MISSILE_1: THREE.Bone
    BUFFBONE_CSTM_L_MISSILE_2: THREE.Bone
    BUFFBONE_CSTM_R_MISSILE_2: THREE.Bone
    BUFFBONE_CSTM_R_MISSILE_1: THREE.Bone
  }
  materials: {
    chogath_battlecast_MD_blinn3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Laugh'
  | 'Run'
  | 'Run1'
  | 'Run2'
  | 'Run3'
  | 'Run4'
  | 'Run5'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'Idle1'
  | 'chogath_battlecast_recall_loop'
  | 'chogath_battlecast_recall_windup'
  | 'Crit'
  | 'Attack1'
  | 'Recall_Winddown'
  | 'VorpalSpikes'
  | 'VorpalShoulder'
  | 'Run6'
  | 'Spell4'
  | 'Stacked'
  | 'Dance'
  | 'Joke'
  | 'Attack2'
  | 'Death'
  | 'Idle2'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_L_MISSILE_1} />
        <primitive object={nodes.BUFFBONE_CSTM_L_MISSILE_2} />
        <primitive object={nodes.BUFFBONE_CSTM_R_MISSILE_2} />
        <primitive object={nodes.BUFFBONE_CSTM_R_MISSILE_1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.chogath_battlecast_MD_blinn3}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
