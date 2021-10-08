import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
  }
  materials: {
    lambert5: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'elisespider_idle1'
  | 'elise_spider_spell3_a'
  | 'elise_spider_spell3_b'
  | 'elisespider_spell3_c'
  | 'elisespider_spell3_d'
  | 'elisespider_spell3_e'
  | 'Spell1'
  | 'elisespider_attack1'
  | 'elisespider_attack2'
  | 'elisespider_attack3'
  | 'elisespider_death'
  | 'elisespider_death2'
  | 'elisespider_death3'
  | 'Spell2'
  | 'Laugh'
  | 'Dance'
  | 'Joke'
  | 'Taunt'
  | 'Death'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert5} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
