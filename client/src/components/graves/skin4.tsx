import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    default4: THREE.MeshBasicMaterial
    Visor_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'graves_mafia_attack1'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2'
  | 'Joke'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Run'
  | 'graves_riot_clip_idle1'
  | 'graves_riot_idle3'
  | 'Riot_Clip_Idle3'
  | 'graves_mafia_reload_slow'
  | 'graves_mafia_reload'
  | 'Spell4_Back'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.default4} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Visor_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
