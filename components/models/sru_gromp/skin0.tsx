import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Mushroom: THREE.Bone
    Mini_Root: THREE.Bone
  }
  materials: {
    Toad_Mat: THREE.MeshBasicMaterial
    SRU_Gromp_mini_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_gromp_idle1'
  | 'Attack1_Mid'
  | 'Run'
  | 'Death'
  | 'sru_gromp_idle2'
  | 'sru_gromp_idle1_aggro'
  | 'sru_gromp_idle4'
  | 'sru_gromp_idle3'
  | 'sru_gromp_idle1_aggro2'
  | 'sru_gromp_idle1_aggro3'
  | 'sru_gromp_idle1_n2a'
  | 'sru_gromp_idle1_a2n'
  | 'sru_gromp_spawn'
  | 'sru_gromp_idle5'
  | 'sru_gromp_idle6'
  | 'sru_gromp_idle1_aggro4'
  | 'sru_gromp_attack1b'
  | 'Attack1_Left'
  | 'Attack1_Right'
  | 'Attack1b_Left'
  | 'Attack1b_Right'
  | 'sru_gromp_idle1_aggro_lookat_l'
  | 'sru_gromp_idle1_aggro_lookat_r'
  | 'sru_gromp_idle1_aggro_lookat_mid'
  | 'sru_gromp_attack1'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Mushroom} />
        <primitive object={nodes.Mini_Root} />
      </group>
      <group position={[-123.56, -42.23, -218.74]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Toad_Mat} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.SRU_Gromp_mini_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
