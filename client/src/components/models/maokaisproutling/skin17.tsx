import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Sapling_Root: THREE.Bone
    BUFFBONE_GLB_WEAPON_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Sapling_Body_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Aggro'
  | 'Idle1_Base'
  | 'maokaisproutling_idle2.skins_maokai_skin16'
  | 'Idle2_Base'
  | 'Landing'
  | 'Landing_Big'
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
        <primitive object={nodes.Sapling_Root} />
        <primitive object={nodes.BUFFBONE_GLB_WEAPON_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sapling_Body_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-36.99, -0.28, -29.38]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
