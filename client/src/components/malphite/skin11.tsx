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
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Mecha: THREE.MeshBasicMaterial
    GroundPound_MAT: THREE.MeshBasicMaterial
    Drills_MAT: THREE.MeshBasicMaterial
    PunchFist_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'malphite_attack1'
  | 'malphite_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'malphite_attack3'
  | 'Dance'
  | 'Death'
  | 'malphite_idle1'
  | 'malphite_idle2'
  | 'Laugh'
  | 'Run'
  | 'Spell1_Upper'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Spell3'
  | 'Recall'
  | 'malphite_skin06_fanspin'
  | 'Recall_Winddown'
  | 'Passive'
  | 'malphite_skin06_fistcuffs'
  | 'malphite_skin06_fistcuffs_off'
  | 'malphite_skin06_spell1'
  | 'Crit_Low'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Mecha} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.GroundPound_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Drills_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.PunchFist_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
