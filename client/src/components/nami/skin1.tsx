import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Water_Large_1: THREE.Bone
    Buffbone_Water_Large_2: THREE.Bone
    Buffbone_Water_Large_3: THREE.Bone
    Buffbone_Water_Large_4: THREE.Bone
    Buffbone_Water_Meduim_1: THREE.Bone
    Buffbone_Water_Meduim_2: THREE.Bone
    Buffbone_Water_Meduim_3: THREE.Bone
    Buffbone_Water_Meduim_4: THREE.Bone
    Buffbone_Water_Meduim_5: THREE.Bone
    Buffbone_Water_Meduim_6: THREE.Bone
    Buffbone_Water_Meduim_7: THREE.Bone
    Buffbone_Water_Meduim_8: THREE.Bone
    Buffbone_Water_Small_1: THREE.Bone
    Buffbone_Water_Small_2: THREE.Bone
    Buffbone_Water_Small_3: THREE.Bone
    Buffbone_Water_Small_4: THREE.Bone
    Buffbone_Water_Small_5: THREE.Bone
    Buffbone_Water_Small_6: THREE.Bone
    Buffbone_Water_Small_7: THREE.Bone
    Buffbone_Water_Small_8: THREE.Bone
  }
  materials: {
    nami_koi_MD_body1: THREE.MeshBasicMaterial
    lambert1: THREE.MeshBasicMaterial
    nami_koi_MD_ALPHA_fins1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nami_koi_attack1'
  | 'nami_koi_attack2'
  | 'Channel_Base'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nami_koi_idle3'
  | 'Joke'
  | 'Dance'
  | 'Death'
  | 'nami_koi_laugh'
  | 'Taunt_Base'
  | 'Run_Base'
  | 'nami_koi_spell1'
  | 'nami_koi_spell2'
  | 'Spell3'
  | 'nami_koi_idle_leadin2'
  | 'nami_koi_idle_leadin3'
  | 'nami_koi_idle4'
  | 'Spell4_Base'
  | 'nami_koi_idle1'
  | 'Recall_Winddown'
  | 'nami_koi_recall_windup'
  | 'nami_koi_recall'
  | 'nami_koi_channel_in'
  | 'nami_spell1'
  | 'nami_laugh'
  | 'nami_koi_idle_leadin4'
  | 'nami_run_l'
  | 'nami_koi_spell4'
  | 'nami_taunt'
  | 'nami_koi_run'
  | 'nami_attack2'
  | 'nami_koi_crit'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Water_Large_1} />
        <primitive object={nodes.Buffbone_Water_Large_2} />
        <primitive object={nodes.Buffbone_Water_Large_3} />
        <primitive object={nodes.Buffbone_Water_Large_4} />
        <primitive object={nodes.Buffbone_Water_Meduim_1} />
        <primitive object={nodes.Buffbone_Water_Meduim_2} />
        <primitive object={nodes.Buffbone_Water_Meduim_3} />
        <primitive object={nodes.Buffbone_Water_Meduim_4} />
        <primitive object={nodes.Buffbone_Water_Meduim_5} />
        <primitive object={nodes.Buffbone_Water_Meduim_6} />
        <primitive object={nodes.Buffbone_Water_Meduim_7} />
        <primitive object={nodes.Buffbone_Water_Meduim_8} />
        <primitive object={nodes.Buffbone_Water_Small_1} />
        <primitive object={nodes.Buffbone_Water_Small_2} />
        <primitive object={nodes.Buffbone_Water_Small_3} />
        <primitive object={nodes.Buffbone_Water_Small_4} />
        <primitive object={nodes.Buffbone_Water_Small_5} />
        <primitive object={nodes.Buffbone_Water_Small_6} />
        <primitive object={nodes.Buffbone_Water_Small_7} />
        <primitive object={nodes.Buffbone_Water_Small_8} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.nami_koi_MD_body1}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.nami_koi_MD_ALPHA_fins1}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
