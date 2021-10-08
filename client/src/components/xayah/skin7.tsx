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
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_FX_Loc: THREE.Bone
    Wing4_Ground: THREE.Bone
    Wing_A3_Ground: THREE.Bone
    Wing_B3_Ground: THREE.Bone
    Familiar_Root: THREE.Bone
    Crest: THREE.Bone
    JokeSnacks2: THREE.Bone
    JokeSnacks4: THREE.Bone
    JokeSnacks3: THREE.Bone
    JokeSnacks1: THREE.Bone
    DeathCrest: THREE.Bone
  }
  materials: {
    Xayah_Base_Mat: THREE.MeshBasicMaterial
    Xayah_Crest_Mat: THREE.MeshBasicMaterial
    Xayah_Base_Weapon_Mat: THREE.MeshBasicMaterial
    Xayah_Familiar_mat: THREE.MeshBasicMaterial
    Xayah_Base_Wing_Mat: THREE.MeshBasicMaterial
    Ult_Wing_Mat: THREE.MeshBasicMaterial
    crest_Xayah_Base_Mat: THREE.MeshBasicMaterial
    Props_Joke_Mat: THREE.MeshBasicMaterial
    Xayah_Familiar_Joke_mat: THREE.MeshBasicMaterial
    DeathProp_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance_Loop'
  | 'Duo_Recall'
  | 'Duo_Recall_Unto'
  | 'Duo_Recall_Ready'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'xayah_idlein'
  | 'Run_Haste'
  | 'Spell4_2Idle'
  | 'Spell4_2run'
  | 'Spell4_2run_Fast'
  | 'Spell4_Lft180'
  | 'Spell4_Lft90'
  | 'Spell4_Rgt180'
  | 'Spell4_Rgt90'
  | 'xayah_skin04_duo_dance_loop'
  | 'xayah_skin04_duo_dance_into'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit1'
  | 'Crit2'
  | 'Dance_Base'
  | 'Death'
  | 'Idle_ToRun'
  | 'Idlein_Torun'
  | 'IdleIn_toRun_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'xayah_skin04_run_base_bird'
  | 'Run_Fast'
  | 'Run_Slow'
  | 'Spell1'
  | 'Spell1_2Idle'
  | 'Spell1_2Run'
  | 'Spell1_2runfast'
  | 'xayah_spell2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_RunBase'
  | 'Spell2_To_RunFast'
  | 'Spell3'
  | 'Spell3_2idle'
  | 'Spell3_2run'
  | 'Spell3_2runfast'
  | 'Spell4_Base'
  | 'Taunt'
  | 'xayah_wingturn'
  | 'xayah_wingturn_lft'
  | 'xayah_wingturn_rgt'
  | 'Wingturn_Lft_Small'
  | 'Wingturn_Rgt_Small'
  | 'Attack_W1'
  | 'Attack_W2'
  | 'Attack_W3'
  | 'Attack_W4'
  | 'xayah_idle3'
  | 'xayah_skin04_run_base_bird_variant'
  | 'Homeguard'
  | 'xayah_idle_to_homeguard_2'
  | 'Run_Homeguard'
  | 'Run_Toidle'
  | 'Spell2_Familiar'
  | 'xayah_skin04_recall_duo_full'
  | 'xayah_skin04_duo_sg_dance_loop'
  | 'xayah_skin04_duo_sg_dance_into'
  | 'Spell2_To_RunHaste'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_FX_Loc} />
        <primitive object={nodes.Wing4_Ground} />
        <primitive object={nodes.Wing_A3_Ground} />
        <primitive object={nodes.Wing_B3_Ground} />
        <primitive object={nodes.Familiar_Root} />
        <primitive object={nodes.Crest} />
        <primitive object={nodes.JokeSnacks2} />
        <primitive object={nodes.JokeSnacks4} />
        <primitive object={nodes.JokeSnacks3} />
        <primitive object={nodes.JokeSnacks1} />
        <primitive object={nodes.DeathCrest} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Xayah_Base_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Xayah_Crest_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Xayah_Base_Weapon_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Xayah_Familiar_mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Xayah_Base_Wing_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Ult_Wing_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.crest_Xayah_Base_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Props_Joke_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Xayah_Familiar_Joke_mat}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.DeathProp_Mat}
        skeleton={nodes.mesh_0_9.skeleton}
      />
    </group>
  )
}
