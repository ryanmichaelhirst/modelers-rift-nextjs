import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_CSTM_CHANNEL_2: THREE.Bone
    BUFFBONE_CSTM_CHANNEL_3: THREE.Bone
    BUFFBONE_CSTM_ULT1: THREE.Bone
    BUFFBONE_CSTM_ULT2: THREE.Bone
    BUFFBONE_CSTM_ULT3: THREE.Bone
    BUFFBONE_CSTM_ULT4: THREE.Bone
    BUFFBONE_CSTM_ULT5: THREE.Bone
    BUFFBONE_CSTM_ULT6: THREE.Bone
    BUFFBONE_CSTM_ULT7: THREE.Bone
    BUFFBONE_CSTM_ULT8: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_CSTM_EXTRA: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    xerath_shader: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Death'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Run'
  | 'Joke'
  | 'Spell2'
  | 'xerath_spell1'
  | 'spell5_fast'
  | 'Spell5start'
  | 'Spell5Loop'
  | 'spell5end'
  | 'xerath_taunt'
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
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_CSTM_CHANNEL_2} />
        <primitive object={nodes.BUFFBONE_CSTM_CHANNEL_3} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT1} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT2} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT3} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT4} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT5} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT6} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT7} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT8} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_EXTRA} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.xerath_shader}
        skeleton={nodes.mesh_0.skeleton}
        position={[-46.05, -9.41, -19.41]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
