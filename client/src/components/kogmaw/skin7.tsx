import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    kogmaw_fossil_MD_blinn3: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'kogmaw_attack1'
  | 'kogmaw_attack2'
  | 'Channel_Base'
  | 'kogmaw_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'kogmaw_idle3'
  | 'kogmaw_idle4'
  | 'kogmaw_joke'
  | 'kogmaw_laugh'
  | 'Run_Base'
  | 'RunDead'
  | 'kogmaw_spell1'
  | 'kogmaw_spell2'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Eyes'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.C_Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.kogmaw_fossil_MD_blinn3}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
