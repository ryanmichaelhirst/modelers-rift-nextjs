import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Owl_Root: THREE.Bone
    TotemA_Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    wings_mid_open: THREE.MeshBasicMaterial
    wings_open: THREE.MeshBasicMaterial
    Owl: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Channel_Loop'
  | 'morgana_skin26_channel_windup'
  | 'morgana_skin26_dance'
  | 'Death'
  | 'morgana_skin26_idle_var01'
  | 'morgana_skin26_laugh'
  | 'morgana_skin26_spell1_neg0'
  | 'Spell2'
  | 'Spell3'
  | 'morgana_skin26_taunt'
  | 'Idle_In1'
  | 'Attack1_To_Run_0'
  | 'Attack1_To_Run_90'
  | 'Attack1_To_Run_-90'
  | 'Attack1_To_Run_180'
  | 'Attack1_To_Run_-180'
  | 'Spell4_Run'
  | 'morgana_skin26_aa2_to_run_0'
  | 'Attack2_To_Run_-90'
  | 'Attack2_To_Run_-179'
  | 'Attack2_To_Run_90'
  | 'Attack2_To_Run_179'
  | 'Spell4_Idle1'
  | 'Spell1_180'
  | 'Idle_Base'
  | 'Spell4_Off'
  | 'Spell4_To_Idle'
  | 'Spell4_Attack1'
  | 'Spell2_To_Run_90'
  | 'Spell2_To_Run_179'
  | 'Spell2_To_Run_-90'
  | 'Spell2_to_Run_-179'
  | 'morgana_skin26_spell2_to_run_0'
  | 'Spell3_To_Run'
  | 'Spell3_To_Idle'
  | 'Run_Homeguard'
  | 'Spell2_To_Idle'
  | 'Run_Fast'
  | 'morgana_skin26_spell4_spell1_0'
  | 'morgana_skin26_spell4_spell1_179'
  | 'morgana_skin26_spell4_spell1_-179'
  | 'morgana_skin26_spell4_spell1_90'
  | 'morgana_skin26_spell4_spell1_-90'
  | 'morgana_skin26_spell4_spell2'
  | 'Spell4_Spell3'
  | 'Recall'
  | 'morgana_skin26_run_base'
  | 'Spell4'
  | 'morgana_skin26_idle_base_to_var'
  | 'Idle_In2'
  | 'Run_Slow'
  | 'Spell4_To_Run'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Attack2_To_Idle'
  | 'Attack1_To_Idle'
  | 'Spell1_-180'
  | 'morgana_skin26_spell1_pos0'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'morgana_skin26_idle_var02'
  | 'Idle_In3'
  | 'Run_Homeguard_IN'
  | 'Spell1_To_Idle'
  | 'Channel_In'
  | 'morgana_skin26_joke'
  | 'morgana_skin26_spell4_idle'
  | 'morgana_skin26_idle_var03'
  | 'Run_Haste'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Owl_Root} />
        <primitive object={nodes.TotemA_Recall_Root} />
      </group>
      <group position={[-111.08, -10.08, -117.37]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.wings_mid_open}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.wings_open}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Owl}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
