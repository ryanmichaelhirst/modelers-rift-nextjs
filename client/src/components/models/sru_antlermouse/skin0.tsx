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
    lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2_Base'
  | 'sru_antlermouse_run_right'
  | 'sru_antlermouse_run_left'
  | 'sru_antlermouse_run'
  | 'sru_antlermouse_run_fwdright'
  | 'sru_antlermouse_idlewait'
  | 'sru_antlermouse_hiding'
  | 'sru_antlermouse_peeking'
  | 'Explore_Base'
  | 'sru_antlermouse_peekinghold'
  | 'IdleToPeek_TRANS'
  | 'BaseRunHide'
  | 'BaseRunHide2'
  | 'sru_antlermouse_midlanerun'
  | 'Destroy'
  | 'Explore_Hold'
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
        material={materials.lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-16.43, -0.18, -81.44]}
        scale={0.01}
      />
    </group>
  )
}
