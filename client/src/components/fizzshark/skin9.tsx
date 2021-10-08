import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    FX_bone_body: THREE.Bone
    root: THREE.Bone
    BUFFBONE_CSTM_GROUND: THREE.Bone
  }
  materials: {
    FizzShark_Skin09_mat: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Spell4' | 'Idle1'
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
        <primitive object={nodes.FX_bone_body} />
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_CSTM_GROUND} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.FizzShark_Skin09_mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
