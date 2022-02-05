import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Mini_Root: THREE.Bone
    Butterfly_Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    Skin10_Frog_MAT: THREE.MeshBasicMaterial
    Skin10_Butterfly_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Run'
  | 'Spell4'
  | 'Idlein_Animal'
  | 'Idle1_Base'
  | 'Run_Variation'
  | 'Passive_Attack'
  | 'Spell1_ToIdle'
  | 'neeko_idlein_toidle1'
  | 'Spell3_ToIdle'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'JG_Run_0'
  | 'JG_Run_90'
  | 'JG_Run_-90'
  | 'neeko_jg_run_0'
  | 'Spell2_ToRun'
  | 'neeko_jg_run_180'
  | 'neeko_jg_run_-180'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Laugh'
  | 'Taunt'
  | 'Idle2_Base'
  | 'neeko_idle3'
  | 'Recall'
  | 'Run_Slow'
  | 'Spell3_0'
  | 'Spell3_90'
  | 'Spell3_180'
  | 'Spell3_-90'
  | 'Spell3_-180'
  | 'Spell1_ToRun'
  | 'Run_Haste'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'neeko_run_homeguard'
  | 'neeko_run_homeguard_variant'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_OUT'
  | 'Run_Homeguard_To_Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.Mini_Root} />
        <primitive object={nodes.Butterfly_Root} />
      </group>
      <group position={[-66.9, -0.65, -255.18]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin10_Frog_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Skin10_Butterfly_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
