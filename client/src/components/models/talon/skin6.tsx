import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    knife_01: THREE.Bone
    knife_02: THREE.Bone
    knife_03: THREE.Bone
    knife_04: THREE.Bone
    knife_05: THREE.Bone
    knife_06: THREE.Bone
    knife_07: THREE.Bone
    knife_08: THREE.Bone
    knife_09: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC1: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC1: THREE.Bone
  }
  materials: {
    talon_silverdragon_MD_blinn7: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell3_Long'
  | 'talon_spell3_longtorun'
  | 'Spell3_Medium'
  | 'Spell3_Medium_toRun'
  | 'Spell1_Leap'
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
        <primitive object={nodes.knife_01} />
        <primitive object={nodes.knife_02} />
        <primitive object={nodes.knife_03} />
        <primitive object={nodes.knife_04} />
        <primitive object={nodes.knife_05} />
        <primitive object={nodes.knife_06} />
        <primitive object={nodes.knife_07} />
        <primitive object={nodes.knife_08} />
        <primitive object={nodes.knife_09} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC1} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.talon_silverdragon_MD_blinn7}
        skeleton={nodes.mesh_0.skeleton}
        position={[-83.58, -0.25, -62.48]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
