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
  }
  materials: {
    Urgot_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Idle1'
  | 'Attack1_InCombat_Bwd'
  | 'Attack1_InCombat_Fwd'
  | 'Attack1_InCombat_Left'
  | 'Attack1_InCombat_Right'
  | 'Attack2_Bwd'
  | 'Attack2_Fwd'
  | 'Attack2_Left'
  | 'Attack2_Right'
  | 'Turn_0'
  | 'TurnLeft_180'
  | 'TurnLeft_90'
  | 'TurnRight_180'
  | 'TurnRight_90'
  | 'Crit_Bwd'
  | 'Crit_Fwd'
  | 'Crit_Left'
  | 'Crit_Right'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Run_Bwd'
  | 'Run_Fwd'
  | 'Run_Left'
  | 'Run_Right'
  | 'CounterAnim_135'
  | 'CounterAnim_-135'
  | 'CounterAnim_179'
  | 'CounterAnim_45'
  | 'CounterAnim_-179'
  | 'CounterAnim_-45'
  | 'Spell2Cast'
  | 'tft6_urgot_spell2_180.tft_set6'
  | 'tft6_urgot_spell2_-180.tft_set6'
  | 'tft6_urgot_spell2_fwd.tft_set6'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Urgot_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-208.07, -3.25, -182.83]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
