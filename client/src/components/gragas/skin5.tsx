import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    blinn1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'gragas_attack1'
  | 'gragas_attack2'
  | 'Channel_Base'
  | 'gragas_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'gragas_idle3'
  | 'gragas_laugh'
  | 'Run'
  | 'gragas_spell1.summonersriftteam_season11_release17'
  | 'gragas_vandals_spell2_loop'
  | 'gragas_vandals_spell2_windup'
  | 'Spell2_Loop'
  | 'gragas_vandals_spell2_winddown'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Idle2_Base'
  | 'gragas_attack_passive'
  | 'Buffbones_Additive'
  | 'gragas_vandals_keghandleidle'
  | 'gragas_vandals_spell2_keghandle'
  | 'gragas_vandals_spell2_keghandle_loop'
  | 'gragas_vandals_spell2_keghandle_winddown'
  | 'gragas_vandals_spell2_keghandle_windup'
  | 'gragas_vandals_idle2_keghandle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
