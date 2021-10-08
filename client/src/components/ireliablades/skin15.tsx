import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Sword_Root: THREE.Bone
  }
  materials: {
    Irelia_Skin15_blades_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'irelia_spell4__blades_cast'
  | 'irelia_spell4__blades_death'
  | 'irelia_spell4__blades_deathcycle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        material={materials.Irelia_Skin15_blades_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
