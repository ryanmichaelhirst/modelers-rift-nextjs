import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    twistedfate_underworld_MD_PROXY_blinn4: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'twistedfate_2012_attack1'
  | 'twistedfate_2012_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Dance_Loop'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'twistedfate_2012_laugh'
  | 'Run_Base'
  | 'twistedfate_2012_spell1'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'twistedfate_2012_attack3'
  | 'twistedfate_2012_attack4'
  | 'twistedfate_2012_recall_idle'
  | 'twistedfate_2012_recall'
  | 'Knockup_Base'
  | 'twistedfate_2012_idle_enter'
  | 'twistedfate_2012_joke.pie_c_legacy_bugs_10_18'
  | 'twistedfate_underworld_idle1'
  | 'twistedfate_underworld_idle_enter'
  | 'twistedfate_underworld_run'
  | 'twistedfate_underworld_attack1'
  | 'twistedfate_underworld_attack2'
  | 'twistedfate_underworld_attack3'
  | 'twistedfate_underworld_attack4'
  | 'twistedfate_underworld_channel'
  | 'twistedfate_underworld_channel_windup'
  | 'twistedfate_underworld_crit'
  | 'twistedfate_underworld_death'
  | 'twistedfate_underworld_idle2'
  | 'twistedfate_underworld_joke'
  | 'twistedfate_underworld_knockup'
  | 'twistedfate_underworld_laugh'
  | 'twistedfate_underworld_recall'
  | 'twistedfate_underworld_recall_windup'
  | 'twistedfate_underworld_spell1'
  | 'twistedfate_underworld_spell4'
  | 'twistedfate_underworld_taunt'
  | 'Dance_Windup'
  | 'Walk'
  | 'Turn0'
  | 'TurnL'
  | 'TurnR'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.twistedfate_underworld_MD_PROXY_blinn4}
        skeleton={nodes.mesh_0.skeleton}
        position={[-80.24, 1.38, -33.16]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
