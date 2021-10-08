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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_VFX_Prop01: THREE.Bone
    Buffbone_VFX_Prop02: THREE.Bone
    Buffbone_VFX_Prop03: THREE.Bone
    World_Space: THREE.Bone
    Lantern_Head: THREE.Bone
    PaperLantern01: THREE.Bone
    PaperLantern03: THREE.Bone
    PaperLantern05: THREE.Bone
    TeaCup: THREE.Bone
    Scroll01_Base: THREE.Bone
    Scroll02_Base: THREE.Bone
    Scroll03_Base: THREE.Bone
    Scroll04_Base: THREE.Bone
    Scroll05_Base: THREE.Bone
    Scroll06_Base: THREE.Bone
    Scroll07_Base: THREE.Bone
    Scroll08_Base: THREE.Bone
    Scroll09_Base: THREE.Bone
  }
  materials: {
    Thresh_Skin17_Body_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_VFX_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_Weapon_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_Weapon_Top_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_Weapon_Hook_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_Lantern_MAT: THREE.MeshBasicMaterial
    Thresh_Skin17_Demon_MAT: THREE.MeshBasicMaterial
    DemonLantern_MAT: THREE.MeshBasicMaterial
    PaperLantern_MAT: THREE.MeshBasicMaterial
    TeaCup_MAT: THREE.MeshBasicMaterial
    Scrolls_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death_In'
  | 'Idle1_Base'
  | 'Channel'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'idle3.pie_c_10_15'
  | 'Laugh'
  | 'Taunt_Base'
  | 'idle_in1.pie_c_10_15'
  | 'idle_in2.pie_c_10_15'
  | 'idle4.pie_c_10_15'
  | 'Respawn'
  | 'Spell3_P0'
  | 'spell3.pie_c_10_15'
  | 'Spell1_Grab'
  | 'Spell1_Dash'
  | 'Lantern_Open'
  | 'taunt.pie_c_10_15'
  | 'Dance_Loop'
  | 'spell3_l_90.pie_c_10_15'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'spell3_180.pie_c_10_15'
  | 'Lantern_Null'
  | 'spell1_pull2.pie_c_10_15'
  | 'attack1_mid_into_idle.pie_c_10_15'
  | 'attack2_mid_into_idle.pie_c_10_15'
  | 'attack1_short_into_idle.pie_c_10_15'
  | 'attack2_short_into_idle.pie_c_10_15'
  | 'attack2_long_into_idle.pie_c_10_15'
  | 'attack1_long_into_idle.pie_c_10_15'
  | 'transformation.pie_c_10_15'
  | 'transformation_into_run.pie_c_10_15'
  | 'run_base.pie_c_10_15'
  | 'Run_Homeguard'
  | 'attack1_mid_into_run.pie_c_10_15'
  | 'attack2_long_into_run.pie_c_10_15'
  | 'attack2_mid_into_run.pie_c_10_15'
  | 'attack1_long_into_run.pie_c_10_15'
  | 'attack1_long_into_run_fromleft.pie_c_10_15'
  | 'attack1_long_into_run_fromright.pie_c_10_15'
  | 'spell1_in.pie_c_10_15'
  | 'spell1_pull1.pie_c_10_15'
  | 'spell1_out.pie_c_10_15'
  | 'Run_Homeguard_IN'
  | 'attack1_short_into_run.pie_c_10_15'
  | 'attack2_short_into_run.pie_c_10_15'
  | 'Joke'
  | 'attack1_short_into_run_fromleft.pie_c_10_15'
  | 'attack1_short_into_run_fromright.pie_c_10_15'
  | 'attack2_short_into_run_fromleft.pie_c_10_15'
  | 'attack2_short_into_run_fromright.pie_c_10_15'
  | 'attack2_long_into_run_fromleft.pie_c_10_15'
  | 'attack2_long_into_run_fromright.pie_c_10_15'
  | 'Recall'
  | 'Run_In'
  | 'Spell1_Into_Run'
  | 'spell1_pull2_into_run.pie_c_10_15'
  | 'Recall_Winddown'
  | 'Run_Variant1'
  | 'Run_Variant2'
  | 'Spell4_Idle'
  | 'Spell4_Run'
  | 'Spell4_To_Run'
  | 'Death_Loop'
  | 'Run_Fast'
  | 'Run_Fast_In'
  | 'run_haste_out.pie_c_10_15'
  | 'Spell2_Idle'
  | 'spell2_running.pie_c_10_15'
  | 'dance_loop.pie_c_10_15'
  | 'joke.pie_c_10_15'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_VFX_Prop01} />
        <primitive object={nodes.Buffbone_VFX_Prop02} />
        <primitive object={nodes.Buffbone_VFX_Prop03} />
        <primitive object={nodes.World_Space} />
        <primitive object={nodes.Lantern_Head} />
        <primitive object={nodes.PaperLantern01} />
        <primitive object={nodes.PaperLantern03} />
        <primitive object={nodes.PaperLantern05} />
        <primitive object={nodes.TeaCup} />
        <primitive object={nodes.Scroll01_Base} />
        <primitive object={nodes.Scroll02_Base} />
        <primitive object={nodes.Scroll03_Base} />
        <primitive object={nodes.Scroll04_Base} />
        <primitive object={nodes.Scroll05_Base} />
        <primitive object={nodes.Scroll06_Base} />
        <primitive object={nodes.Scroll07_Base} />
        <primitive object={nodes.Scroll08_Base} />
        <primitive object={nodes.Scroll09_Base} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Thresh_Skin17_Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Thresh_Skin17_VFX_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Thresh_Skin17_Weapon_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Thresh_Skin17_Weapon_Top_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Thresh_Skin17_Weapon_Hook_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Thresh_Skin17_Lantern_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Thresh_Skin17_Demon_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.DemonLantern_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.PaperLantern_MAT}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.TeaCup_MAT}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Scrolls_MAT}
        skeleton={nodes.mesh_0_10.skeleton}
      />
    </group>
  )
}
