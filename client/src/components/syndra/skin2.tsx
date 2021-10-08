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
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    syndra_watermage_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'syndra_attack1'
  | 'syndra_attack2'
  | 'Channel_Base'
  | 'syndra_channel_windup'
  | 'Death_Body'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'syndra_idle3'
  | 'syndra_idle4'
  | 'syndra_joke'
  | 'syndra_laugh'
  | 'syndra_skin02_recall_loop'
  | 'syndra_skin02_recall_windup'
  | 'Run'
  | 'Run1'
  | 'Run2'
  | 'syndra_spell1'
  | 'Spell2_Pull'
  | 'Spell3_Start'
  | 'syndra_spell4_start'
  | 'syndra_taunt'
  | 'Orbs'
  | 'Spell2_Throw'
  | 'syndra_death'
  | 'Recall_Winddown'
  | 'Spell3_Cast'
  | 'syndra_spell4_cast'
  | 'Dance_Base'
  | 'syndra_skin02_recall_leadout'
  | 'syndra_skin02_recall_winddown'
  | 'Idle1_Skirt'
  | 'Attack1_Skirt'
  | 'Attack2_Skirt'
  | 'Channel_Skirt'
  | 'syndra_skin02_channel_windup_skirt'
  | 'Death_Skirt'
  | 'Idle2_Skirt'
  | 'Idle3_Skirt'
  | 'Idle4_Skirt'
  | 'Joke_Skirt'
  | 'Laugh_Skirt'
  | 'Spell1_Skirt'
  | 'syndra_skin02_spell4_cast'
  | 'syndra_skin02_spell4_start'
  | 'Taunt_Skirt'
  | 'Dance_Hair'
  | 'Teleport_Windup_Skirt'
  | 'Teleport_Loop_Skirt'
  | 'syndra_recall_windup'
  | 'syndra_recall_loop'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.syndra_watermage_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
