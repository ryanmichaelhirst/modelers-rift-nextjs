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
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    Root: THREE.Bone
    CapeUpper_M1_Ground: THREE.Bone
    CapeUpper_R1_Ground: THREE.Bone
    CapeUpper_L1_Ground: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_Bag_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Body_Red: THREE.MeshBasicMaterial
    Yorick_Cape: THREE.MeshBasicMaterial
    Package: THREE.MeshBasicMaterial
    Package_Red: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Recall_Arm_Right: THREE.MeshBasicMaterial
    Recall_Arm_Left: THREE.MeshBasicMaterial
    Recall_Magazine_Right: THREE.MeshBasicMaterial
    Recall_Magazine_Left: THREE.MeshBasicMaterial
    Recall_Package_Base: THREE.MeshBasicMaterial
    Recall_Package_Fort: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'DanceLoop'
  | 'Death'
  | 'Idle1'
  | 'Joke'
  | 'Laugh'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Idle'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'IdleIn'
  | 'Spell2_Run'
  | 'Spell1_Cast_Run'
  | 'yorick_spell1_cast'
  | 'Recall'
  | 'DanceIn'
  | 'yorick_run_hg'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.CapeUpper_M1_Ground} />
        <primitive object={nodes.CapeUpper_R1_Ground} />
        <primitive object={nodes.CapeUpper_L1_Ground} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_Bag_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Body_Red}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Yorick_Cape}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Package} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Package_Red}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Recall_Arm_Right}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Recall_Arm_Left}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Recall_Magazine_Right}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Recall_Magazine_Left}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Recall_Package_Base}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Recall_Package_Fort}
        skeleton={nodes.mesh_0_11.skeleton}
      />
    </group>
  )
}
