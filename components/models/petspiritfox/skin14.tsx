import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
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
    Tier2_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt_loop'
  | 'Celebrate'
  | 'idle_varient_01'
  | 'Idle_In'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Variant'
  | 'Dance_Loop'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'damage'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Cast_Turn'
  | 'Joke'
  | 'Taunt_In'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
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
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tier2_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-72.77, 0.48, -191.39]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
