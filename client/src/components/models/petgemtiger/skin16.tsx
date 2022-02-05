import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Keyboard: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Shoulder_Ik: THREE.Bone
    L_Hip_Lower: THREE.Bone
    L_Hip_Lower_Ik: THREE.Bone
    L_Hip_Upper: THREE.Bone
    L_Hip_Upper_Ik: THREE.Bone
    L_Toe_Ik: THREE.Bone
    R_Shoulder_Ik: THREE.Bone
    R_Hip_Lower: THREE.Bone
    R_Hip_Lower_Ik: THREE.Bone
    R_Hip_Upper: THREE.Bone
    R_Hip_Upper_Ik: THREE.Bone
    R_Toe_Ik: THREE.Bone
  }
  materials: {
    Keyboard_MAT: THREE.MeshBasicMaterial
    NPC_Pet_GemTiger_Base_NPC_Pet_GemTiger_Base_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'gemtiger_idle_03'
  | 'Joke_Cycle'
  | 'Interact'
  | 'gemtiger_idle_02'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'gemtiger_damage'
  | 'Death'
  | 'Greeting'
  | 'Cast_Damage'
  | 'Into_Joke'
  | 'Cast_Turn'
  | 'Into_Run'
  | 'gemtiger_cast_into'
  | 'gemtiger_joke_loop'
  | 'Idle_In'
  | 'Dive_In'
  | 'Dive_Out'
  | 'gemtiger_diveout_into_idle'
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
        <primitive object={nodes.Keyboard} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Shoulder_Ik} />
        <primitive object={nodes.L_Hip_Lower} />
        <primitive object={nodes.L_Hip_Lower_Ik} />
        <primitive object={nodes.L_Hip_Upper} />
        <primitive object={nodes.L_Hip_Upper_Ik} />
        <primitive object={nodes.L_Toe_Ik} />
        <primitive object={nodes.R_Shoulder_Ik} />
        <primitive object={nodes.R_Hip_Lower} />
        <primitive object={nodes.R_Hip_Lower_Ik} />
        <primitive object={nodes.R_Hip_Upper} />
        <primitive object={nodes.R_Hip_Upper_Ik} />
        <primitive object={nodes.R_Toe_Ik} />
      </group>
      <group position={[-73.12, -2.22, -136.92]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Keyboard_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.NPC_Pet_GemTiger_Base_NPC_Pet_GemTiger_Base_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
