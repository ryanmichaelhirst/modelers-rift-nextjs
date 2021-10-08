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
    root: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_Chair_Platform: THREE.Bone
    R_ChairArm: THREE.Bone
    L_ChairArm: THREE.Bone
    C_ChairFloor: THREE.Bone
    C_ChairBack: THREE.Bone
    C_Chair: THREE.Bone
    C_Snap_Bow_To_Underground: THREE.Bone
  }
  materials: {
    Ashe_Bow: THREE.MeshBasicMaterial
    Ashe_Body: THREE.MeshBasicMaterial
    Ashe_Chair: THREE.MeshBasicMaterial
    Ashe_Bow_Scale: THREE.MeshBasicMaterial
    Ashe_Flower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Laugh'
  | 'Run'
  | 'Run2'
  | 'Run3'
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
  | 'ashe_taunt'
  | 'Recall'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_Chair_Platform} />
        <primitive object={nodes.R_ChairArm} />
        <primitive object={nodes.L_ChairArm} />
        <primitive object={nodes.C_ChairFloor} />
        <primitive object={nodes.C_ChairBack} />
        <primitive object={nodes.C_Chair} />
        <primitive object={nodes.C_Snap_Bow_To_Underground} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Ashe_Bow} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Ashe_Body}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ashe_Chair}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Ashe_Bow_Scale}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Ashe_Flower}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
