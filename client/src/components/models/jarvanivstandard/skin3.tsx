import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    ['jarvanIV_dragoon_MD_v02:MAT_jarvanIV_dragoon']: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'Run' | 'Attack1'
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
        <primitive object={nodes.root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials['jarvanIV_dragoon_MD_v02:MAT_jarvanIV_dragoon']}
        skeleton={nodes.mesh_0.skeleton}
        position={[-5.64, -23.86, -17.76]}
        scale={0.02}
      />
    </group>
  )
}
