import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Buffbone_Glb_Weapon_1: THREE.Bone
    R_Buffbone_Glb_Hand_Loc: THREE.Bone
    L_Buffbone_Glb_Hand_Loc: THREE.Bone
    root: THREE.Bone
    L_Buffbone_Glb_Foot_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    root_break: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    R_Buffbone_Glb_Foot_Loc: THREE.Bone
  }
  materials: {
    Trueshot_Turret_Base: THREE.MeshBasicMaterial
  }
}

type ActionName = 'trueshot_turret_idle1.trueshot' | 'Destroyed' | 'Idle1_Base' | 'Attack1'
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
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.R_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.root} />
        <primitive object={nodes.L_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.root_break} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Foot_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Trueshot_Turret_Base}
        skeleton={nodes.mesh_0.skeleton}
        position={[-213.35, -5.98, -140.15]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
