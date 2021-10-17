import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_C_Fish1_2World: THREE.Bone
    Snap_C_Fish2_2World: THREE.Bone
    Snap_Gun2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_C_Fish_Cut_Rear_2World: THREE.Bone
    Snap_C_Fish_Cut_Front_2World: THREE.Bone
    Snap_C_Fish_Cut_Mover_2World: THREE.Bone
  }
  materials: {
    KledRider_base_fish_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Death'
  | 'rider_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Joke'
  | 'Attack2'
  | 'Spell3'
  | 'Spell2'
  | 'Idle1'
  | 'Attack1'
  | 'rider_run2'
  | 'Mount_Off'
  | 'Mount_Off_to_Run'
  | 'Mount_On'
  | 'Spell2_1'
  | 'rider_spell2_3'
  | 'Spell2_2'
  | 'Spell2_3'
  | 'Recall'
  | 'Laugh_Loop'
  | 'rider_taunt'
  | 'rider_dance'
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
        <primitive object={nodes.Snap_C_Fish1_2World} />
        <primitive object={nodes.Snap_C_Fish2_2World} />
        <primitive object={nodes.Snap_Gun2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_C_Fish_Cut_Rear_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Front_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Mover_2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.KledRider_base_fish_mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-45.25, -12.14, -90.75]}
        scale={0.01}
      />
    </group>
  )
}
