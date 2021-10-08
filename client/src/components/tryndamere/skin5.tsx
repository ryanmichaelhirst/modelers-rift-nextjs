import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    L_arm_helper: THREE.Bone
    R_Arm_helper: THREE.Bone
    weapon: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    ___Default1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Base'
  | 'tryndamere_channel_windup'
  | 'Crit'
  | 'Dance_Base'
  | 'Death_Base'
  | 'tryndamere_sultan_idle1'
  | 'tryndamere_idle3'
  | 'tryndamere_idle4'
  | 'tryndamere_laugh'
  | 'tryndamere_run_rage'
  | 'Spell1'
  | 'tryndamere_spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'tryndamere_joke'
  | 'tryndamere_sultan_run_pop'
  | 'tryndamere_sultan_run_rage'
  | 'Buffbones'
  | 'tryndamere_sultan_attack1'
  | 'tryndamere_sultan_attack2'
  | 'tryndamere_sultan_channel'
  | 'tryndamere_sultan_channel_windup'
  | 'tryndamere_sultan_crit'
  | 'tryndamere_sultan_idle3'
  | 'tryndamere_sultan_idle4'
  | 'tryndamere_sultan_death'
  | 'tryndamere_sultan_spell2'
  | 'tryndamere_sultan_joke'
  | 'tryndamere_sultan_laugh'
  | 'tryndamere_sultan_taunt'
  | 'tryndamere_sultan_idle1_windup'
  | 'Run_Windup'
  | 'Run_Base'
  | 'Idle1_Hair'
  | 'tryndamere_sultan_dance'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_arm_helper} />
        <primitive object={nodes.R_Arm_helper} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.___Default1}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
