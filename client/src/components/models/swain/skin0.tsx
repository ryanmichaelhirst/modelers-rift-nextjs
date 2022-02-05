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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    L_ShoulderPad_Aim: THREE.Bone
    R_ShoulderPad_Aim: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
  }
  materials: {
    Swain_Mat: THREE.MeshBasicMaterial
    cane: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle_Loop'
  | 'Laugh'
  | 'RunNormal'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Taunt'
  | 'Dance_Into'
  | 'JokeIn'
  | 'Attack3'
  | 'swain_demonland'
  | 'DemonWindup'
  | 'IdleOut_To_IdleIn'
  | 'Joke_Loop'
  | 'Passive'
  | 'RunFast'
  | 'Run_To_Idle'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Spell3_To_Idle'
  | 'Spell3_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'Turn_-90'
  | 'Turn_0'
  | 'Turn_90'
  | 'KnockUp'
  | 'Stun'
  | 'Recall'
  | 'Dance_Loop'
  | 'swain_demonland_to_idle'
  | 'swain_demonland_to_run'
  | 'Respawn'
  | 'RunHomeguard'
  | 'Recall_Winddown'
  | 'RunSlow'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.L_ShoulderPad_Aim} />
        <primitive object={nodes.R_ShoulderPad_Aim} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
      </group>
      <group position={[-87.96, -0.16, -50.25]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Swain_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.cane}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
