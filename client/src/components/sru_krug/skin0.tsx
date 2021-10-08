import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    SRU_Krugs_MD_Rockem_Mini2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'krug_idle_aggro'
  | 'Run'
  | 'krug_idle_n2ag'
  | 'krug_idle_normal'
  | 'krug_idle_aggro2'
  | 'krug_idle_aggro3'
  | 'krug_idle_aggro4'
  | 'krug_idle_ag2n'
  | 'Attack1'
  | 'Attack2'
  | 'Death'
  | 'Attack3'
  | 'Spawn'
  | 'Spawn_NJ'
  | 'sru_krug_idle_lookat_l'
  | 'sru_krug_idle_lookat_m'
  | 'sru_krug_idle_lookat_r'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.SRU_Krugs_MD_Rockem_Mini2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
