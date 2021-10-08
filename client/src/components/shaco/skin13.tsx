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
    R_Weapon1: THREE.Bone
    L_Weapon1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    True_World: THREE.Bone
    R_Shoulder_Part: THREE.Bone
    Torso_Part: THREE.Bone
    Head_Part: THREE.Bone
    SpineSpike_Part1: THREE.Bone
    SpineSpike_Part2: THREE.Bone
    SpineSpike_Part3: THREE.Bone
    L_Shoulder_Part: THREE.Bone
    L_smear: THREE.Bone
    R_smear: THREE.Bone
  }
  materials: {
    Shaco_Skin08_MD_Shaco_DarkStar_MAT: THREE.MeshBasicMaterial
    Shaco_Skin08_Orig_Parts_MAT: THREE.MeshBasicMaterial
    Shaco_Skin08_Recall_Parts_MAT: THREE.MeshBasicMaterial
    smear_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Run'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Weapon1} />
        <primitive object={nodes.L_Weapon1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.R_Shoulder_Part} />
        <primitive object={nodes.Torso_Part} />
        <primitive object={nodes.Head_Part} />
        <primitive object={nodes.SpineSpike_Part1} />
        <primitive object={nodes.SpineSpike_Part2} />
        <primitive object={nodes.SpineSpike_Part3} />
        <primitive object={nodes.L_Shoulder_Part} />
        <primitive object={nodes.L_smear} />
        <primitive object={nodes.R_smear} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Shaco_Skin08_MD_Shaco_DarkStar_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Shaco_Skin08_Orig_Parts_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Shaco_Skin08_Recall_Parts_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.smear_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
