import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Minion_Odyssey_Caster_Chaos_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Win1'
  | 'Win2'
  | 'Win3'
  | 'Win4'
  | 'Death_Caster'
  | 'Idle2'
  | 'Run2'
  | 'Lose1'
  | 'Lose2'
  | 'Stunned'
  | 'Attack1'
  | 'Death'
  | 'Idle1'
  | 'Run'
  | 'Attack2'
  | 'Attack3'
  | 'minion_melee_death2'
  | 'minion_melee_death3'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Minion_Odyssey_Caster_Chaos_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
