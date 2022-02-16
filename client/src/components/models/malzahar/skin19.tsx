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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    ROOT: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    HoneyPot: THREE.Bone
    F1_Root: THREE.Bone
    F1_HoneyPotRoot: THREE.Bone
    F2_Root: THREE.Bone
    F2_HoneyPotRoot: THREE.Bone
    F3_Root: THREE.Bone
    F3_HoneyPotRoot: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Honey: THREE.MeshBasicMaterial
    RecallHoney: THREE.MeshBasicMaterial
    HoneyPot: THREE.MeshBasicMaterial
    Bee: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Spell1'
  | 'Spell3'
  | 'Buffbones_Additive'
  | 'malzahar_skin18_idlewings.pie_c_11_5'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.HoneyPot} />
        <primitive object={nodes.F1_Root} />
        <primitive object={nodes.F1_HoneyPotRoot} />
        <primitive object={nodes.F2_Root} />
        <primitive object={nodes.F2_HoneyPotRoot} />
        <primitive object={nodes.F3_Root} />
        <primitive object={nodes.F3_HoneyPotRoot} />
      </group>
      <group position={[-88.94, -0.02, -45.9]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Honey} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.RecallHoney}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.HoneyPot}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Bee} skeleton={nodes.mesh_0_4.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
