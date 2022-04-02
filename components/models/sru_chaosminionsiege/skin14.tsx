import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Minion_Snowdown_Cannon_Chaos_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'cannon_chaos_attack1'
  | 'cannon_chaos_attack2'
  | 'Win1'
  | 'Win2'
  | 'Death'
  | 'cannon_chaos_death1'
  | 'Idle1'
  | 'Run'
  | 'Lose1'
  | 'Stunned'
  | 'cannon_chaos_attack3'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Minion_Snowdown_Cannon_Chaos_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-67.43, 1.98, -92.2]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
