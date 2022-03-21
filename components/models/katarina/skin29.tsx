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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_Buffbone_Cstm_BladeVFX_Loc: THREE.Bone
    R_Buffbone_Cstm_BladeVFX_Loc: THREE.Bone
    L_SnapWeaponToWorld: THREE.Bone
    R_SnapWeaponToWorld: THREE.Bone
    Beast_Root: THREE.Bone
    Joke_Table: THREE.Bone
    Joke_Chair: THREE.Bone
  }
  materials: {
    Gem1: THREE.MeshBasicMaterial
    Gem2: THREE.MeshBasicMaterial
    Gem3: THREE.MeshBasicMaterial
    Gem4: THREE.MeshBasicMaterial
    Gem5: THREE.MeshBasicMaterial
    Gem6: THREE.MeshBasicMaterial
    Main_Mat: THREE.MeshBasicMaterial
    Lizard: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Dance_In'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Taunt_In'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke_In'
  | 'Recall'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'idle1_toupright_loop.pie_c_10_25'
  | 'spell3.pie_c_10_25'
  | 'crit.pie_c_10_25'
  | 'Spell2_Throw'
  | 'RunHaste'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'idle1_toupright_in.pie_c_10_25'
  | 'Spell1_ToRun'
  | 'Idle_To_Run'
  | 'Idle_To_runHaste'
  | 'spell2_throw_toidle.pie_c_10_25'
  | 'spell2_throw_torun.pie_c_10_25'
  | 'idle_uprightloop_to_run.pie_c_11_1'
  | 'Joke_Loop'
  | 'Spell2_ToIdle'
  | 'Spell2_ToRun'
  | 'Dance_Loop'
  | 'attack1_torun.pie_c_11_1'
  | 'attack2_torun.pie_c_11_1'
  | 'idle1_toupright_var1.pie_c_10_25'
  | 'Attack1_ToIdle'
  | 'Attack2_ToIdle'
  | 'Crit_ToIdle'
  | 'runHaste_to_Run'
  | 'idle1_toupright_var2.pie_c_10_25'
  | 'Idle_In3'
  | 'bladeswap01.pie_c_10_25'
  | 'bladeswap02.pie_c_10_25'
  | 'bladeswap03.pie_c_10_25'
  | 'bladeswap04.pie_c_10_25'
  | 'bladeswap05.pie_c_10_25'
  | 'bladeswap06.pie_c_10_25'
  | 'run.pie_c_11_1'
  | 'Respawn'
  | 'RunHomeguard'
  | 'Taunt_loop'
  | 'runhaste_to_run.pie_c_10_25'
  | 'idle_uprightloop_to_runhaste.pie_c_10_25'
  | 'idle_to_runhaste.pie_c_10_25'
  | 'Run_Fast'
  | 'idle_uprightloop_to_run_fast.pie_c_11_1'
  | 'idle_to_run_fast.pie_c_11_1'
  | 'attack1_torun_fast.pie_c_11_1'
  | 'attack2_torun_fast.pie_c_11_1'
  | 'Run_Spell2'
  | 'spell4_torun_fast.pie_c_11_1'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_Buffbone_Cstm_BladeVFX_Loc} />
        <primitive object={nodes.R_Buffbone_Cstm_BladeVFX_Loc} />
        <primitive object={nodes.L_SnapWeaponToWorld} />
        <primitive object={nodes.R_SnapWeaponToWorld} />
        <primitive object={nodes.Beast_Root} />
        <primitive object={nodes.Joke_Table} />
        <primitive object={nodes.Joke_Chair} />
      </group>
      <group position={[-66.5, -1.32, -467.57]} scale={0.05}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Gem1} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Gem2} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Gem3} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Gem4} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Gem5} skeleton={nodes.mesh_0_4.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Gem6} skeleton={nodes.mesh_0_5.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Main_Mat}
          skeleton={nodes.mesh_0_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_7.geometry}
          material={materials.Lizard}
          skeleton={nodes.mesh_0_7.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_8.geometry} material={materials.Joke} skeleton={nodes.mesh_0_8.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
