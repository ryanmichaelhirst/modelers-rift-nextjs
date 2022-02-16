import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    default2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'quinn_attack1'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_Dash'
  | 'Spell3_Flip'
  | 'Run_Base'
  | 'Idle1_In'
  | 'Idle1_Base'
  | 'Recall'
  | 'Run_Fast'
  | 'Joke'
  | 'Laugh'
  | 'Taunt'
  | 'Channel'
  | 'quinn_channel_leadin'
  | 'quinn_channel_windup'
  | 'Idle2_Base'
  | 'quinn_idle3'
  | 'Spell4'
  | 'Spell4_In'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'quinn_dance_in'
  | 'Dance_Base'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Crit'
  | 'Attack1_P'
  | 'Stunned'
  | 'Channel_Wndup'
  | 'quinn_spell4_flap'
  | 'quinn_spell4_glide'
  | 'quinn_spell4_idle'
  | 'quinn_spell4_runin'
  | 'quinn_spell4_idlein'
  | 'Spell4_Channel'
  | 'quinn_spell4_idle_tra'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.default2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-71.5, -0.89, -24.71]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
