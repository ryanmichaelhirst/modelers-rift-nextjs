import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Hula_Hoop: THREE.Bone
    Root: THREE.Bone
    R_Mouth_Corner: THREE.Bone
    L_Mouth_Corner: THREE.Bone
    Spring_Tail01: THREE.Bone
  }
  materials: {
    NPC_Pet_Qiyana_T1_Hoop_MAT: THREE.MeshBasicMaterial
    NPC_Pet_Qiyana_T1_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Spell1'
  | 'qiyanadog_idle_var2_lookaway'
  | 'Idle_In'
  | 'Interact'
  | 'qiyanadog_run'
  | 'qiyanadog_idle_var1_lookaround'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'qiyanadog_damage'
  | 'Death'
  | 'Into_Cast'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Into_Run'
  | 'Taunt_loop'
  | 'qiyanadog_taunt'
  | 'qiyanadog_joke'
  | 'Celebrate'
  | 'Celebrate_to_Idle'
  | 'Celebrate_to_Run'
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
        <primitive object={nodes.Hula_Hoop} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Mouth_Corner} />
        <primitive object={nodes.L_Mouth_Corner} />
        <primitive object={nodes.Spring_Tail01} />
      </group>
      <group position={[-97.67, -4.79, -234.46]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.NPC_Pet_Qiyana_T1_Hoop_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.NPC_Pet_Qiyana_T1_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
