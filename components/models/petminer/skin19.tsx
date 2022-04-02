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
    Shovel_World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Prop_2: THREE.Bone
    Prop: THREE.Bone
  }
  materials: {
    Miner_MAT: THREE.MeshBasicMaterial
    Tomb_Stone_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Spell1'
  | 'Taunt'
  | 'Celebrate'
  | 'idle_03'
  | 'Idle_In'
  | 'Joke'
  | 'laugh'
  | 'run'
  | 'idle_02'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'RunBase'
  | 'Spin_Into_Flight'
  | 'run_spin_into_run2'
  | 'run_spin_into_spin1'
  | 'Spin_Into_Spin2'
  | 'Cast_Animation'
  | 'RunFlight'
  | 'run_spin_02'
  | 'Into_Cast'
  | 'Cast_Cycle'
  | 'Death'
  | 'hurt'
  | 'Interact'
  | 'Run_In'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'dive_to_idle'
  | 'celebrate_out'
  | 'Cast_Turn'
  | 'Cast_Damage'
  | 'joke'
  | 'taunt'
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
        <primitive object={nodes.Shovel_World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Prop_2} />
        <primitive object={nodes.Prop} />
      </group>
      <group position={[-62.57, -16.08, -43.3]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Miner_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tomb_Stone_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
