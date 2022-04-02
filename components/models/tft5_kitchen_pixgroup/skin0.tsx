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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Pix: THREE.Bone
  }
  materials: {
    Pie_Whole: THREE.MeshBasicMaterial
    Plate: THREE.MeshBasicMaterial
    Knife: THREE.MeshBasicMaterial
    Broom: THREE.MeshBasicMaterial
    Rag: THREE.MeshBasicMaterial
    Pie_Plate: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tft5_kitchen_pix_idle_dishes_plate.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_idle_dishes_rag.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_win_plate.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_win_pie.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_win_knife.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_loss_plate.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_loss_pie.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_loss_knife.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_knife_idle.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_broom_sweep.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_winstreak_pie.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_sink_loss_plate.tft_arenaskin_set5_5'
  | 'tft5_kitchen_pix_sink_loss_rag.tft_arenaskin_set5_5'
  | 'Empty'
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
        <primitive object={nodes.Pix} />
      </group>
      <group position={[-94.66, -283.15, -94.68]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Pie_Whole}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Plate}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Knife}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Broom}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Rag}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Pie_Plate}
          skeleton={nodes.mesh_0_5.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
