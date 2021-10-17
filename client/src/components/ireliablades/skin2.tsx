import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Sword_Root: THREE.Bone
  }
  materials: {
    blades: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'irelia_spell4__blades_cast'
  | 'irelia_spell4__blades_death'
  | 'irelia_spell4__blades_deathcycle'
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
        <primitive object={nodes.Sword_Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.blades}
        skeleton={nodes.mesh_0.skeleton}
        position={[-3.67, 97, -131.19]}
        scale={0.01}
      />
    </group>
  )
}
