import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Lamb_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Tpose'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Spell1Left'
  | 'Attack_Passive'
  | 'Crit'
  | 'Spell1Right'
  | 'lamb_spell2_arm'
  | 'Spell3'
  | 'Spell1Forward'
  | 'Idle_Loop'
  | 'Attack3'
  | 'Attack1'
  | 'Idle_In'
  | 'Attack2'
  | 'Joke'
  | 'lamb_run'
  | 'lamb_run_variant01'
  | 'Spell1Back'
  | 'Laugh'
  | 'Spell3_2'
  | 'Dance_Base'
  | 'Dance_Loop'
  | 'Recall'
  | 'Death'
  | 'Spell4'
  | 'Taunt'
  | 'Spell2_Idle'
  | 'Respawn'
  | 'Channel'
  | 'Channel_Wndup'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Lamb_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-83.71, -6.68, -39.96]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
