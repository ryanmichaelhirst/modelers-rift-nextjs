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
    R_Buffbone_Cstm_Recall: THREE.Bone
    L_Buffbone_Cstm_Recall: THREE.Bone
  }
  materials: {
    Arms: THREE.MeshBasicMaterial
    Evolved_Arms: THREE.MeshBasicMaterial
    aWings: THREE.MeshBasicMaterial
    Carapace: THREE.MeshBasicMaterial
    Black_Hole: THREE.MeshBasicMaterial
    Khazix_Skin04_Base: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'khazix_attack_passive'
  | 'Attack2'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Evo2E'
  | 'Evo2Q'
  | 'Evo2R'
  | 'Evo2W'
  | 'khazix_evo_overrides'
  | 'khazix_bbs'
  | 'Joke'
  | 'KnockUp'
  | 'Laugh'
  | 'khazix_runheadtwitch'
  | 'khazix_runwingjitter'
  | 'khazix_channel_loop'
  | 'khazix_channel_transition'
  | 'khazix_dance1'
  | 'khazix_dance2'
  | 'khazix_idle1'
  | 'khazix_idle2'
  | 'khazix_idle3'
  | 'khazix_idle4'
  | 'khazix_idle_leadin1'
  | 'khazix_idle_leadin2'
  | 'khazix_idle_leadin3'
  | 'khazix_recall_loop'
  | 'khazix_recall_windup'
  | 'khazix_run'
  | 'khazix_runfly'
  | 'khazix_runfast1'
  | 'khazix_runfastfly'
  | 'khazix_runfast2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'khazix_runbrush'
  | 'Spell1'
  | 'Spell1_Evo'
  | 'Spell2'
  | 'Spell2_Evo'
  | 'Spell3'
  | 'Spell3_Evo'
  | 'Spell3_Evo_Landing'
  | 'Spell3_Landing'
  | 'Spell3_Standup'
  | 'Taunt'
  | 'Spell3_Evo_Standup'
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
        <primitive object={nodes.R_Buffbone_Cstm_Recall} />
        <primitive object={nodes.L_Buffbone_Cstm_Recall} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Arms}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Evolved_Arms}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.aWings}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Carapace}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Black_Hole}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Khazix_Skin04_Base}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
