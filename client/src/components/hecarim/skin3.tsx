import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root_b: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    default11: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'hecarim_attack1'
  | 'hecarim_attack2'
  | 'Crit_Base'
  | 'Channel_Base'
  | 'hecarim_channel_windup'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'hecarim_idle3'
  | 'hecarim_idle4'
  | 'hecarim_laugh'
  | 'hecarim_joke'
  | 'Run_Base'
  | 'hecarim_run2'
  | 'hecarim_run3'
  | 'hecarim_spell2'
  | 'Spell4_Base'
  | 'Taunt_Base'
  | 'Spell3_Base'
  | 'hecarim_spell4windup'
  | 'hecarim_spell1'
  | 'hecarim_spell4b'
  | 'hecarim_spell3run'
  | 'hecarim_headless_idle1'
  | 'hecarim_headless_run2'
  | 'hecarim_headless_channel'
  | 'hecarim_headless_attack1'
  | 'hecarim_headless_attack2'
  | 'hecarim_headless_crit'
  | 'hecarim_headless_dance'
  | 'hecarim_headless_death'
  | 'hecarim_headless_idle2'
  | 'hecarim_headless_joke'
  | 'hecarim_headless_run3'
  | 'hecarim_headless_spell1'
  | 'hecarim_headless_idle4'
  | 'hecarim_headless_spell2'
  | 'hecarim_headless_spell3'
  | 'hecarim_headless_spell4b'
  | 'hecarim_headless_spell4windup'
  | 'hecarim_headless_laugh'
  | 'hecarim_headless_taunt'
  | 'Buffbones'
  | 'hecarim_headless_spell4'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
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
        <primitive object={nodes.root_b} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.default11}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
