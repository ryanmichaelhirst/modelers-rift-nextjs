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
    Root: THREE.Bone
    C_Drone_Base: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bow_World_Bone: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    Head_MAT: THREE.MeshBasicMaterial
    Drone_MAT: THREE.MeshBasicMaterial
    Head2_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'ashe_skin08_attack1'
  | 'Crit'
  | 'Death'
  | 'ashe_skin08_idle1'
  | 'Laugh'
  | 'ashe_skin08_run'
  | 'Run2'
  | 'Run3'
  | 'ashe_skin08_spell1'
  | 'Spell4_Base'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'ashe_skin08_dance'
  | 'Joke'
  | 'ashe_skin08_attack2'
  | 'Spell3'
  | 'ashe_skin08_spell2'
  | 'ashe_skin08_attack3'
  | 'Recall'
  | 'Recall_Winddown'
  | 'ashe_skin08_spell4'
  | 'Spell1_In'
  | 'ashe_skin08_spell1_2'
  | 'Idle_In'
  | 'Idle_Start'
  | 'ashe_skin08_idle2'
  | 'ashe_skin08_idle3'
  | 'Respawn'
  | 'Dance_In'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Drone_Base} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bow_World_Bone} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_MAT} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Head_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Drone_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Head2_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
