import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
  }
  materials: {
    Diana_Skin03: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'diana_attack1'
  | 'diana_attack2'
  | 'Channel_Base'
  | 'diana_channel_wndup'
  | 'Dance_Base'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'diana_idle3'
  | 'diana_laugh'
  | 'Run_Base'
  | 'diana_spell2'
  | 'Spell3_Base'
  | 'Taunt_Base'
  | 'diana_run_fast'
  | 'diana_spell1'
  | 'diana_joke'
  | 'diana_attack3'
  | 'Spell4_Base'
  | 'diana_run_slow'
  | 'diana_run_slow_back'
  | 'diana_run_haste'
  | 'diana_skin02_idle1'
  | 'diana_skin02_run'
  | 'Recall'
  | 'Recall_Leadout'
  | 'diana_skin02_attack1'
  | 'diana_skin02_attack2'
  | 'diana_skin02_attack3'
  | 'diana_skin02_channel'
  | 'diana_skin02_channel_wndup'
  | 'diana_skin02_dance'
  | 'diana_skin02_idle2'
  | 'diana_skin02_idle3'
  | 'diana_skin02_joke'
  | 'diana_skin02_laugh'
  | 'diana_skin02_run_fast'
  | 'diana_skin02_run_haste'
  | 'diana_skin02_run_slow'
  | 'diana_skin02_run_slow_back'
  | 'diana_skin02_spell1'
  | 'diana_skin02_spell2'
  | 'diana_skin02_spell3'
  | 'diana_skin02_spell4'
  | 'diana_skin02_taunt'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Diana_Skin03}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
