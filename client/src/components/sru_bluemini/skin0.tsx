import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Origin: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Cstm_Attack: THREE.Bone
  }
  materials: {
    Material3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'Death_Base'
  | 'sru_bluemini_idle1'
  | 'sru_bluemini_attack1'
  | 'sru_bluemini_spawn2'
  | 'sru_bluemini_intro_dormant'
  | 'sru_bluemini_attack2'
  | 'sru_bluemini_idle2'
  | 'sru_bluemini_lookat_0'
  | 'sru_bluemini_lookat_l'
  | 'sru_bluemini_lookat_r'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Origin} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Attack} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Material3} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
