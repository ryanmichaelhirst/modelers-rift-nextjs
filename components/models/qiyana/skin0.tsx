import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Ring_Blade: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Qiyana_Base_Body_Mat: THREE.MeshBasicMaterial
    weapon_default: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1_Start'
  | 'Attack2_Start'
  | 'qiyana_base_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Start'
  | 'Dance_Loop'
  | 'Death'
  | 'qiyana_base_idle'
  | 'qiyana_base_laugh'
  | 'Spell1_River'
  | 'Spell1_Wall'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Joke'
  | 'Run_Base'
  | 'Recall'
  | 'Idle_Ready_in'
  | 'Run_Fast_Loop'
  | 'Spell1'
  | 'Spell4_INTO_Idle'
  | 'qiyana_base_idle2'
  | 'qiyana_base_idle3'
  | 'qiyana_base_run_element'
  | 'Spell3_Hit'
  | 'Attack1_INTO_Walk'
  | 'Spell1_Wall_INTO_Walk'
  | 'Spell1_Wall_INTO_Idle'
  | 'qiyana_base_spell1_grass_into_run'
  | 'Spell1_Grass_INTO_Idle'
  | 'Spell1_River_INTO_Idle'
  | 'Spell1_River_INTO_Walk'
  | 'Spell2_INTO_Walk'
  | 'Attack2_INTO_Walk'
  | 'Spell1_Grass'
  | 'Idle_Ready'
  | 'Spell4_INTO_Walk'
  | 'Attack1_End'
  | 'Attack2_End'
  | 'Attack3_End'
  | 'qiyana_base_spell1_into_idle'
  | 'qiyana_base_spell1_into_walk'
  | 'Attack1_Mid'
  | 'Attack3_INTO_Walk'
  | 'Run_Homeguard'
  | 'qiyana_base_run_hastetorun'
  | 'qiyana_base_walk_into_run'
  | 'qiyana_base_run_into_elementrun'
  | 'Spell2_INTO_ElementRun'
  | 'Run_Stealth'
  | 'ElementRun_INTO_Run'
  | 'IdleReady_INTO_Relaxed'
  | 'qiyana_base_into_imsorry'
  | 'qiyana_base_imsorryloop'
  | 'IdleReady_INTO_Relaxed_2'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'qiyana_base_spell4_into_elementwalk'
  | 'Crit_End'
  | 'Crit_INTO_Walk'
  | 'Crit_INTO_Idle'
  | 'Dance_Intro'
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
        <primitive object={nodes.Ring_Blade} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <group position={[-93.6, -0.07, -21.38]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Qiyana_Base_Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.weapon_default}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
