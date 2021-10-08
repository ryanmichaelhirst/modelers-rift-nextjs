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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
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
    Nami_ImmortalJourney_MD_Nami_ImmortalJourney_MAT: THREE.MeshBasicMaterial
    armsOnly_MAT: THREE.MeshBasicMaterial
    Nami_ImmortalJourney_MAT: THREE.MeshBasicMaterial
    legs_MAT: THREE.MeshBasicMaterial
    tail_MAT: THREE.MeshBasicMaterial
    Nami_Skin15_Main_MD_Nami_ImmortalJourney_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nami_skin15_attack1'
  | 'nami_skin15_attack2'
  | 'Channel_Base'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nami_skin09_idle3'
  | 'Joke'
  | 'Dance'
  | 'nami_skin15_laugh'
  | 'Taunt_Base'
  | 'Run_Base'
  | 'nami_koi_spell1'
  | 'nami_koi_spell2'
  | 'Spell3'
  | 'nami_skin15_idle_leadin2'
  | 'nami_skin15_idle_leadin3'
  | 'nami_skin09_idle4'
  | 'Spell4_Base'
  | 'nami_skin09_idle1'
  | 'Recall'
  | 'nami_koi_channel_in'
  | 'nami_skin09_laugh'
  | 'nami_skin15_idle_leadin4'
  | 'nami_koi_spell4'
  | 'nami_skin15_taunt'
  | 'nami_skin15_run'
  | 'nami_koi_attack1'
  | 'nami_koi_attack2'
  | 'nami_koi_crit'
  | 'Recall_Winddown'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Death_Base'
  | 'Death_Water'
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
        material={materials.Nami_ImmortalJourney_MD_Nami_ImmortalJourney_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.armsOnly_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Nami_ImmortalJourney_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.legs_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.tail_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Nami_Skin15_Main_MD_Nami_ImmortalJourney_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
