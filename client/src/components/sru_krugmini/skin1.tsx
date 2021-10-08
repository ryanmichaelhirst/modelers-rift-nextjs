import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
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
    Rockem_Mini2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'krug_idle_aggro'
  | 'Run'
  | 'krug_mini_idle_n2ag'
  | 'krug_idle_normal'
  | 'Death'
  | 'krug_attack2'
  | 'krug_attack3'
  | 'krug_idle_aggro2'
  | 'krug_idle_aggro3'
  | 'krug_idle_aggro4'
  | 'krug_idle_ag2n'
  | 'krug_attack1'
  | 'krug_attack4'
  | 'krug_attack5'
  | 'Spawn'
  | 'krug_spawn_mini_nj'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Rockem_Mini2}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
