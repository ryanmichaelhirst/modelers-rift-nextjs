import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    ROOT: THREE.Bone
    L_thigh: THREE.Bone
    R_thigh: THREE.Bone
    TailL1_a: THREE.Bone
    TailL2_a: THREE.Bone
    TailL3_a: THREE.Bone
    TailL4_a: THREE.Bone
    TailR1_a: THREE.Bone
    TailR2_a: THREE.Bone
    TailR3_a: THREE.Bone
    TailR4_a: THREE.Bone
    Tail_A: THREE.Bone
    weapon: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    gumiho_base_body_MD_dfddd3: THREE.MeshBasicMaterial
  }
}

type ActionName = 'Attack1' | 'Attack2' | 'Crit' | 'Death' | 'Run' | 'Idle1' | 'Celebration' | 'Spell1'
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
        <primitive object={nodes.ROOT} />
        <primitive object={nodes.L_thigh} />
        <primitive object={nodes.R_thigh} />
        <primitive object={nodes.TailL1_a} />
        <primitive object={nodes.TailL2_a} />
        <primitive object={nodes.TailL3_a} />
        <primitive object={nodes.TailL4_a} />
        <primitive object={nodes.TailR1_a} />
        <primitive object={nodes.TailR2_a} />
        <primitive object={nodes.TailR3_a} />
        <primitive object={nodes.TailR4_a} />
        <primitive object={nodes.Tail_A} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.gumiho_base_body_MD_dfddd3}
        skeleton={nodes.mesh_0.skeleton}
        position={[-123.5, -6.93, -105.08]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
