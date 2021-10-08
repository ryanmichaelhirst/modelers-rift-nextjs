import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    L_Sword: THREE.Bone
    R_Sword: THREE.Bone
    Smear_Sword: THREE.Bone
    Smear_Sword2: THREE.Bone
  }
  materials: {
    Zed_Main_Mat: THREE.MeshBasicMaterial
    Shurikens: THREE.MeshBasicMaterial
    R_Weapon: THREE.MeshBasicMaterial
    L_Weapon: THREE.MeshBasicMaterial
    Smear1: THREE.MeshBasicMaterial
    Smear2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_attack1'
  | 'zed_crit'
  | 'Death'
  | 'zed_idle1'
  | 'zed_idle2'
  | 'zed_idle3'
  | 'Laugh'
  | 'zed_run'
  | 'Run_Fast'
  | 'zed_spell1'
  | 'Spell2'
  | 'zed_spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Joke'
  | 'Run_Haste'
  | 'zed_idle_leadin1'
  | 'zed_run_leadin'
  | 'zed_idle4'
  | 'Channel_Wndup'
  | 'zed_channel_leadin'
  | 'zed_channel'
  | 'zed_dance_leadin'
  | 'zed_dance'
  | 'Joke_KG_Loss'
  | 'Joke_KG_Win'
  | 'zed_idle_leadin2'
  | 'zed_idle_leadin3'
  | 'Spell4_Strike'
  | 'zed_attack_spell4'
  | 'zed_attack2_part1'
  | 'zed_attack2'
  | 'zed_spell2_cast'
  | 'Spawn'
  | 'Recall_Winddown'
  | 'Recall'
  | 'zed_attack_passive'
  | 'zed_taunt_kg'
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
        <primitive object={nodes.L_Sword} />
        <primitive object={nodes.R_Sword} />
        <primitive object={nodes.Smear_Sword} />
        <primitive object={nodes.Smear_Sword2} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Zed_Main_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Shurikens}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.R_Weapon}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.L_Weapon}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Smear1}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Smear2}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
