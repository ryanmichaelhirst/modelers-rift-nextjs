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
    L_Arm_Socket: THREE.Bone
    Root: THREE.Bone
    L_Wing_Shoulder_Buffbone: THREE.Bone
    R_Wing_Shoulder_Buffbone: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Leg_Socket: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    R_Leg_Socket: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_ShoulderPad_Aim: THREE.Bone
    R_ShoulderPad_Aim: THREE.Bone
    L_Wing_Pinky1_Buffbone: THREE.Bone
    L_Wing_Hand_Buffbone: THREE.Bone
    R_Wing_Hand_Buffbone: THREE.Bone
    R_Wing_Pinky1_Buffbone: THREE.Bone
  }
  materials: {
    Head_MAT: THREE.MeshBasicMaterial
    Body_MAT: THREE.MeshBasicMaterial
    Small_Wings_MAT: THREE.MeshBasicMaterial
    Pad_Wings_MAT1: THREE.MeshBasicMaterial
    cane: THREE.MeshBasicMaterial
    Wing_MAT: THREE.MeshBasicMaterial
    Helmet_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle_Loop'
  | 'Laugh'
  | 'RunNormal'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Taunt'
  | 'Dance_Into'
  | 'JokeIn'
  | 'Attack3'
  | 'swain_demonland'
  | 'DemonWindup'
  | 'IdleOut_To_IdleIn'
  | 'Joke_Loop'
  | 'Passive'
  | 'RunFast'
  | 'Run_To_Idle'
  | 'Spell1_To_Idle'
  | 'Spell1_To_Run'
  | 'Spell3_To_Idle'
  | 'Spell3_To_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'KnockUp'
  | 'Stun'
  | 'Recall'
  | 'Dance_Loop'
  | 'swain_demonland_to_idle'
  | 'swain_demonland_to_run'
  | 'Respawn'
  | 'RunHomeguard'
  | 'Recall_Winddown'
  | 'RunSlow'
  | 'swain_hextech_additive_overheadbuffbone'
  | 'Turn_-90'
  | 'Turn_0'
  | 'Turn_90'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_Wing_Shoulder_Buffbone} />
        <primitive object={nodes.R_Wing_Shoulder_Buffbone} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Leg_Socket} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.R_Leg_Socket} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_ShoulderPad_Aim} />
        <primitive object={nodes.R_ShoulderPad_Aim} />
        <primitive object={nodes.L_Wing_Pinky1_Buffbone} />
        <primitive object={nodes.L_Wing_Hand_Buffbone} />
        <primitive object={nodes.R_Wing_Hand_Buffbone} />
        <primitive object={nodes.R_Wing_Pinky1_Buffbone} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Head_MAT} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Body_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Small_Wings_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Pad_Wings_MAT1}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.cane} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Wing_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Helmet_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
    </group>
  )
}
