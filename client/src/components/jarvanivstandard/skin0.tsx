import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    ['jarvanIV_base_RG_weapon_v01:jarvanIV_base_MD_Final:jarvanIV_bas']: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Death' | 'Idle1' | 'Run' | 'Attack1'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        material={materials['jarvanIV_base_RG_weapon_v01:jarvanIV_base_MD_Final:jarvanIV_bas']}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
