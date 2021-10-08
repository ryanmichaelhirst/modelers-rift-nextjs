import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    WEAPON: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC1: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC1: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    riven_battlebunny_MD_blinn2SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'riven_attack1'
  | 'riven_attack1_ult'
  | 'riven_attack2'
  | 'riven_attack2_ult'
  | 'riven_attack3'
  | 'Channel_Base'
  | 'riven_channel_windup'
  | 'Crit_Base'
  | 'riven_crit'
  | 'Dance_Base'
  | 'Death'
  | 'Idle1_Base'
  | 'riven_idle1_ult'
  | 'Idle2_Base'
  | 'riven_idle3'
  | 'riven_idle1'
  | 'riven_laugh'
  | 'Run_Base'
  | 'riven_run_ult'
  | 'riven_spell1a'
  | 'riven_spell1b'
  | 'riven_spell1c'
  | 'riven_spell2'
  | 'Spell3_Base'
  | 'riven_spell3'
  | 'riven_spell4a'
  | 'riven_spell4b'
  | 'Taunt_Base'
  | 'riven_joke'
  | 'riven_battlebunny_idle1'
  | 'riven_battlebunny_run'
  | 'riven_battlebunny_idle2'
  | 'riven_battlebunny_idle3'
  | 'riven_battlebunny_attack1'
  | 'riven_battlebunny_channel'
  | 'riven_battlebunny_dance'
  | 'riven_battlebunny_death'
  | 'riven_battlebunny_laugh'
  | 'riven_battlebunny_spell1a'
  | 'riven_battlebunny_spell1b'
  | 'riven_battlebunny_spell1c'
  | 'riven_battlebunny_spell2'
  | 'riven_battlebunny_spell3'
  | 'riven_battlebunny_taunt'
  | 'riven_battlebunny_joke'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.WEAPON} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC1} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC1} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.riven_battlebunny_MD_blinn2SG1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
