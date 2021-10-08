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
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Main_MAT: THREE.MeshBasicMaterial
    Cape: THREE.MeshBasicMaterial
    ShoulderSpike_MAT: THREE.MeshBasicMaterial
    Ult_MAT: THREE.MeshBasicMaterial
    weapon: THREE.MeshBasicMaterial
    wings: THREE.MeshBasicMaterial
    Pillar: THREE.MeshBasicMaterial
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
  | 'jhin_idle01_variant.pie_c_11_2'
  | 'Attack2'
  | 'Run_Fast'
  | 'Run_Passive'
  | 'Laugh'
  | 'Spell2'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Reload'
  | 'Spell4_Idle'
  | 'spell4_shoot1.pie_c_11_9'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Main_MAT} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Cape} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.ShoulderSpike_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Ult_MAT} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.weapon} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.wings} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_6.geometry} material={materials.Pillar} skeleton={nodes.mesh_0_6.skeleton} />
    </group>
  )
}
