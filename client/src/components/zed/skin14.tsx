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
    L_Shuriken_World: THREE.Bone
    R_Shuriken_World: THREE.Bone
  }
  materials: {
    blinn3: THREE.MeshBasicMaterial
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
  | 'zed_skin03_run'
  | 'Run_Fast'
  | 'zed_spell1'
  | 'Spell2'
  | 'zed_spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Joke'
  | 'Run_Haste'
  | 'zed_idle_leadin1'
  | 'zed_skin03_run_leadin'
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
  | 'Recall_Leadout'
  | 'zed_attack_passive'
  | 'zed_taunt_kg'
  | 'Recall'
  | 'zed_skin03_respawn'
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
        <primitive object={nodes.L_Shuriken_World} />
        <primitive object={nodes.R_Shuriken_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blinn3}
        skeleton={nodes.mesh_0.skeleton}
        position={[-87.7, 0.32, -41.59]}
        scale={0.01}
      />
    </group>
  )
}
