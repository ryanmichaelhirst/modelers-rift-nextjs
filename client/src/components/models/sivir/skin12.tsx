import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Pizza_Weight: THREE.Bone
    Scooter_Main: THREE.Bone
    Scooter_PizzaBag: THREE.Bone
  }
  materials: {
    Sivir_PizzaDelivery_MAT1: THREE.MeshBasicMaterial
    blinn1: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Dance'
  | 'Idle1_Base'
  | 'sivir_idle1'
  | 'Run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'sivir_idlein_run'
  | 'sivir_idlein_run2'
  | 'Spell1_Catch'
  | 'sivir_respawn'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Taunt_Base'
  | 'sivir_laugh'
  | 'sivir_joke'
  | 'sivir_idlein_attack'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Spell1'
  | 'sivir_taunt'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Pizza_Weight} />
        <primitive object={nodes.Scooter_Main} />
        <primitive object={nodes.Scooter_PizzaBag} />
      </group>
      <group position={[-60.91, 0.04, -75.18]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Sivir_PizzaDelivery_MAT1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.blinn1}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
