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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Bug2World: THREE.Bone
    Recall_Main: THREE.Bone
    Spider_World: THREE.Bone
  }
  materials: {
    Jhin_Skin04_mat1: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
    SpiderFace: THREE.MeshBasicMaterial
    Mask: THREE.MeshBasicMaterial
    Jhin_Skin04_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle_Base'
  | 'Run'
  | 'Spell4'
  | 'Taunt'
  | 'Attack1'
  | 'Attack3'
  | 'Attack4'
  | 'jhin_idle01_variant'
  | 'Attack2'
  | 'Run_Fast'
  | 'Run_Passive'
  | 'Laugh'
  | 'Spell2'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Reload'
  | 'Spell4_Idle'
  | 'jhin_spell4_shooting1'
  | 'RunHaste'
  | 'Run_Slow'
  | 'Joke'
  | 'Idle_In'
  | 'Spell2_To_Run'
  | 'Spell3'
  | 'Death'
  | 'Run_Injured'
  | 'Recall'
  | 'Run_Haste'
  | 'Spell1'
  | 'Reload_Recoil'
  | 'Spell3_To_Run'
  | 'Spell4_To_Run'
  | 'Respawn'
  | 'Recall_Winddown'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Bug2World} />
        <primitive object={nodes.Recall_Main} />
        <primitive object={nodes.Spider_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jhin_Skin04_mat1}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Recall} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.SpiderFace}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Mask} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Jhin_Skin04_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
