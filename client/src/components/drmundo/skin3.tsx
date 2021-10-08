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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    mesh_0_14: THREE.SkinnedMesh
    mesh_0_15: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon1_Snap: THREE.Bone
    Weapon1_Ult_Snap: THREE.Bone
    Phone_Ult_Snap: THREE.Bone
    Phone_Snap: THREE.Bone
    Car_Root: THREE.Bone
    Tie4_1: THREE.Bone
    Tie3_1: THREE.Bone
    Tie2_1: THREE.Bone
    Board_Root: THREE.Bone
  }
  materials: {
    BodyNormal: THREE.MeshBasicMaterial
    TieNormal: THREE.MeshBasicMaterial
    Tongue: THREE.MeshBasicMaterial
    BodyUlt: THREE.MeshBasicMaterial
    TieUlt: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Car: THREE.MeshBasicMaterial
    Tie2: THREE.MeshBasicMaterial
    Tie3: THREE.MeshBasicMaterial
    Tie4: THREE.MeshBasicMaterial
    Money: THREE.MeshBasicMaterial
    Board: THREE.MeshBasicMaterial
    Phone: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    WeaponUlt: THREE.MeshBasicMaterial
    PhoneUlt: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_In'
  | 'Death'
  | 'IdleVariant1'
  | 'Laugh'
  | 'spell2.dr_mundo_vgu'
  | 'Spell4_Run'
  | 'Taunt_Start'
  | 'KnockUp'
  | 'spell2activate.dr_mundo_vgu'
  | 'spell4_out.dr_mundo_vgu'
  | 'drmundo_run_passive.dr_mundo_vgu'
  | 'Idle_In'
  | 'idlein_passive.dr_mundo_vgu'
  | 'drmundo_run_-90.dr_mundo_vgu'
  | 'drmundo_run_90.dr_mundo_vgu'
  | 'Spell3'
  | 'drmundo_runpassive_90.dr_mundo_vgu'
  | 'drmundo_runpassive_-90.dr_mundo_vgu'
  | 'Run_Homeguard'
  | 'drmundo_idle02.dr_mundo_vgu'
  | 'attack_tower.dr_mundo_vgu'
  | 'attack1_toidle.dr_mundo_vgu'
  | 'attack1_0.dr_mundo_vgu'
  | 'attack1_90.dr_mundo_vgu'
  | 'attack1_-90.dr_mundo_vgu'
  | 'attack2_toidle.dr_mundo_vgu'
  | 'attack2_0.dr_mundo_vgu'
  | 'attack2_90.dr_mundo_vgu'
  | 'attack2_-90.dr_mundo_vgu'
  | 'crit_toidle.dr_mundo_vgu'
  | 'Spell4_Idle'
  | 'spell4_out_idle.dr_mundo_vgu'
  | 'spell1_0.dr_mundo_vgu'
  | 'spell1_90.dr_mundo_vgu'
  | 'Stunned'
  | 'spell1_-90.dr_mundo_vgu'
  | 'Spell1'
  | 'Spell1_ToIdle'
  | 'spell1_-180.dr_mundo_vgu'
  | 'spell1_180.dr_mundo_vgu'
  | 'Spell3_ToIdle'
  | 'Spell3_ToRun'
  | 'spell2activateidle.dr_mundo_vgu'
  | 'spell2idle.dr_mundo_vgu'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Joke_Start'
  | 'dance.dr_mundo_vgu'
  | 'drmundo_buffbone_snap.dr_mundo_vgu'
  | 'drmundo_buffbone_ult_snap.dr_mundo_vgu'
  | 'drmundo_idle01.dr_mundo_vgu'
  | 'Run01'
  | 'Run02'
  | 'drmundo_run_passive02.dr_mundo_vgu'
  | 'drmundo_idle03.dr_mundo_vgu'
  | 'Taunt_loop'
  | 'Joke_Loop'
  | 'Run_Homeguard_IN'
  | 'run_homeguard_to_idle.dr_mundo_vgu'
  | 'Run_Homeguard_To_Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon1_Snap} />
        <primitive object={nodes.Weapon1_Ult_Snap} />
        <primitive object={nodes.Phone_Ult_Snap} />
        <primitive object={nodes.Phone_Snap} />
        <primitive object={nodes.Car_Root} />
        <primitive object={nodes.Tie4_1} />
        <primitive object={nodes.Tie3_1} />
        <primitive object={nodes.Tie2_1} />
        <primitive object={nodes.Board_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.BodyNormal} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.TieNormal}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Tongue} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.BodyUlt} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.TieUlt} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Body} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Car} skeleton={nodes.mesh_0_6.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_7.geometry} material={materials.Tie2} skeleton={nodes.mesh_0_7.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Tie3} skeleton={nodes.mesh_0_8.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_9.geometry} material={materials.Tie4} skeleton={nodes.mesh_0_9.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_10.geometry} material={materials.Money} skeleton={nodes.mesh_0_10.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_11.geometry} material={materials.Board} skeleton={nodes.mesh_0_11.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_12.geometry} material={materials.Phone} skeleton={nodes.mesh_0_12.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Weapon}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.WeaponUlt}
        skeleton={nodes.mesh_0_14.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_15.geometry}
        material={materials.PhoneUlt}
        skeleton={nodes.mesh_0_15.skeleton}
      />
    </group>
  )
}
