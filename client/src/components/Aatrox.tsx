import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from '@react-three/fiber'
import aatrox from '../assets/aatrox.glb'

type GLTFResult = GLTF & {
  nodes: {
    Mesh_0001_1: THREE.SkinnedMesh
    Mesh_0001_2: THREE.SkinnedMesh
    Mesh_0001_3: THREE.SkinnedMesh
    Mesh_0001_4: THREE.SkinnedMesh
    Mesh_0001_5: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    RunPython: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Body_World: THREE.Bone
  }
  materials: {
    ['Wings.001']: THREE.MeshBasicMaterial
    ['Body.001']: THREE.MeshBasicMaterial
    ['Sword.001']: THREE.MeshBasicMaterial
    ['Shoulder.001']: THREE.MeshBasicMaterial
    ['Banner.001']: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'aatrox_attack1'
  | 'aatrox_attack3'
  | 'aatrox_attack_into_run'
  | 'aatrox_buffbones'
  | 'aatrox_channel'
  | 'aatrox_channel_windup'
  | 'aatrox_crit'
  | 'aatrox_dance_loop'
  | 'aatrox_dance_windup'
  | 'aatrox_death.unanimated_bones_use_local_transform'
  | 'aatrox_death_death_into_run1'
  | 'aatrox_death_death_into_run'
  | 'aatrox_death_finisher4'
  | 'aatrox_death_idle'
  | 'aatrox_death_into_idle'
  | 'aatrox_death_into_passiveidle'
  | 'aatrox_death_into_passiverun'
  | 'aatrox_death_run'
  | 'aatrox_ground_q1_into_idle'
  | 'aatrox_ground_q1_into_passiveidle'
  | 'aatrox_ground_q1'
  | 'aatrox_ground_q1_to_unsheathrun'
  | 'aatrox_ground_q2'
  | 'aatrox_ground_q2_to_idle'
  | 'aatrox_ground_q2_to_passiveidle'
  | 'aatrox_ground_q3_into_idle1'
  | 'aatrox_ground_q3_into_passive_idle'
  | 'aatrox_ground_q3_into_passiverun'
  | 'aatrox_ground_q3_into_run'
  | 'aatrox_ground_q3'
  | 'aatrox_idle1'
  | 'aatrox_idle_in_sheath'
  | 'aatrox_joke'
  | 'aatrox_laugh'
  | 'aatrox_passive_attack'
  | 'aatrox_passive_attack_out'
  | 'aatrox_passive_idle'
  | 'aatrox_passive_into_idle1'
  | 'aatrox_passive_into_shlth'
  | 'aatrox_passive_q1_into_run1'
  | 'aatrox_passive_q2_into_run'
  | 'aatrox_passive_run'
  | 'aatrox_q1_into_run'
  | 'aatrox_q2_into_run'
  | 'aatrox_recall'
  | 'aatrox_recall_winddown'
  | 'aatrox_resheath_fullbody'
  | 'aatrox_sheath_run01'
  | 'aatrox_sheath_run_haste'
  | 'aatrox_sheath_to_attack'
  | 'aatrox_skin01_recall'
  | 'aatrox_spell3_dash'
  | 'aatrox_spell3_dash_passive'
  | 'aatrox_spell3_dash_to_walk'
  | 'aatrox_spell3'
  | 'aatrox_spell3_passive'
  | 'aatrox_spell3_passive_to_run'
  | 'aatrox_spell3_to_walk'
  | 'aatrox_spell3_ult'
  | 'aatrox_spell3_unsheath'
  | 'aatrox_spell3_unsheath_to_idle'
  | 'aatrox_spell3_unsheath_to_run'
  | 'aatrox_spell4'
  | 'aatrox_spell_dash_running'
  | 'aatrox_stunned'
  | 'aatrox_taunt_loop'
  | 'aatrox_taunt'
  | 'aatrox_towerattack'
  | 'aatrox_ult_attack1'
  | 'aatrox_ult_attack2'
  | 'aatrox_ult_idle'
  | 'aatrox_ult_idlein'
  | 'aatrox_ult_into'
  | 'aatrox_ult'
  | 'aatrox_ult_out'
  | 'aatrox_ult_out_to_passive_idle'
  | 'aatrox_ult_q1'
  | 'aatrox_ult_q2'
  | 'aatrox_ult_q3'
  | 'aatrox_ult_run'
  | 'aatrox_ult_spell_dash'
  | 'aatrox_ult_spell_dash_to_run'
  | 'aatrox_ult_taunt_loop'
  | 'aatrox_ult_taunt'
  | 'aatrox_ult_towerattack'
  | 'aatrox_unsheath_idle1'
  | 'aatrox_unsheath'
  | 'aatrox_unsheath_run01'
  | 'aatrox_unsheath_to_passive'
  | 'aatrox_wings_null'
  | 'idle_into_passive_run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(aatrox) as GLTFResult
  const { actions } = useAnimations(animations, group)
  const aatroxActions = actions as GLTFActions

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    // @ts-ignore
    group.current.rotation.y = a * 0.3
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, 0]} scale={[-1, -1, -1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.RunPython} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Body_World} />
        <skinnedMesh
          geometry={nodes.Mesh_0001_1.geometry}
          material={materials['Wings.001']}
          skeleton={nodes.Mesh_0001_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0001_2.geometry}
          material={materials['Body.001']}
          skeleton={nodes.Mesh_0001_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0001_3.geometry}
          material={materials['Sword.001']}
          skeleton={nodes.Mesh_0001_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0001_4.geometry}
          material={materials['Shoulder.001']}
          skeleton={nodes.Mesh_0001_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Mesh_0001_5.geometry}
          material={materials['Banner.001']}
          skeleton={nodes.Mesh_0001_5.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(aatrox)
