import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
    cr_Root: THREE.Bone
  }
  materials: {
    Syndra_Skin07_MAT: THREE.MeshBasicMaterial
    Crab: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death_Body'
  | 'Idle1'
  | 'Idle2'
  | 'syndra_idle3'
  | 'syndra_idle4'
  | 'syndra_joke'
  | 'syndra_laugh'
  | 'Run'
  | 'Run1'
  | 'Run2'
  | 'Spell1'
  | 'Spell2_Pull'
  | 'Spell3_Start'
  | 'Spell4_Start'
  | 'syndra_taunt'
  | 'Orbs'
  | 'Spell2_Throw'
  | 'syndra_death'
  | 'Spell3_Cast'
  | 'Spell4_Cast'
  | 'Dance'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.cr_Root} />
      </group>
      <group position={[-68.94, -0.24, -77.47]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Syndra_Skin07_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Crab} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
