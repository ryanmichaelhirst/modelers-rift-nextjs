import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    weapon: THREE.Bone
    weapon_a_bend1: THREE.Bone
    weapon_a_bend2: THREE.Bone
    weapon_a_bend3: THREE.Bone
    weapon_a_bend4: THREE.Bone
    weapon_b_bend1: THREE.Bone
    weapon_b_bend2: THREE.Bone
    weapon_b_bend3: THREE.Bone
    weapon_b_bend4: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    ['riotRig:MAT_monkeyking']: THREE.MeshBasicMaterial
  }
}

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
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.weapon_a_bend1} />
        <primitive object={nodes.weapon_a_bend2} />
        <primitive object={nodes.weapon_a_bend3} />
        <primitive object={nodes.weapon_a_bend4} />
        <primitive object={nodes.weapon_b_bend1} />
        <primitive object={nodes.weapon_b_bend2} />
        <primitive object={nodes.weapon_b_bend3} />
        <primitive object={nodes.weapon_b_bend4} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials['riotRig:MAT_monkeyking']}
        skeleton={nodes.mesh_0.skeleton}
        position={[-53.49, 0.04, -97.49]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
