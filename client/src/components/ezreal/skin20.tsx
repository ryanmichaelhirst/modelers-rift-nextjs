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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    PetRoot: THREE.Bone
  }
  materials: {
    Ezreal_Skin20_MAT: THREE.MeshBasicMaterial
    Pet: THREE.MeshBasicMaterial
    Ezreal_Skin18_Wing_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ezreal_attack1'
  | 'ezreal_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_Windup'
  | 'ezreal_spell3_exit'
  | 'Spell3_Exit_NoTarget_Idle'
  | 'Run_To_Idle'
  | 'ezreal_idle2'
  | 'ezreal_run'
  | 'ezreal_attack4'
  | 'ezreal_attack2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Spell3_Exit_NoTarget_Run'
  | 'Spell3_Exit_Run'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Joke'
  | 'Spell3_Generic'
  | 'ezreal_spell3_exit_notarget'
  | 'Respawn'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'ezreal_skin18_homeguard'
  | 'ezreal_skin18_homeguard_variant'
  | 'Run_Homeguard_IN'
  | 'ezreal_skin18_recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.PetRoot} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Ezreal_Skin20_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Pet} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ezreal_Skin18_Wing_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
