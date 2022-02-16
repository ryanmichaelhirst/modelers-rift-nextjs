import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_1: THREE.Bone
    Stage: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Mic: THREE.Bone
    Liquid: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Mic: THREE.MeshBasicMaterial
    MouthSing: THREE.MeshBasicMaterial
    Clothes: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt_In'
  | 'Celebrate'
  | 'Idle_In'
  | 'Joke'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'petgloop_damage_hurt.littlelegends_11_22'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'petgloop_idle.littlelegends_11_22'
  | 'petgloop_run_free.littlelegends_11_22'
  | 'Taunt_loop'
  | 'Laugh'
  | 'petgloop_base_varient1.littlelegends_11_22'
  | 'Run_Haste_In'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_1} />
        <primitive object={nodes.Stage} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Mic} />
        <primitive object={nodes.Liquid} />
      </group>
      <group position={[-61.25, 0, -58.84]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Mic} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.MouthSing}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Clothes}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
