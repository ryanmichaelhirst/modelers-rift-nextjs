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
    LunarCity2057_Boat_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lunarrevel_boat_idle01_a.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle02_a.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_additive01.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle01_b.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle01_c.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle01_d.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle02_b.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle02_c.tft_arenaskin_lunarrevel'
  | 'lunarrevel_boat_idle02_d.tft_arenaskin_lunarrevel'
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
        material={materials.LunarCity2057_Boat_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-420.5, 0, -209.65]}
        scale={0.1}
      />
    </group>
  )
}, areEqual)

export default Model
