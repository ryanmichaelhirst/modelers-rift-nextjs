import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    Healthbar: THREE.Bone
    Snap_ExoToWorld: THREE.Bone
  }
  materials: {
    Skin16_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_In'
  | 'Crit'
  | 'Dance'
  | 'Dance_In'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'missfortune_skin16_idle3'
  | 'Idle_In'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run'
  | 'Run2'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Run_In'
  | 'Run_In2'
  | 'Run_W2'
  | 'Run_W2_in'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4_Loop'
  | 'missfortune_skin16_spell4_to_idle'
  | 'Spell4_Windup'
  | 'Taunt'
  | 'Respawn'
  | 'missfortune_skin16_spell4_g1_loop'
  | 'missfortune_skin16_spell4_g1_transtoidle'
  | 'missfortune_skin16_spell4_g2_loop'
  | 'missfortune_skin16_spell4_g2_transtoidle'
  | 'missfortune_skin16_spell4_g3_loop'
  | 'missfortune_skin16_spell4_g3_transtoidle'
  | 'missfortune_skin16_spell4_g1_windup'
  | 'missfortune_skin16_spell4_g2_windup'
  | 'missfortune_skin16_spell4_g3_windup'
  | 'Equip'
  | 'Idle_In2'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.Healthbar} />
        <primitive object={nodes.Snap_ExoToWorld} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Skin16_MAT} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
