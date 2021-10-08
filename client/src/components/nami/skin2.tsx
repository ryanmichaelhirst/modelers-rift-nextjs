import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Water_Small_8: THREE.Bone
    Buffbone_Water_Small_7: THREE.Bone
    Buffbone_Water_Small_6: THREE.Bone
    Buffbone_Water_Small_5: THREE.Bone
    Buffbone_Water_Small_4: THREE.Bone
    Buffbone_Water_Small_3: THREE.Bone
    Buffbone_Water_Small_2: THREE.Bone
    Buffbone_Water_Small_1: THREE.Bone
    Buffbone_Water_Meduim_8: THREE.Bone
    Buffbone_Water_Meduim_7: THREE.Bone
    Buffbone_Water_Meduim_6: THREE.Bone
    Buffbone_Water_Meduim_5: THREE.Bone
    Buffbone_Water_Meduim_4: THREE.Bone
    Buffbone_Water_Meduim_3: THREE.Bone
    Buffbone_Water_Meduim_2: THREE.Bone
    Buffbone_Water_Meduim_1: THREE.Bone
    Buffbone_Water_Large_4: THREE.Bone
    Buffbone_Water_Large_3: THREE.Bone
    Buffbone_Water_Large_2: THREE.Bone
    Buffbone_Water_Large_1: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    blinn1: THREE.MeshBasicMaterial
    nami_skin02_recallGeo_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nami_skin02_attack1_tail'
  | 'nami_skin02_attack2_tail'
  | 'Channel_Base'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nami_skin02_idle3_tail'
  | 'Joke'
  | 'Dance'
  | 'Death'
  | 'nami_skin02_laugh_tail'
  | 'Taunt_Base'
  | 'Run_Base'
  | 'nami_skin02_spell1_tail'
  | 'nami_skin02_spell2_tail'
  | 'Spell3'
  | 'nami_skin02_idle_leadin2_tail'
  | 'nami_skin02_idle_leadin3_tail'
  | 'nami_skin02_idle4_tail'
  | 'Spell4_Base'
  | 'nami_skin02_idle1_tail'
  | 'nami_skin02_recall'
  | 'nami_skin02_channel_in_tail'
  | 'nami_idle1'
  | 'nami_skin02_idle_leadin4_tail'
  | 'nami_skin02_run_c_tail'
  | 'nami_skin02_spell4_tail'
  | 'nami_skin02_taunt_tail'
  | 'nami_skin02_run_tail'
  | 'nami_skin02_crit_tail'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Water_Small_8} />
        <primitive object={nodes.Buffbone_Water_Small_7} />
        <primitive object={nodes.Buffbone_Water_Small_6} />
        <primitive object={nodes.Buffbone_Water_Small_5} />
        <primitive object={nodes.Buffbone_Water_Small_4} />
        <primitive object={nodes.Buffbone_Water_Small_3} />
        <primitive object={nodes.Buffbone_Water_Small_2} />
        <primitive object={nodes.Buffbone_Water_Small_1} />
        <primitive object={nodes.Buffbone_Water_Meduim_8} />
        <primitive object={nodes.Buffbone_Water_Meduim_7} />
        <primitive object={nodes.Buffbone_Water_Meduim_6} />
        <primitive object={nodes.Buffbone_Water_Meduim_5} />
        <primitive object={nodes.Buffbone_Water_Meduim_4} />
        <primitive object={nodes.Buffbone_Water_Meduim_3} />
        <primitive object={nodes.Buffbone_Water_Meduim_2} />
        <primitive object={nodes.Buffbone_Water_Meduim_1} />
        <primitive object={nodes.Buffbone_Water_Large_4} />
        <primitive object={nodes.Buffbone_Water_Large_3} />
        <primitive object={nodes.Buffbone_Water_Large_2} />
        <primitive object={nodes.Buffbone_Water_Large_1} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.nami_skin02_recallGeo_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
