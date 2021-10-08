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
    Khazix_Skin01_MD_update_lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'khazix_channel_loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'khazix_dance1'
  | 'Death'
  | 'khazix_idle1'
  | 'Laugh'
  | 'khazix_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'khazix_evo_overrides'
  | 'Evo2E'
  | 'khazix_attack_passive'
  | 'Evo2Q'
  | 'Evo2W'
  | 'Evo2R'
  | 'khazix_idle2'
  | 'Joke'
  | 'khazix_recall_loop'
  | 'Recall_Winddown'
  | 'Stunned'
  | 'KnockUp'
  | 'khazix_runfast1'
  | 'khazix_runfast2'
  | 'khazix_runbrush'
  | 'Spell1_Evo'
  | 'Spell2_Evo'
  | 'Spell3_Evo'
  | 'khazix_runwingjitter'
  | 'khazix_idle3'
  | 'khazix_runheadtwitch'
  | 'khazix_idle_leadin1'
  | 'khazix_idle_leadin2'
  | 'khazix_idle_leadin3'
  | 'khazix_idle4'
  | 'khazix_recall_windup'
  | 'khazix_droid_runfastfly'
  | 'khazix_droid_runfly'
  | 'Spell3_Evo_Landing'
  | 'Spell3_Evo_Standup'
  | 'Spell3_Landing'
  | 'Spell3_Standup'
  | 'khazix_channel_transition'
  | 'khazix_bbs'
  | 'khazix_dance2'
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
        material={materials.Khazix_Skin01_MD_update_lambert2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
