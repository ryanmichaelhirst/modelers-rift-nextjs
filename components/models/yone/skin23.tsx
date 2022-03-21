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
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Sheath: THREE.Bone
    Bow: THREE.Bone
    Azakana_Head: THREE.Bone
    Snap_Weapon2World1: THREE.Bone
    Snap_Weapon2World2: THREE.Bone
    Plate: THREE.Bone
    Fish: THREE.Bone
  }
  materials: {
    GhostKatana: THREE.MeshBasicMaterial
    Skirt: THREE.MeshBasicMaterial
    Katana_Smear: THREE.MeshBasicMaterial
    GhostKatana_Smear: THREE.MeshBasicMaterial
    Sushi: THREE.MeshBasicMaterial
    Alt_GhostKatana: THREE.MeshBasicMaterial
    Alt_Skirt: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'Attack2'
  | 'walk01_toidle_var01.pie_c_11_19'
  | 'Run_Base'
  | 'Attack3'
  | 'Attack4'
  | 'Death'
  | 'Run_Fast'
  | 'Spell2'
  | 'spell1c_in.pie_c_11_19'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Joke'
  | 'Taunt_In'
  | 'Recall'
  | 'Dance_In'
  | 'Run_Homeguard'
  | 'Attack1'
  | 'Spell3_Dash'
  | 'attacks_fast01.pie_c_11_19'
  | 'attacks_fast02.pie_c_11_19'
  | 'attacks_fast03.pie_c_11_19'
  | 'attacks_fast04.pie_c_11_19'
  | 'attacks_fast01_torun.pie_c_11_19'
  | 'attacks_fast01_toidle.pie_c_11_19'
  | 'attacks_fast02_torun.pie_c_11_19'
  | 'attacks_fast02_toidle.pie_c_11_19'
  | 'attacks_fast03_toidle.pie_c_11_19'
  | 'attacks_fast03_torun.pie_c_11_19'
  | 'attacks_fast04_toidle.pie_c_11_19'
  | 'attacks_fast04_torun.pie_c_11_19'
  | 'Attack1_ToIdle'
  | 'attack01_towalk01.pie_c_11_19'
  | 'Attack2_ToIdle'
  | 'attack02_towalk01.pie_c_11_19'
  | 'attack03_toidle01.pie_c_11_19'
  | 'attack03_towalk01.pie_c_11_19'
  | 'attack04_toidle01.pie_c_11_19'
  | 'attack04_towalk01.pie_c_11_19'
  | 'idle01_tosheath.pie_c_11_19'
  | 'idle01_tosheath_loop.pie_c_11_19'
  | 'Spell2_ToIdle'
  | 'Spell2_ToRun'
  | 'spell1c_toidle.pie_c_11_19'
  | 'spell1_a_toidle.pie_c_11_19'
  | 'spell1_a_torun.pie_c_11_19'
  | 'spell3_bodyin.pie_c_11_19'
  | 'spell3_bodyloop.pie_c_11_19'
  | 'spell1_a_01.pie_c_11_19'
  | 'spell1_a_02.pie_c_11_19'
  | 'spell1c_dash.pie_c_11_19'
  | 'spell1c_out.pie_c_11_19'
  | 'spell3_spirit_in.pie_c_11_19'
  | 'Spell4'
  | 'spell3_run.pie_c_11_19'
  | 'spell4_out_idle.pie_c_11_19'
  | 'spell4_out_walk.pie_c_11_19'
  | 'spell3_spirit_in_toidle.pie_c_11_19'
  | 'spell3_spirit_in_torun.pie_c_11_19'
  | 'Spell3_Out_toIdle'
  | 'spell3_out_idle.pie_c_11_19'
  | 'Dance_Loop'
  | 'homeguard01_toidle01.pie_c_11_19'
  | 'Run_Homeguard_IN'
  | 'homeguard_towalk01.pie_c_11_19'
  | 'run01_toidle.pie_c_11_19'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Taunt_loop'
  | 'attacks_fast_toidle.pie_c_11_19'
  | 'idle01_torun01.pie_c_11_19'
  | 'sheathidle01_torun01.pie_c_11_19'
  | 'spell3_run_to_idle.pie_c_11_19'
  | 'walk01_to_run01.pie_c_11_19'
  | 'homeguard01_to_run01.pie_c_11_19'
  | 'Laugh'
  | 'spell1c_out_idle.pie_c_11_19'
  | 'spell1c_out_run.pie_c_11_19'
  | 'attacks_fast04_tospell3run.pie_c_11_19'
  | 'attacks_fast02_tospell3run.pie_c_11_19'
  | 'attacks_fast01_tospell3run.pie_c_11_19'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Sheath} />
        <primitive object={nodes.Bow} />
        <primitive object={nodes.Azakana_Head} />
        <primitive object={nodes.Snap_Weapon2World1} />
        <primitive object={nodes.Snap_Weapon2World2} />
        <primitive object={nodes.Plate} />
        <primitive object={nodes.Fish} />
      </group>
      <group position={[-66.13, 0.17, -222.12]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.GhostKatana}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Skirt} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Katana_Smear}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.GhostKatana_Smear}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Sushi} skeleton={nodes.mesh_0_4.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Alt_GhostKatana}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Alt_Skirt}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
