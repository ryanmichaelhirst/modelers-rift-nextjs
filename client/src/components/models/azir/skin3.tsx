import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_World: THREE.Bone
    Cstm_Buffbone_Weapon_Attack1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Feathers: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'azir_attack1'
  | 'azir_attack2'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'azir_run'
  | 'azir_spell4'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'Respawn'
  | 'azir_idle4'
  | 'Channel'
  | 'azir_run_in'
  | 'azir_idle3'
  | 'azir_run_variant'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Joke'
  | 'azir_laugh'
  | 'Taunt_Base'
  | 'azir_spell2'
  | 'Run_Haste'
  | 'Run'
  | 'azir_run_slow_in'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Death'
  | 'Buffbones'
  | 'azir_spell3_dash'
  | 'azir_spell3_dash_exit'
  | 'azir_spellp'
  | 'azir_attack_command'
  | 'Turn0'
  | 'Turn90'
  | 'TurnNeg90'
  | 'Turn180'
  | 'TurnNeg180'
  | 'azir_attack_command_turnleft'
  | 'azir_attack_command_turnright'
  | 'Spell3_Dash_LOOP'
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
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Cstm_Buffbone_Weapon_Attack1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Feathers}
        skeleton={nodes.mesh_0.skeleton}
        position={[-70.98, -68.09, -239.39]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
