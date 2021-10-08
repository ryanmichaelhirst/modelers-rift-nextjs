import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    FX_bone_body: THREE.Bone
    root: THREE.Bone
    BUFFBONE_CSTM_GROUND: THREE.Bone
  }
  materials: {
    fizzurf_fisherman_MD_v01_fizzUrf_fisherman_MD_V01mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spell4' | 'Idle1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.FX_bone_body} />
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_CSTM_GROUND} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.fizzurf_fisherman_MD_v01_fizzUrf_fisherman_MD_V01mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
