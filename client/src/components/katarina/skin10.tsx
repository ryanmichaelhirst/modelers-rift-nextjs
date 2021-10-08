import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    C_BuffBone_Glb_Layout_Loc: THREE.Bone
    BuffBone_Glb_Channel_Loc: THREE.Bone
    BuffBone_Glb_Ground_Loc: THREE.Bone
    C_BuffBone_Glb_Center_Loc: THREE.Bone
    L_Weapon_Snap: THREE.Bone
    R_Weapon_Snap: THREE.Bone
  }
  materials: {
    MF1: THREE.MeshBasicMaterial
    katarina_base_2012_MD_v01_blinn1SG2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Taunt'
  | 'Run1'
  | 'Spell1'
  | 'Spell2'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Joke'
  | 'Recall'
  | 'Run2'
  | 'Spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Idle2'
  | 'katarina_skin10_spell3'
  | 'katarina_skin10_crit'
  | 'RunHaste'
  | 'Idle_In'
  | 'Spell2_Throw'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_L90'
  | 'Turn_R180'
  | 'Turn_R90'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Layout_Loc} />
        <primitive object={nodes.BuffBone_Glb_Channel_Loc} />
        <primitive object={nodes.BuffBone_Glb_Ground_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Center_Loc} />
        <primitive object={nodes.L_Weapon_Snap} />
        <primitive object={nodes.R_Weapon_Snap} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.MF1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.katarina_base_2012_MD_v01_blinn1SG2}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
