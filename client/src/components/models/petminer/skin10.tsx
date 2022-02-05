import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Prop_2: THREE.Bone
    Prop: THREE.Bone
    Root: THREE.Bone
    Shovel_World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Tomb_Stone_MAT: THREE.MeshBasicMaterial
    Miner_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Death'
  | 'Greeting'
  | 'taunt'
  | 'Idle_Base'
  | 'Spell1'
  | 'Celebrate'
  | 'idle_03'
  | 'Idle_In'
  | 'Joke'
  | 'laugh'
  | 'run'
  | 'idle_02'
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
  | 'hurt'
  | 'Interact'
  | 'Run_In'
  | 'Dive_In'
  | 'Dive_Out'
  | 'dive_to_idle'
  | 'celebrate_out'
  | 'Cast_Turn'
  | 'Cast_Damage'
  | 'joke'
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
        <primitive object={nodes.Prop_2} />
        <primitive object={nodes.Prop} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Shovel_World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-62.44, -23.06, -33.21]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Tomb_Stone_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Miner_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
