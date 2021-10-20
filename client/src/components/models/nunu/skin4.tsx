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
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    Root_Wil: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Plug_Base: THREE.Bone
    Snowman_Root: THREE.Bone
  }
  materials: {
    Nunu_Skin04_Mat: THREE.MeshBasicMaterial
    willump: THREE.MeshBasicMaterial
    screen: THREE.MeshBasicMaterial
    claws_long: THREE.MeshBasicMaterial
    face: THREE.MeshBasicMaterial
    recall: THREE.MeshBasicMaterial
    snowman: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death_In'
  | 'Idle_Base'
  | 'Idle_Variant01'
  | 'Idle_Variant02'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Run'
  | 'Spell3_0'
  | 'Spell4'
  | 'Spell4_ToIdle'
  | 'Taunt'
  | 'Recall'
  | 'nunu_skin04_homeguard01'
  | 'Run_Fast'
  | 'Run_Variant01'
  | 'Spell4_ToRun'
  | 'Spell2_Release'
  | 'Spell2_In'
  | 'Spell1_Swallow'
  | 'nunu_spell1_torun01'
  | 'nunu_skin04_spell1_swallow_toidle'
  | 'Spell1_ToIdle01'
  | 'Spell3_R'
  | 'Spell3_L'
  | 'nunu_skin04_attack_bloodboil01'
  | 'nunu_skin04_attack_bloodboil02'
  | 'nunu_skin04_homeguard01_in'
  | 'Crit_Out'
  | 'nunu_idle01'
  | 'Attack_TowerHit01'
  | 'Attack_TowerHit01_Out'
  | 'nunu_skin04_attack_bloodboil02_out'
  | 'nunu_skin04_attack_bloodboil01_out'
  | 'Run_Bloodboil01'
  | 'Spell3_Out'
  | 'nunu_skin04_idlebloodboil01'
  | 'nunu_idlebloodboil01_in'
  | 'Idle_In'
  | 'nunu_idle01_var03'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Joke'
  | 'nunu_run_homeguard01_torun'
  | 'Respawn'
  | 'Spawn'
  | 'nunu_skin04_respawn01_toidle'
  | 'nunu_skin04_respawn01_torun'
  | 'Recall_Winddown'
  | 'Spell3_ToRun'
  | 'Spell3_ToIdle'
  | 'Attack1_ToIdle'
  | 'Attack2_ToIdle'
  | 'Spell2_Release_toRun'
  | 'nunu_spell3_toidle'
  | 'Run_Slow'
  | 'Death_Loop'
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
        <primitive object={nodes.Root_Wil} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Plug_Base} />
        <primitive object={nodes.Snowman_Root} />
      </group>
      <group position={[-113.4, -8.04, -86.15]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Nunu_Skin04_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.willump}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.screen}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.claws_long}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.face}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.recall}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.snowman}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}
