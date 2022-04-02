import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
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
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Striker_Texture: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ezreal_attack1'
  | 'ezreal_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_Windup'
  | 'ezreal_spell3_exit'
  | 'Spell3_Exit_NoTarget_Idle'
  | 'Run_To_Idle'
  | 'ezreal_idle2'
  | 'ezreal_run'
  | 'ezreal_attack4'
  | 'ezreal_attack2'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Run_Haste'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'Spell3_-180'
  | 'Spell3_180'
  | 'Spell3_Exit_NoTarget_Run'
  | 'Spell3_Exit_Run'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Recall_Winddown'
  | 'Joke'
  | 'Spell3_Generic'
  | 'ezreal_spell3_exit_notarget'
  | 'Respawn'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
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
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Striker_Texture}
        skeleton={nodes.mesh_0.skeleton}
        position={[-61.31, -1.3, -22.21]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
