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
    Weapon: THREE.Bone
    Back_Speakers: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Zero_Loc: THREE.Bone
  }
  materials: {
    Base: THREE.MeshBasicMaterial
    Holo: THREE.MeshBasicMaterial
    Hair: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sona_skin06_attack1'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death_Base'
  | 'Idle1'
  | 'sona_skin06_joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1_Upper'
  | 'sona_skin06_spell2'
  | 'Spell3_Upper'
  | 'sona_skin06_spell4'
  | 'Taunt_Base'
  | 'sona_skin06form2_deckeffects'
  | 'sona_skin06_attack2'
  | 'sona_skin06_run_in'
  | 'sona_skin06form2_idle_in'
  | 'Recall'
  | 'Channel_In'
  | 'Turn_0'
  | 'Turn_90'
  | 'Turn_-90'
  | 'Turn_180'
  | 'Turn_-180'
  | 'sona_skin06_respawn_windup'
  | 'sona_skin06_transition_in'
  | 'sona_skin06_transition_out'
  | 'Respawn_Loop'
  | 'sona_skin06_respawn_to_run'
  | 'sona_skin06_joke_holograms'
  | 'sona_skin06_death_holograms'
  | 'sona_skin06_respawn_windup_holograms'
  | 'sona_skin06_transition_in_holograms'
  | 'sona_skin06_transition_out_holograms'
  | 'sona_skin06_taunt_holograms'
  | 'Recall_Leadout'
  | 'Crit_Low'
  | 'sona_skin06_spell1'
  | 'sona_skin06_spell3'
  | 'Run_Haste'
  | 'sona_skin06_recall_winddown'
  | 'Death_Low'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Back_Speakers} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Zero_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Base} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Holo} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Hair} skeleton={nodes.mesh_0_2.skeleton} />
    </group>
  )
}
