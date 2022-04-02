import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Trophy_Base: THREE.Bone
    Crystal_Recall: THREE.Bone
    Shard6: THREE.Bone
    Shard5: THREE.Bone
    Shard4: THREE.Bone
    Shard3: THREE.Bone
    Shard2: THREE.Bone
    Shard1: THREE.Bone
    Snap_Bow1: THREE.Bone
    Snap_Bow2: THREE.Bone
    Snap_Crystal1: THREE.Bone
    Snap_Crystal2: THREE.Bone
    Snap_Crystal3: THREE.Bone
  }
  materials: {
    Varus_Skin07_Mat: THREE.MeshBasicMaterial
    Skin07_Recall_Mat: THREE.MeshBasicMaterial
    Skin07_Crystal_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'varus_idle1'
  | 'varus_idle2'
  | 'varus_idle3'
  | 'varus_idle4'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Spell1'
  | 'Spell1_Walk'
  | 'Spell1_Idle'
  | 'Spell1_Fire'
  | 'Joke'
  | 'Run'
  | 'Run2'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Trophy_Base} />
        <primitive object={nodes.Crystal_Recall} />
        <primitive object={nodes.Shard6} />
        <primitive object={nodes.Shard5} />
        <primitive object={nodes.Shard4} />
        <primitive object={nodes.Shard3} />
        <primitive object={nodes.Shard2} />
        <primitive object={nodes.Shard1} />
        <primitive object={nodes.Snap_Bow1} />
        <primitive object={nodes.Snap_Bow2} />
        <primitive object={nodes.Snap_Crystal1} />
        <primitive object={nodes.Snap_Crystal2} />
        <primitive object={nodes.Snap_Crystal3} />
      </group>
      <group position={[-31.91, -27.27, -36.59]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Varus_Skin07_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin07_Recall_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Skin07_Crystal_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
