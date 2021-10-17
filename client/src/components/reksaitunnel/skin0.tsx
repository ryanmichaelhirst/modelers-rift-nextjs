import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    RekSaiTunnel: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Close'
  | 'Open'
  | 'Spawn'
  | 'Death_Closed'
  | 'Death_Open'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Spell4_Windup'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.RekSaiTunnel}
        skeleton={nodes.mesh_0.skeleton}
        position={[-93.93, -0.25, -153.61]}
        scale={0.02}
      />
    </group>
  )
}
