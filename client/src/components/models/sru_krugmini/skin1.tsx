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
  }
  materials: {
    Rockem_Mini2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'krug_idle_aggro'
  | 'Run'
  | 'krug_mini_idle_n2ag'
  | 'krug_idle_normal'
  | 'Death'
  | 'krug_attack2'
  | 'krug_attack3'
  | 'krug_idle_aggro2'
  | 'krug_idle_aggro3'
  | 'krug_idle_aggro4'
  | 'krug_idle_ag2n'
  | 'krug_attack1'
  | 'krug_attack4'
  | 'krug_attack5'
  | 'Spawn'
  | 'krug_spawn_mini_nj'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Rockem_Mini2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-73.79, -0.87, -92.62]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
