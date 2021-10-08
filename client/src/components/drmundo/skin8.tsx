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
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    mesh_0_14: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    True_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    ToeTag_Root: THREE.Bone
    Clipboard: THREE.Bone
    runPython_node: THREE.Bone
    Weapon1_Snap: THREE.Bone
    Recall_WeaponLower: THREE.Bone
    Recall_WeaponUpper: THREE.Bone
  }
  materials: {
    BodyUlt: THREE.MeshBasicMaterial
    WreathUlt: THREE.MeshBasicMaterial
    BodyNormal: THREE.MeshBasicMaterial
    Tongue: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    L_Capacitor: THREE.MeshBasicMaterial
    R_Capacitor: THREE.MeshBasicMaterial
    Bag: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    L_CapacitorUlt: THREE.MeshBasicMaterial
    R_CapacitorUlt: THREE.MeshBasicMaterial
    WeaponUlt: THREE.MeshBasicMaterial
    ToeTag: THREE.MeshBasicMaterial
    Clipboard: THREE.MeshBasicMaterial
    WeaponRecall: THREE.MeshBasicMaterial
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
  | 'drmundo_run.dr_mundo_vgu'
  | 'drmundo_spell2.dr_mundo_vgu'
  | 'Spell4_Run'
  | 'Taunt'
  | 'KnockUp'
  | 'drmundo_spell2activate.dr_mundo_vgu'
  | 'drmundo_spell4_out.dr_mundo_vgu'
  | 'drmundo_run_passive.dr_mundo_vgu'
  | 'Idle_In'
  | 'drmundo_idle_in_passive.dr_mundo_vgu'
  | 'drmundo_runpassivetrans.dr_mundo_vgu'
  | 'drmundo_run_-90.dr_mundo_vgu'
  | 'drmundo_run_90.dr_mundo_vgu'
  | 'drmundo_spell2run.dr_mundo_vgu'
  | 'Spell3'
  | 'drmundo_runpassive_90.dr_mundo_vgu'
  | 'drmundo_runpassive_-90.dr_mundo_vgu'
  | 'Run_Homeguard'
  | 'drmundo_idle02.dr_mundo_vgu'
  | 'drmundo_attack_tower.dr_mundo_vgu'
  | 'drmundo_attack1_toidle.dr_mundo_vgu'
  | 'drmundo_attack1_0.dr_mundo_vgu'
  | 'drmundo_attack1_90.dr_mundo_vgu'
  | 'drmundo_attack1_-90.dr_mundo_vgu'
  | 'drmundo_attack2_toidle.dr_mundo_vgu'
  | 'drmundo_attack2_0.dr_mundo_vgu'
  | 'drmundo_attack2_90.dr_mundo_vgu'
  | 'drmundo_attack2_-90.dr_mundo_vgu'
  | 'drmundo_crit_toidle.dr_mundo_vgu'
  | 'Spell4_Idle'
  | 'drmundo_spell4_out_idle.dr_mundo_vgu'
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
  | 'drmundo_spell2activateidle.dr_mundo_vgu'
  | 'drmundo_spell2idle.dr_mundo_vgu'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Joke'
  | 'Dance_Loop'
  | 'drmundo_buffbone_snap.dr_mundo_vgu'
  | 'drmundo_buffbone_ult_snap.dr_mundo_vgu'
  | 'drmundo_idle01.dr_mundo_vgu'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.ToeTag_Root} />
        <primitive object={nodes.Clipboard} />
        <primitive object={nodes.runPython_node} />
        <primitive object={nodes.Weapon1_Snap} />
        <primitive object={nodes.Recall_WeaponLower} />
        <primitive object={nodes.Recall_WeaponUpper} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.BodyUlt}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.WreathUlt}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.BodyNormal}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Tongue}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.L_Capacitor}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.R_Capacitor}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Bag}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Weapon}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.L_CapacitorUlt}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.R_CapacitorUlt}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.WeaponUlt}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.ToeTag}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Clipboard}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.WeaponRecall}
        skeleton={nodes.mesh_0_14.skeleton}
      />
    </group>
  )
}
