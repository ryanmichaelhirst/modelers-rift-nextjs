import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Btlcast_Tent1: THREE.Bone
  }
  materials: {
    Skin02_Mat: THREE.MeshBasicMaterial
    Skin02_Tentacle_Mat: THREE.MeshBasicMaterial
    Skin02_Relic_Mat: THREE.MeshBasicMaterial
    Skin02_Straps_Mat: THREE.MeshBasicMaterial
    Skin02_Spine_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Spell1'
  | 'Idle1_Base'
  | 'Attack2'
  | 'Attack1'
  | 'Attack3'
  | 'Spell4'
  | 'Idle1_In1'
  | 'Death'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Passive'
  | 'Spell2'
  | 'Attack_Tower'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Run_Slow'
  | 'illaoi_spell3_a'
  | 'Spell3_B_Long'
  | 'Spell3_B_Short'
  | 'Spell3_B_Medium'
  | 'Idle_Transition'
  | 'Spell3_B_Medium_Further'
  | 'Laugh'
  | 'Joke'
  | 'Spell4_ToIdle'
  | 'Dance'
  | 'Dance_In'
  | 'Spell2_Long'
  | 'Spell3_a_toidle'
  | 'Spell2_To_Run'
  | 'Spell2_Long_to_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_Long_A'
  | 'Spell2_Long_B'
  | 'Crit'
  | 'Spell3_A_Scale'
  | 'Spell1_To_Run'
  | 'Recall_Leadout'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Btlcast_Tent1} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Skin02_Mat} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Skin02_Tentacle_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skin02_Relic_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Skin02_Straps_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin02_Spine_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
