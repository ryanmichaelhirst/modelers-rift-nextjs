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
    Sheath: THREE.Bone
    Instrument: THREE.Bone
    Stool: THREE.Bone
    Bow: THREE.Bone
  }
  materials: {
    GhostKatana: THREE.MeshBasicMaterial
    Skirt: THREE.MeshBasicMaterial
    Katana_Smear: THREE.MeshBasicMaterial
    GhostKatana_Smear: THREE.MeshBasicMaterial
    Instrument: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tft6_yone_attack1_idle.tft_set6'
  | 'tft6_yone_attack1.tft_set6'
  | 'tft6_yone_attack2_idle.tft_set6'
  | 'tft6_yone_attack2.tft_set6'
  | 'tft6_yone_attack3_idle.tft_set6'
  | 'tft6_yone_attack3.tft_set6'
  | 'tft6_yone_attack4_idle.tft_set6'
  | 'tft6_yone_attack4.tft_set6'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Run'
  | 'tft6_yone_spell3_spiritin.tft_set6'
  | 'tft6_yone_spell3_bodyin.tft_set6'
  | 'Spell3_Dash'
  | 'tft6_yone_spell3_spiritin_toidle.tft_set6'
  | 'tft6_yone_run01.tft_set6'
  | 'tft6_yone_spell3_end1.tft_set6'
  | 'tft6_yone_spell3_end2.tft_set6'
  | 'tft6_yone_attacks_fast01_toidle.tft_set6'
  | 'tft6_yone_attacks_fast01.tft_set6'
  | 'tft6_yone_attacks_fast01_torun.tft_set6'
  | 'tft6_yone_attacks_fast02_toidle.tft_set6'
  | 'tft6_yone_attacks_fast02.tft_set6'
  | 'tft6_yone_attacks_fast02_torun.tft_set6'
  | 'tft6_yone_attacks_fast03_toidle.tft_set6'
  | 'tft6_yone_attacks_fast03.tft_set6'
  | 'tft6_yone_attacks_fast03_torun.tft_set6'
  | 'tft6_yone_attacks_fast04_toidle.tft_set6'
  | 'tft6_yone_attacks_fast04.tft_set6'
  | 'tft6_yone_attacks_fast04_torun.tft_set6'
  | 'tft6_yone_challengerdash.tft_set6'
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
        <primitive object={nodes.Sheath} />
        <primitive object={nodes.Instrument} />
        <primitive object={nodes.Stool} />
        <primitive object={nodes.Bow} />
      </group>
      <group position={[-65.76, -5.92, -94.72]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.GhostKatana}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Skirt} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Katana_Smear}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.GhostKatana_Smear}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Instrument}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
