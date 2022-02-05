import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_SnapJoint: THREE.Bone
    Banana: THREE.Bone
    L_Bot_Trail_Base: THREE.Bone
    L_Mid_Trail_Base: THREE.Bone
    L_Top_Trail_Base: THREE.Bone
    R_Bot_Trail_Base: THREE.Bone
    R_Mid_Trail_Base: THREE.Bone
    R_Top_Trail_Base: THREE.Bone
  }
  materials: {
    Main: THREE.MeshBasicMaterial
    Hair: THREE.MeshBasicMaterial
    Banana: THREE.MeshBasicMaterial
    Trails: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'soraka_skin15_idle3'
  | 'Dance_In'
  | 'Death'
  | 'Laugh'
  | 'Taunt'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Joke_In'
  | 'Recall'
  | 'soraka_skin15_run'
  | 'soraka_skin15_trailssine'
  | 'Idle_In'
  | 'Spell1_To_Idle'
  | 'Spell3_To_Idle'
  | 'Spell2_To_Idle'
  | 'soraka_skin15_spell1_to_run'
  | 'soraka_skin15_spell3_to_run'
  | 'Spell2_To_Run'
  | 'Spell1_to_Run_90'
  | 'Spell1_To_Run_-90'
  | 'Spell4_To_Idle'
  | 'Spell4_To_Run'
  | 'Spell3_to_Run_90'
  | 'Spell3_to_Run_-90'
  | 'Run_Slow'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Joke_Loop'
  | 'StaffLoop'
  | 'Channel_Wndup'
  | 'Channel'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Spawn'
  | 'Respawn'
  | 'Channel_In'
  | 'Run_Homeguard_OUT'
  | 'Recall_Winddown'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon_SnapJoint} />
        <primitive object={nodes.Banana} />
        <primitive object={nodes.L_Bot_Trail_Base} />
        <primitive object={nodes.L_Mid_Trail_Base} />
        <primitive object={nodes.L_Top_Trail_Base} />
        <primitive object={nodes.R_Bot_Trail_Base} />
        <primitive object={nodes.R_Mid_Trail_Base} />
        <primitive object={nodes.R_Top_Trail_Base} />
      </group>
      <group position={[-51.92, -9.88, -90.3]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Main}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Hair}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Banana}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Trails}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
