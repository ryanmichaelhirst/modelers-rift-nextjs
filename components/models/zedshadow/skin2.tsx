import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    ZedMat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_idle1'
  | 'zed_run'
  | 'zed_spell1'
  | 'Spell2'
  | 'zed_spell3'
  | 'Joke'
  | 'zed_idle_leadin1'
  | 'zed_run_leadin'
  | 'zed_dance_leadin'
  | 'zed_dance'
  | 'Taunt_SH'
  | 'Joke_SH_Loss'
  | 'Joke_SH_Win'
  | 'zed_idle_leadin2'
  | 'zed_idle_leadin3'
  | 'Spell4_Strike'
  | 'Dance'
  | 'Taunt'
  | 'Attack_Spell4'
  | 'Spawn'
  | 'Laugh'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.ZedMat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-87.68, -0.19, -42.11]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
