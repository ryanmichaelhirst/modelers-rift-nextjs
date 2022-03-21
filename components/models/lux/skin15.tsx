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
    Platform: THREE.Bone
    Book: THREE.Bone
    Bread: THREE.Bone
  }
  materials: {
    Lux_Skin15_Body_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Recall_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Dummy_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Book_MAT: THREE.MeshBasicMaterial
    Lux_Skin15_Bread_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'lux_skin15_spell2'
  | 'lux_skin15_spell3'
  | 'Taunt'
  | 'Spell4'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'lux_skin15_run'
  | 'Recall'
  | 'Run_Homeguard'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'Spell1_Upper'
  | 'lux_skin15_spell1'
  | 'Spell3_Upper'
  | 'Attack2'
  | 'Crit'
  | 'Run_Homeguard_IN'
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
        <primitive object={nodes.Platform} />
        <primitive object={nodes.Book} />
        <primitive object={nodes.Bread} />
      </group>
      <group position={[-131.45, -4.22, -132.19]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Lux_Skin15_Body_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Lux_Skin15_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Lux_Skin15_Dummy_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Lux_Skin15_Book_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Lux_Skin15_Bread_MAT}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
