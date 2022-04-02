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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Emote01_Loc: THREE.Bone
    Buffbone_Emote02_Loc: THREE.Bone
    Buffbone_Emote03_Loc: THREE.Bone
    Buffbone_Emote04_Loc: THREE.Bone
    Buffbone_Emote05_Loc: THREE.Bone
    Buffbone_Emote06_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    R_Arm_Metal: THREE.Bone
    L_Arm_Metal: THREE.Bone
    Weapon: THREE.Bone
    Main_Collar: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    Collar_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Joke'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_To_Run'
  | 'lux_skin17_attack1_into_run.pie_c_legacy_bugs_2021'
  | 'lux_skin17_attack2_into_run.pie_c_legacy_bugs_2021'
  | 'lux_skin17_spell04_to_run.pie_c_legacy_bugs_2021'
  | 'lux_skin17_run_homeguard_to_idle.pie_c_legacy_bugs_2021'
  | 'Run_Haste_In'
  | 'Spell1_Into_Run'
  | 'Spell3_To_Run'
  | 'lux_skin17_spell03_to_run_left.pie_c_legacy_bugs_2021'
  | 'lux_skin17_spell03_to_run_right.pie_c_legacy_bugs_2021'
  | 'lux_skin17_spell03_to_run_180.pie_c_legacy_bugs_2021'
  | 'Recall'
  | 'lux_skin18_taunt_intro.pie_c_legacy_bugs_2021'
  | 'Taunt_loop'
  | 'lux_skin17_run_01.pie_c_legacy_bugs_2021'
  | 'Run_Base'
  | 'lux_skin17_spell03_active.pie_c_legacy_bugs_2021'
  | 'lux_skin17_spell03_active_to_run.pie_c_legacy_bugs_2021'
  | 'Dance_In'
  | 'Laugh'
  | 'Turn-90'
  | 'Turn90'
  | 'lux_skin17_run_02.pie_c_legacy_bugs_2021'
  | 'lux_skin17_run_03.pie_c_legacy_bugs_2021'
  | 'lux_skin17_run_04.pie_c_legacy_bugs_2021'
  | 'lux_skin17_idle_in.pie_c_legacy_bugs_2021'
  | 'lux_skin17_idle_in_2.pie_c_legacy_bugs_2021'
  | 'Spell3_Into_IDLE'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Additive_Buffbone'
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
        <primitive object={nodes.Buffbone_Emote01_Loc} />
        <primitive object={nodes.Buffbone_Emote02_Loc} />
        <primitive object={nodes.Buffbone_Emote03_Loc} />
        <primitive object={nodes.Buffbone_Emote04_Loc} />
        <primitive object={nodes.Buffbone_Emote05_Loc} />
        <primitive object={nodes.Buffbone_Emote06_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.R_Arm_Metal} />
        <primitive object={nodes.L_Arm_Metal} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Main_Collar} />
      </group>
      <group position={[-63.73, -0.7, -97.45]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Collar_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
