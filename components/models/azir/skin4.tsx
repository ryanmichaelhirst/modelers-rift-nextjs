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
    Cstm_Buffbone_Weapon_Attack1: THREE.Bone
    Weapon_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Go_Board: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'azir_attack1'
  | 'azir_attack2'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'azir_run'
  | 'azir_spell2'
  | 'azir_spell4'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'azir_skin04_respawn'
  | 'azir_idle4'
  | 'Channel'
  | 'azir_run_in'
  | 'azir_idle3'
  | 'azir_run_variant'
  | 'Joke'
  | 'azir_laugh'
  | 'Taunt_Base'
  | 'Run_Haste'
  | 'Run'
  | 'azir_run_slow_in'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Buffbones'
  | 'azir_attack_command'
  | 'azir_attack_command_turnright'
  | 'azir_attack_command_turnleft'
  | 'KnockupIn'
  | 'KnockUp_Loop'
  | 'azir_spellp'
  | 'azir_spell3_dash'
  | 'azir_spell3_dash_exit'
  | 'Spell3_Dash_LOOP'
  | 'Turn0'
  | 'Turn180'
  | 'Turn90'
  | 'TurnNeg180'
  | 'TurnNeg90'
  | 'GA_Death'
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
        <primitive object={nodes.Cstm_Buffbone_Weapon_Attack1} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Go_Board} />
      </group>
      <group position={[-81.78, -39.42, -229.2]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
