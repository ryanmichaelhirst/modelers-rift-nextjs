import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    BallDown: THREE.Bone
    Buffbone_Cstm_Ball_Ground: THREE.Bone
  }
  materials: {
    Orianna_DarkStar_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Idle1' | 'Run' | 'Death'
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
        <primitive object={nodes.BallDown} />
        <primitive object={nodes.Buffbone_Cstm_Ball_Ground} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Orianna_DarkStar_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-126.46, 66.86, -29.83]}
        scale={0}
      />
    </group>
  )
}
