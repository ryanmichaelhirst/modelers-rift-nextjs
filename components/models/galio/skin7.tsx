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
    Tail_1_Ground: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_R_Wing2World: THREE.Bone
    Snap_L_Wing2World: THREE.Bone
    Snap_L_Shoulder2World: THREE.Bone
    Bucket: THREE.Bone
    Net: THREE.Bone
    Leg1: THREE.Bone
    Fryer: THREE.Bone
    Leg2: THREE.Bone
    Leg3: THREE.Bone
    Drumstick: THREE.Bone
  }
  materials: {
    Galio_Birdio_MAT1: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_Passive'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'IdleIn'
  | 'Joke'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Spell1_To_Run'
  | 'galio_spell2_idle'
  | 'galio_spell2_run'
  | 'Spell2_Idle_Cast'
  | 'Spell2_Run_Cast'
  | 'Spell2_TRA'
  | 'Spell3_Hit'
  | 'Spell3_Windup'
  | 'Spell4_In'
  | 'Spell4_Out'
  | 'Spell4_Channel'
  | 'Spell4_Short'
  | 'Spell4_Short_IN'
  | 'Spell4_Short_OUT'
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
        <primitive object={nodes.Tail_1_Ground} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_R_Wing2World} />
        <primitive object={nodes.Snap_L_Wing2World} />
        <primitive object={nodes.Snap_L_Shoulder2World} />
        <primitive object={nodes.Bucket} />
        <primitive object={nodes.Net} />
        <primitive object={nodes.Leg1} />
        <primitive object={nodes.Fryer} />
        <primitive object={nodes.Leg2} />
        <primitive object={nodes.Leg3} />
        <primitive object={nodes.Drumstick} />
      </group>
      <group position={[-93.86, -15.62, -73.66]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Galio_Birdio_MAT1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
