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
    C_BUFFBONE_CSTM_BEAM: THREE.Bone
    WeaponBottom_World: THREE.Bone
    WeaponTop_World: THREE.Bone
    Weapon_World: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Bread: THREE.Bone
    Book: THREE.Bone
    Skate_Base: THREE.Bone
    BlobbyBaby_Base: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    Orb: THREE.MeshBasicMaterial
    BlobbyBaby: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1'
  | 'Idle2'
  | 'Idle4'
  | 'lux_skin16_spell2'
  | 'lux_skin16_spell3'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'run.pie_c_11_7'
  | 'Recall'
  | 'Spell1_Upper'
  | 'lux_skin16_spell1'
  | 'Spell3_Upper'
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
        <primitive object={nodes.C_BUFFBONE_CSTM_BEAM} />
        <primitive object={nodes.WeaponBottom_World} />
        <primitive object={nodes.WeaponTop_World} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Bread} />
        <primitive object={nodes.Book} />
        <primitive object={nodes.Skate_Base} />
        <primitive object={nodes.BlobbyBaby_Base} />
      </group>
      <group position={[-59.78, -4.22, -16.67]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Orb}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.BlobbyBaby}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
