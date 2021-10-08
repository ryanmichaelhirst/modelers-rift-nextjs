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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Lunar_Door: THREE.Bone
  }
  materials: {
    _lambert16: THREE.MeshBasicMaterial
    _lambert15: THREE.MeshBasicMaterial
    Nasus_Skin11_Hair: THREE.MeshBasicMaterial
    Lunar_Recall_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nasus_leadin'
  | 'nasus_joke'
  | 'nasus_laugh'
  | 'Recall'
  | 'nasus_skin11_recall_winddown'
  | 'Run'
  | 'Run1_In'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Ult'
  | 'nasus_run_fast'
  | 'nasus_spell1'
  | 'Spell1_Upper'
  | 'nasus_spell2_full'
  | 'Spell3_Base'
  | 'Spell3_Upper'
  | 'Spell4_Base'
  | 'nasus_spell4_full'
  | 'Taunt_Base'
  | 'nasus_taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Lunar_Door} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials._lambert16} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials._lambert15}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Nasus_Skin11_Hair}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Lunar_Recall_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
