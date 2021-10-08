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
    Horse_Root: THREE.Bone
    Horse_L_FrontLeg_Socket: THREE.Bone
    Horse_R_FrontLeg_Socket: THREE.Bone
    Horse_L_BackLeg_Socket: THREE.Bone
    Horse_R_BackLeg_Socket: THREE.Bone
    Main_Arrow: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    All_Purpose: THREE.Bone
    Bow_01: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Gun: THREE.Bone
    Arrow2World: THREE.Bone
    Hat2World: THREE.Bone
    Bow2World: THREE.Bone
    Hat: THREE.Bone
    MechaHawk_Base: THREE.Bone
    Recall1_Elbow: THREE.Bone
    Recall2_Elbow: THREE.Bone
    Recall3_Elbow: THREE.Bone
    Recall4_Elbow: THREE.Bone
    Poster_Base: THREE.Bone
  }
  materials: {
    Horse_Mat: THREE.MeshBasicMaterial
    Arrow_Mat: THREE.MeshBasicMaterial
    Cape_Mat: THREE.MeshBasicMaterial
    Collar_Mat: THREE.MeshBasicMaterial
    Body_Mat: THREE.MeshBasicMaterial
    Bow_Mat: THREE.MeshBasicMaterial
    String_Mat: THREE.MeshBasicMaterial
    Hat_Mat: THREE.MeshBasicMaterial
    MechaHawk_Mat: THREE.MeshBasicMaterial
    Transform_Mat: THREE.MeshBasicMaterial
    TransformCape_Mat: THREE.MeshBasicMaterial
    TransformCollar_Mat: THREE.MeshBasicMaterial
    TransformBow_Mat: THREE.MeshBasicMaterial
    Hands_Mat: THREE.MeshBasicMaterial
    Poster_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard'
  | 'Respawn'
  | 'Idle_Homeguard'
  | 'ashe_skin17_idle_homeguard_to_homeguard2'
  | 'Respawn_to_Idle_Homeguard'
  | 'Recall_Winddown'
  | 'ashe_skin17_homeguard_to_idle1'
  | 'ashe_skin17_homeguard_to_run_base'
  | 'Attack1'
  | 'Crit'
  | 'Death'
  | 'Laugh'
  | 'Run2'
  | 'Run3'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke'
  | 'Attack2'
  | 'Spell3'
  | 'Spell2'
  | 'ashe_skin17_taunt'
  | 'Spell1_In'
  | 'Idle1_In'
  | 'ashe_skin17_idle2'
  | 'ashe_skin17_run_base_variant'
  | 'ashe_skin17_run_base'
  | 'Spell3_IntoIdle'
  | 'ashe_skin17_run_variant_2'
  | 'Dance_In'
  | 'Dance_Base'
  | 'Idle_Variant2'
  | 'Spell4_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Spell2_To_Run'
  | 'Spell2_To_Idle'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'ashe_skin17_attack_to_run'
  | 'Crit_to_idle'
  | 'Crit_to_run'
  | 'Dance_Ult_Base'
  | 'Dance_Ult_IN'
  | 'Idle1_Base'
  | 'Spell3_IntoRun'
  | 'Idle1_Out'
  | 'ashe_skin17_run1_in'
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
        <primitive object={nodes.Horse_Root} />
        <primitive object={nodes.Horse_L_FrontLeg_Socket} />
        <primitive object={nodes.Horse_R_FrontLeg_Socket} />
        <primitive object={nodes.Horse_L_BackLeg_Socket} />
        <primitive object={nodes.Horse_R_BackLeg_Socket} />
        <primitive object={nodes.Main_Arrow} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.All_Purpose} />
        <primitive object={nodes.Bow_01} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Gun} />
        <primitive object={nodes.Arrow2World} />
        <primitive object={nodes.Hat2World} />
        <primitive object={nodes.Bow2World} />
        <primitive object={nodes.Hat} />
        <primitive object={nodes.MechaHawk_Base} />
        <primitive object={nodes.Recall1_Elbow} />
        <primitive object={nodes.Recall2_Elbow} />
        <primitive object={nodes.Recall3_Elbow} />
        <primitive object={nodes.Recall4_Elbow} />
        <primitive object={nodes.Poster_Base} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Horse_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Arrow_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Cape_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Collar_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Body_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Bow_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.String_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Hat_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.MechaHawk_Mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Transform_Mat}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.TransformCape_Mat}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.TransformCollar_Mat}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.TransformBow_Mat}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.Hands_Mat}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.Poster_Mat}
        skeleton={nodes.mesh_0_14.skeleton}
      />
    </group>
  )
}
