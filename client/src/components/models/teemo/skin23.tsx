import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    BeeA_Root: THREE.Bone
    BeeB_Root: THREE.Bone
    BeeC_Root: THREE.Bone
    FlowerA_Stem1: THREE.Bone
    FlowerB_Stem1: THREE.Bone
    FlowerC_Stem1: THREE.Bone
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Recall: THREE.MeshBasicMaterial
    Teemo_Skin18_MAT: THREE.MeshBasicMaterial
    Honey: THREE.MeshBasicMaterial
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
  | 'Idle1'
  | 'Idle2'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Run_Fast'
  | 'Homeguard'
  | 'Recall_Winddown'
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
        <primitive object={nodes.BeeA_Root} />
        <primitive object={nodes.BeeB_Root} />
        <primitive object={nodes.BeeC_Root} />
        <primitive object={nodes.FlowerA_Stem1} />
        <primitive object={nodes.FlowerB_Stem1} />
        <primitive object={nodes.FlowerC_Stem1} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <group position={[-28.85, -0.76, -40.17]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Recall} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Teemo_Skin18_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Honey} skeleton={nodes.mesh_0_2.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
