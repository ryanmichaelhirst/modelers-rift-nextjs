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
    Root: THREE.Bone
    Knife_01: THREE.Bone
    Knife_02: THREE.Bone
    Knife_03: THREE.Bone
    Knife_04: THREE.Bone
    Knife_05: THREE.Bone
    Knife_06: THREE.Bone
    Knife_07: THREE.Bone
    Knife_08: THREE.Bone
    Knife_09: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Sword2World: THREE.Bone
    Skin12_BigSword: THREE.Bone
    Skin12_RecallSword1: THREE.Bone
    Skin12_RecallSword2: THREE.Bone
    Skin12_RecallSword3: THREE.Bone
    Skin12_RecallSword4: THREE.Bone
  }
  materials: {
    Talon_Skin12_TX3: THREE.MeshBasicMaterial
    Talon_Skin12_Recall_Mat: THREE.MeshBasicMaterial
    Talon_Skin12_RecallSword_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'talon_skin12_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell3_Long'
  | 'talon_skin12_spell3_longtorun'
  | 'Spell3_Medium'
  | 'Spell3_Medium_toRun'
  | 'Spell1_Leap'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'talon_recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Knife_01} />
        <primitive object={nodes.Knife_02} />
        <primitive object={nodes.Knife_03} />
        <primitive object={nodes.Knife_04} />
        <primitive object={nodes.Knife_05} />
        <primitive object={nodes.Knife_06} />
        <primitive object={nodes.Knife_07} />
        <primitive object={nodes.Knife_08} />
        <primitive object={nodes.Knife_09} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Sword2World} />
        <primitive object={nodes.Skin12_BigSword} />
        <primitive object={nodes.Skin12_RecallSword1} />
        <primitive object={nodes.Skin12_RecallSword2} />
        <primitive object={nodes.Skin12_RecallSword3} />
        <primitive object={nodes.Skin12_RecallSword4} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Talon_Skin12_TX3}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Talon_Skin12_Recall_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Talon_Skin12_RecallSword_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
