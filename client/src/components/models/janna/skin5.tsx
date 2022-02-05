import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Mic: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Camera: THREE.Bone
  }
  materials: {
    Janna_Forecast_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle1_Base'
  | 'janna_forecast_joke'
  | 'Dance_Base'
  | 'Death'
  | 'janna_forecast_laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'janna_forecast_idle1_in'
  | 'janna_forecast_run_in'
  | 'Idle2_Base'
  | 'janna_forecast_idle_look_left'
  | 'janna_forecast_idle_look_right'
  | 'Dance_Enter'
  | 'Recall_Loop'
  | 'Recall_Windup'
  | 'janna_forecast_run_lookaround'
  | 'janna_forecast_respawn'
  | 'Taunt_Base'
  | 'ForecastSpell3'
  | 'Recall_Winddown'
  | 'Spell4'
  | 'janna_forecast_spell2'
  | 'ForecastSpell2'
  | 'janna_forecast_run_2'
  | 'Spell3'
  | 'janna_forecast_taunt'
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
        <primitive object={nodes.Mic} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Camera} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Janna_Forecast_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-85.28, -0.06, -47.1]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
