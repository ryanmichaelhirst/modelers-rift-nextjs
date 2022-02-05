import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Cstm_Buffbone_Whirl2: THREE.Bone
    Cstm_Buffbone_Whirl1: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
  }
  materials: {
    Draven_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'draven_skin13_idle2'
  | 'draven_skin13_idle3'
  | 'draven_skin13_idle4'
  | 'Joke'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'draven_skin13_spell1_spin_left_right'
  | 'draven_skin13_idle5'
  | 'draven_skin13_beam_windup'
  | 'draven_skin13_beam_channel'
  | 'draven_skin13_run_arms_out'
  | 'Spell1_Rwpn_Off'
  | 'draven_skin13_idle1_botharms'
  | 'Idle1_BothArms'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Left'
  | 'Spell2'
  | 'draven_skin13_spell1_arm_catches'
  | 'draven_skin13_run'
  | 'Idle1'
  | 'draven_skin13_idle1'
  | 'Recall'
  | 'Run_Homeguard'
  | 'Beam_Winddown'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Cstm_Buffbone_Whirl2} />
        <primitive object={nodes.Cstm_Buffbone_Whirl1} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Draven_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-171.92, -1.33, -31.9]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
