import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Hextech_Dragon_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run'
  | 'tft6_hextechdragon_run.tft_set6'
  | 'alert'
  | 'tft6_hextechdragon_spawn.tft_set6'
  | 'Spawn'
  | 'Death'
  | 'Spell1'
  | 'Idle1'
  | 'tft6_hextechdragon_idle_al2ag.tft_set6'
  | 'Aggro'
  | 'Landing'
  | 'Roar'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Hextech_Dragon_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-254.14, -190.97, -185.65]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
