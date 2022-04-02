import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    sapling_l_forearm: THREE.Bone
    sapling_l_uparm: THREE.Bone
    sapling_root: THREE.Bone
    sapling_r_uparm: THREE.Bone
    sapling_chest: THREE.Bone
    sapling_head: THREE.Bone
    sapling_hair: THREE.Bone
    sapling_l_knee: THREE.Bone
    sapling_r_forearm: THREE.Bone
    sapling_l_thigh: THREE.Bone
    sapling_r_thigh: THREE.Bone
    sapling_hair_b: THREE.Bone
    sapling_r_knee: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    sapling_Hair_c: THREE.Bone
    Ball: THREE.Bone
  }
  materials: {
    Maokai_Skin06_MAT: THREE.MeshBasicMaterial
    Ball_Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'maokai_skin06_idle3'
  | 'Joke'
  | 'Laugh'
  | 'Passive'
  | 'Run'
  | 'Spell1'
  | 'maokai_spell2_down'
  | 'Spell2U'
  | 'maokai_spell2_down_idle'
  | 'Spell3'
  | 'Taunt'
  | 'Buffbones'
  | 'Idle_In'
  | 'Recall'
  | 'Spell4_Base'
  | 'maokai_skin06_spell4'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.sapling_l_forearm} />
        <primitive object={nodes.sapling_l_uparm} />
        <primitive object={nodes.sapling_root} />
        <primitive object={nodes.sapling_r_uparm} />
        <primitive object={nodes.sapling_chest} />
        <primitive object={nodes.sapling_head} />
        <primitive object={nodes.sapling_hair} />
        <primitive object={nodes.sapling_l_knee} />
        <primitive object={nodes.sapling_r_forearm} />
        <primitive object={nodes.sapling_l_thigh} />
        <primitive object={nodes.sapling_r_thigh} />
        <primitive object={nodes.sapling_hair_b} />
        <primitive object={nodes.sapling_r_knee} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.sapling_Hair_c} />
        <primitive object={nodes.Ball} />
      </group>
      <group position={[-185.19, -19.82, -138.85]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Maokai_Skin06_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Ball_Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
