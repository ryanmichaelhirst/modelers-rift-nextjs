import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Gun_Body: THREE.Bone
    Wraith_Ground0: THREE.Bone
    True_World: THREE.Bone
    Snap_HatToWorld: THREE.Bone
    Horse_Root: THREE.Bone
    Horse_L_Buffbone_Cstm_FrontHoof: THREE.Bone
    Horse_R_Buffbone_Cstm_FrontHoof: THREE.Bone
    Horse_L_Buffbone_Cstm_BackHoof: THREE.Bone
    Horse_R_Buffbone_Cstm_BackHoof: THREE.Bone
    MechaBull_Root: THREE.Bone
  }
  materials: {
    Body_Mat: THREE.MeshBasicMaterial
    Gun_Handle: THREE.MeshBasicMaterial
    WraithForm: THREE.MeshBasicMaterial
    Horse: THREE.MeshBasicMaterial
    Horse_VFX: THREE.MeshBasicMaterial
    Mane_VFX: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Loop'
  | 'Channel_In'
  | 'senna_crit01.pie_c_10_12'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle01'
  | 'Laugh'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_In'
  | 'Idle01_Var01'
  | 'senna_run01.pie_c_legacy_bugs_10_15'
  | 'spell2_toidle02.pie_c_10_12'
  | 'spell2_torun_0.pie_c_10_12'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'senna_skin10_homeguard.pie_c_10_12'
  | 'recall.pie_c_10_12'
  | 'Walk01'
  | 'Run01_toWalk01'
  | 'Run01_in_Var01'
  | 'Idle02'
  | 'Attack1_0'
  | 'Attack2_0'
  | 'senna_attack01_out.pie_c_10_12'
  | 'senna_attack02_out.pie_c_10_12'
  | 'senna_attack03_out.pie_c_10_12'
  | 'Walk01_toIdle01'
  | 'Spell2_To_Run_90'
  | 'Spell2_To_Run_-90'
  | 'spell2_torun_-180.pie_c_10_12'
  | 'spell2_torun_180.pie_c_10_12'
  | 'Spell3_Idle'
  | 'senna_skin10_walk01_turn_0.pie_c_10_12'
  | 'Spell3_To_Idle'
  | 'Spell3_Run'
  | 'Idle02_Var01'
  | 'senna_attack01_out_0.pie_c_10_12'
  | 'senna_attack01_out_90.pie_c_10_12'
  | 'Spell1'
  | 'Idle02_toRun01'
  | 'senna_attackpassive01.pie_c_10_12'
  | 'senna_attackpassive01_toidle.pie_c_10_12'
  | 'senna_skin10_run01_turn_0.pie_c_10_12'
  | 'senna_skin10_walk01_turn_-90.pie_c_10_12'
  | 'senna_skin10_run01_turn_90.pie_c_10_12'
  | 'senna_skin10_homeguard_turn_0.pie_c_10_12'
  | 'senna_skin10_homeguard_turn_90.pie_c_10_12'
  | 'senna_skin10_homeguard_turn-90.pie_c_10_12'
  | 'Attack3_0'
  | 'Spell3_To_Run'
  | 'Spell3_Out_toRun'
  | 'Spell3_Out_toIdle'
  | 'senna_attackpassive01_torun.pie_c_10_12'
  | 'Idle02_toIdle01'
  | 'Spell1_ToIdle'
  | 'spell2.pie_c_10_12'
  | 'Spawn_In'
  | 'Spell3_InRun'
  | 'Spell3_InIdle'
  | 'Joke_In'
  | 'Respawn'
  | 'Attack1_-90'
  | 'Attack1_90'
  | 'Crit_Out'
  | 'senna_attack01_out_-90.pie_c_10_12'
  | 'Attack2_90'
  | 'Attack2_-90'
  | 'Attack3_90'
  | 'Attack3_-90'
  | 'senna_crit01_90.pie_c_10_12'
  | 'senna_crit01_-90.pie_c_10_12'
  | 'Idle01_toIdle02'
  | 'Run01_Var01'
  | 'senna_skin10_homeguard_out_to_run.pie_c_10_12'
  | 'senna_skin10_homeguard_out_to_idle.pie_c_10_12'
  | 'Run_Homeguard_IN'
  | 'Joke_Loop'
  | 'senna_skin10_idle_homeguard_to_homeguard.pie_c_10_12'
  | 'senna_skin10_homeguard_to_idle1.pie_c_10_12'
  | 'senna_skin10_idle_homeguard_to_run.pie_c_10_12'
  | 'senna_skin10_homeguard_idle.pie_c_10_12'
  | 'senna_skin10_run_homeguard_to_idle_homeguard.pie_c_10_12'
  | 'senna_skin10__idle1_to_idle_homeguard.pie_c_10_12'
  | 'Recall_Winddown'
  | 'senna_skin10_nonally_homeguard.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_in.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_out_toidle.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_out_torun.pie_c_10_12'
  | 'senna_skin10_spell_to_run_homeguard.pie_c_10_12'
  | 'senna_skin10_homeguard_to_idle2.pie_c_10_12'
  | 'senna_skin10_recall_winddown_to_idle02.pie_c_10_12'
  | 'senna_skin10_homeguard_idle_var.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_turn_0.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_turn_90.pie_c_10_12'
  | 'senna_skin10_nonally_homeguard_turn_-90.pie_c_10_12'
  | 'spell2_to_idle01.pie_c_legacy_bugs_10_14'
  | 'spell2_towalk_0.pie_c_10_12'
  | 'spell2_towalk_90.pie_c_10_12'
  | 'spell2_towalk_-90.pie_c_10_12'
  | 'spell2_towalk_180.pie_c_10_12'
  | 'spell2_towalk_-180.pie_c_10_12'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Gun_Body} />
        <primitive object={nodes.Wraith_Ground0} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Snap_HatToWorld} />
        <primitive object={nodes.Horse_Root} />
        <primitive object={nodes.Horse_L_Buffbone_Cstm_FrontHoof} />
        <primitive object={nodes.Horse_R_Buffbone_Cstm_FrontHoof} />
        <primitive object={nodes.Horse_L_Buffbone_Cstm_BackHoof} />
        <primitive object={nodes.Horse_R_Buffbone_Cstm_BackHoof} />
        <primitive object={nodes.MechaBull_Root} />
      </group>
      <group position={[-50.54, -0.98, -256.84]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_Mat} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Gun_Handle}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.WraithForm}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Horse} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Horse_VFX}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Mane_VFX}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
