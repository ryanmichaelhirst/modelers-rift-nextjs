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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    L_Wing_Shoulder_Buffbone: THREE.Bone
    L_Wing_Hand_Buffbone: THREE.Bone
    L_Wing_Pinky1_Buffbone: THREE.Bone
    R_Wing_Pinky1_Buffbone: THREE.Bone
    R_Wing_Hand_Buffbone: THREE.Bone
    R_Wing_Shoulder_Buffbone: THREE.Bone
  }
  materials: {
    Swain_Skin04_Mat: THREE.MeshBasicMaterial
    Swain_Skin04_Arm_Mat: THREE.MeshBasicMaterial
    Swain_Wings_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack1_To_Idle'
  | 'Attack2'
  | 'Attack2_To_Idle'
  | 'Attack3'
  | 'DemonTrigger'
  | 'Idle1'
  | 'Passive'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell2_To_Idle'
  | 'Spell3'
  | 'Spell3_To_Idle'
  | 'Turn_-180'
  | 'Turn_-90'
  | 'Turn_0'
  | 'Turn_180'
  | 'Turn_90'
  | 'Spell1_To_Idle'
  | 'Attack3_To_Idle'
  | 'DemonTrigger_To_Run'
  | 'Spell2_To_Run'
  | 'Spell3_To_Run'
  | 'Channel'
  | 'Channel_Wndup'
  | 'DemonTrigger_To_Idle'
  | 'Spell1_To_Run'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.L_Wing_Shoulder_Buffbone} />
        <primitive object={nodes.L_Wing_Hand_Buffbone} />
        <primitive object={nodes.L_Wing_Pinky1_Buffbone} />
        <primitive object={nodes.R_Wing_Pinky1_Buffbone} />
        <primitive object={nodes.R_Wing_Hand_Buffbone} />
        <primitive object={nodes.R_Wing_Shoulder_Buffbone} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Swain_Skin04_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Swain_Skin04_Arm_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Swain_Wings_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
