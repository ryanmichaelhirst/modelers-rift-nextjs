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
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    Skin03_Guitar: THREE.Bone
    Mace: THREE.Bone
    Root: THREE.Bone
    Mace_Hand_Driver: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Extra_Module_Root: THREE.Bone
  }
  materials: {
    Guitar: THREE.MeshBasicMaterial
    Mace: THREE.MeshBasicMaterial
    Cape: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    MaceFX: THREE.MeshBasicMaterial
    UltimateMace: THREE.MeshBasicMaterial
    UltimateCape: THREE.MeshBasicMaterial
    UltimateBody: THREE.MeshBasicMaterial
    UltimateMaceFX: THREE.MeshBasicMaterial
    UltimateCrown: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'idle.pie_c_11_11'
  | 'idle_variation.pie_c_11_11'
  | 'Laugh'
  | 'Spell1'
  | 'Spell4'
  | 'turns_left_90.pie_c_11_11'
  | 'turns_right_90.pie_c_11_11'
  | 'Turn_0'
  | 'Idle_In'
  | 'Homeguard'
  | 'Run_Homeguard'
  | 'Walk'
  | 'spell3_cast.pie_c_11_11'
  | 'Spell1_To_Idle'
  | 'spell_1_torun_0.pie_c_11_11'
  | 'spell_1_torun_90.pie_c_11_11'
  | 'spell_1_torun_-90.pie_c_11_11'
  | 'spell_1_torun_180.pie_c_11_11'
  | 'spell_1_torun_-180.pie_c_11_11'
  | 'Spell2_Idle'
  | 'spell2_walk.pie_c_11_11'
  | 'spell2_intro.pie_c_11_11'
  | 'spell2_outro.pie_c_11_11'
  | 'spell2_run_exit.pie_c_11_11'
  | 'spell2_run_sheild_consume_exit.pie_c_11_11'
  | 'spell2_consume_shield.pie_c_11_11'
  | 'Spell2_Idle_In'
  | 'spell3_cast_walk.pie_c_11_11'
  | 'battle_idle_to_idle.pie_c_11_11'
  | 'Battle_Idle'
  | 'spell1_to_attack.pie_c_11_11'
  | 'Spell4_To_Idle'
  | 'old_walk_to_battle_walk.pie_c_11_11'
  | 'Joke'
  | 'spell3_cast_to_idle.pie_c_11_11'
  | 'Spell4_To_Run'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'attack1_to_run.pie_c_11_11'
  | 'attack2_to_run.pie_c_11_11'
  | 'old_walk_to_battle_idle.pie_c_11_11'
  | 'Attack_Turret'
  | 'Respawn'
  | 'Attack1'
  | 'spell3_cast_walk_to_run.pie_c_11_11'
  | 'walk.pie_c_11_11'
  | 'spell3_cast_from_spell2.pie_c_11_11'
  | 'spell3_cast_walk_from_spell2.pie_c_11_11'
  | 'spell_4_cast_to_spell2_idle.pie_c_11_11'
  | 'spell_4_cast_to_spell2_run.pie_c_11_11'
  | 'spell1_to_spell2_idle.pie_c_11_11'
  | 'spell1_to_spell2_run.pie_c_11_11'
  | 'Taunt_loop'
  | 'Taunt_Base'
  | 'attack_turret_to_idle.pie_c_11_11'
  | 'Recall'
  | 'Recall_Winddown'
  | 'spell2_intro_toidle.pie_c_11_11'
  | 'spell4_move'
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
        <primitive object={nodes.Skin03_Guitar} />
        <primitive object={nodes.Mace} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Mace_Hand_Driver} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Extra_Module_Root} />
      </group>
      <group position={[-197.74, -50.59, -181.02]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Guitar} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Mace} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Cape} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Body} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.MaceFX}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.UltimateMace}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.UltimateCape}
          skeleton={nodes.mesh_0_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_7.geometry}
          material={materials.UltimateBody}
          skeleton={nodes.mesh_0_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_8.geometry}
          material={materials.UltimateMaceFX}
          skeleton={nodes.mesh_0_8.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_9.geometry}
          material={materials.UltimateCrown}
          skeleton={nodes.mesh_0_9.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
