import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Drone_Base: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bow_World_Bone: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    Drone_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ashe_skin08_attack1'
  | 'Crit'
  | 'Death'
  | 'ashe_skin08_idle1'
  | 'Laugh'
  | 'ashe_skin08_run'
  | 'Run2'
  | 'Run3'
  | 'ashe_skin08_spell1'
  | 'Spell4_Base'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'ashe_skin08_dance'
  | 'Joke'
  | 'ashe_skin08_attack2'
  | 'Spell3'
  | 'ashe_skin08_spell2'
  | 'ashe_skin08_attack3'
  | 'Recall'
  | 'Recall_Winddown'
  | 'ashe_skin08_spell4'
  | 'Spell1_In'
  | 'ashe_skin08_spell1_2'
  | 'Idle_In'
  | 'Idle_Start'
  | 'ashe_skin08_idle2'
  | 'ashe_skin08_idle3'
  | 'Respawn'
  | 'Dance_In'
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
        <primitive object={nodes.C_Drone_Base} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bow_World_Bone} />
      </group>
      <group position={[-128.1, -26.28, -53.85]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Drone_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
