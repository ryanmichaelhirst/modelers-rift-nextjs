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
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Root: THREE.Bone
    C_Scythe_Eyeball: THREE.Bone
    C_Hair2_Ground: THREE.Bone
    True_World: THREE.Bone
    Buffbone_Cstm_Joke1: THREE.Bone
    Buffbone_Cstm_Joke2: THREE.Bone
    Buffbone_Cstm_Joke3: THREE.Bone
    Buffbone_Cstm_Joke4: THREE.Bone
    Buffbone_Cstm_Joke5: THREE.Bone
    Buffbone_Cstm_Joke6: THREE.Bone
    Recall_Ora1: THREE.Bone
    Recall_Ora2: THREE.Bone
    Recall_Ora3: THREE.Bone
  }
  materials: {
    Skin02_Base_Ora_Mat: THREE.MeshBasicMaterial
    Kayn_Base_Assassin_Mat: THREE.MeshBasicMaterial
    Kayn_Base_Slayer_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_In'
  | 'Idle1_In_Assassin'
  | 'Idle1_In_Slayer'
  | 'kayn_skin02_idle1_slayer'
  | 'Idle1_Base'
  | 'Idle2_Assassin'
  | 'Idle3_Assassin'
  | 'kayn_skin02_idle1_assassin'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh'
  | 'Laugh_to_Idle'
  | 'Recall'
  | 'Run_Base'
  | 'kayn_skin02_run_assassin'
  | 'Spell1_Circle'
  | 'Spell1_Dash'
  | 'Spell1_Exit_To_Run'
  | 'Spell2'
  | 'Spell2_Assassin_Cast'
  | 'Spell2_Slayer'
  | 'Spell2_Slayer_Run'
  | 'Spell2_Slayer_Idle'
  | 'Spell2_Idle'
  | 'Spell2_Into_Run'
  | 'Spell3'
  | 'Spell3_Idle'
  | 'Spell3_Run'
  | 'Spell3_Run_In'
  | 'Spell4_Air'
  | 'Spell4_Hit'
  | 'Taunt_loop'
  | 'Taunt_Start'
  | 'Transform_Assassin'
  | 'Transform_Slayer'
  | 'Spell4_Hit_ToRun'
  | 'kayn_skin02_assassin_spell1_circle'
  | 'kayn_skin02_assassin_spell1_dash'
  | 'kayn_skin02_assassin_spell1_exit_to_run'
  | 'kayn_skin02_slayer_spell1_circle'
  | 'kayn_skin02_slayer_spell1_dash'
  | 'kayn_skin02_slayer_spell1_exit_to_run'
  | 'Spell4_Hit_Assassin'
  | 'Spell4_Hit_toRun_Assassin'
  | 'kayn_skin02_spell3_idle_assassin'
  | 'kayn_skin02_spell3_run_assassin'
  | 'kayn_skin02_spell3_idle_slayer'
  | 'kayn_skin02_spell3_run_slayer'
  | 'kayn_skin02_spell3_run_in_slayer'
  | 'kayn_skin02_spell3_run_in_assassin'
  | 'Spell4_Hit_Slayer'
  | 'Spell4_Hit_toRun_Slayer'
  | 'kayn_skin02_slayer_spell1_exit_to_idle'
  | 'Run_In'
  | 'Attack1_Slayer'
  | 'Attack2_Slayer'
  | 'Attack3_Slayer'
  | 'Attack1_Assassin'
  | 'Attack2_Assassin'
  | 'Attack3_Assassin'
  | 'Run_In_Slayer'
  | 'Run_Homeguard'
  | 'kayn_skin02_run_slayer'
  | 'Run_Homeguard_Slayer'
  | 'Run_In_Homeguard'
  | 'Idle2_Slayer'
  | 'Run_Homeguard_Assassin'
  | 'Run_In_Homeguard_Assassin'
  | 'Laugh_to_Idle_Assassin'
  | 'Laugh_to_Idle_Slayer'
  | 'Recall_Slayer'
  | 'Respawn'
  | 'Respawn_Assassin'
  | 'Respawn_Slayer'
  | 'Recall_Assassin'
  | 'kayn_skin02_death'
  | 'Dance_In'
  | 'kayn_skin02_spell4_air'
  | 'kayn_skin02_spell3_torun_assassin'
  | 'kayn_skin02_spell3_torun_slayer'
  | 'kayn_skin02_recall_winddown'
  | 'Idle1_Var1'
  | 'Idle1_Var2'
  | 'Spell2_Assassin_to_Run'
  | 'kayn_skin02_apprehend'
  | 'Boss_Slash1'
  | 'Boss_Slash2'
  | 'kayn_skin02_boss_overheadspin_in'
  | 'kayn_skin02_boss_overheadspin_loop'
  | 'kayn_skin02_boss_overheadspin_out'
  | 'Boss_Channel'
  | 'kayn_skin02_transform_assassin'
  | 'kayn_skin02_recall_assassin'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Scythe_Eyeball} />
        <primitive object={nodes.C_Hair2_Ground} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Buffbone_Cstm_Joke1} />
        <primitive object={nodes.Buffbone_Cstm_Joke2} />
        <primitive object={nodes.Buffbone_Cstm_Joke3} />
        <primitive object={nodes.Buffbone_Cstm_Joke4} />
        <primitive object={nodes.Buffbone_Cstm_Joke5} />
        <primitive object={nodes.Buffbone_Cstm_Joke6} />
        <primitive object={nodes.Recall_Ora1} />
        <primitive object={nodes.Recall_Ora2} />
        <primitive object={nodes.Recall_Ora3} />
      </group>
      <group position={[-59.65, -29.3, -134.51]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin02_Base_Ora_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Kayn_Base_Assassin_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Kayn_Base_Slayer_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
