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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Pilot_Recall: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Rumble_Robot_Mat: THREE.MeshBasicMaterial
    Rumble_Shield: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'rumble_skin03_attack1'
  | 'rumble_skin03_attack2'
  | 'rumble_skin03_attack3'
  | 'Channel_Wndup'
  | 'Crit'
  | 'rumble_skin03_joke'
  | 'Run_Base'
  | 'Spell2'
  | 'Spell3Base'
  | 'Spell4'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rumble_skin03_idle3'
  | 'rumble_skin03_idle4'
  | 'rumble_skin03_run_homeguard'
  | 'Idle_In1'
  | 'Run_In'
  | 'Idle_In2'
  | 'rumble_skin03_idle5'
  | 'Idle_Ready_in'
  | 'Idle_Ready_loop'
  | 'Idle_Ready_out'
  | 'Attack3B'
  | 'Spell1'
  | 'Recall'
  | 'rumble_skin03_laugh'
  | 'Channel_Inloop'
  | 'Channel_Loop'
  | 'Taunt_Base'
  | 'Death'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'rumble_skin03_attack1alt'
  | 'Spell2ALT'
  | 'rumble_skin03_spell3alt'
  | 'Spell4ALT'
  | 'Overheat_In'
  | 'rumble_skin03_spell3recast'
  | 'rumble_skin03_spell3altrecast'
  | 'rumble_skin03_attack2alt'
  | 'rumble_skin03_attack3alt'
  | 'rumble_skin03_attack4alt'
  | 'rumble_skin03_idle1'
  | 'Overheat_Loop'
  | 'Overheat_Out'
  | 'rumble_skin03_respawn1'
  | 'Spell3Rocket'
  | 'Spell3RecastRocket'
  | 'rumble_skin03_spell3rocket'
  | 'rumble_skin03_spell3recastrocket'
  | 'Run_Haste_In'
  | 'Run2'
  | 'rumble_skin03_recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Pilot_Recall} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-70.21, -0.04, -69.49]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Rumble_Robot_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Rumble_Shield}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
