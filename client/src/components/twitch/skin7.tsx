import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    Cheese: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Twitch_Samsung_white_MAT: THREE.MeshBasicMaterial
    Twitch_Cheese_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'twitch_base_joke'
  | 'Spell1'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Run'
  | 'Dance_Base'
  | 'Spell2'
  | 'Run_Haste'
  | 'Run_Fast'
  | 'Channel_Wndup'
  | 'Channel'
  | 'Run_Stealth'
  | 'Idle_Stealth'
  | 'twitch_base_laugh'
  | 'Recall'
  | 'Crit'
  | 'Spell3'
  | 'Idle2_Base'
  | 'Spell4'
  | 'twitch_base_idle3'
  | 'twitch_base_idlein_run1'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Taunt_Base'
  | 'twitch_base_dancein'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Cheese} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-64.53, -0.13, -176.72]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Twitch_Samsung_white_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Twitch_Cheese_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
