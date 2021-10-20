import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_CSTM_ZERO: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    Jarvan_Lubu_m: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'jarvaniv_attack1'
  | 'jarvaniv_attack2_60fps'
  | 'jarvaniv_attack3_60fps'
  | 'Channel_Base'
  | 'jarvaniv_channel_windup'
  | 'Crit_Base'
  | 'Dance_Base'
  | 'Death_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'jarvaniv_idle3'
  | 'jarvaniv_idle4'
  | 'jarvaniv_joke'
  | 'jarvaniv_laugh'
  | 'jarvaniv_passive'
  | 'jarvaniv_spell1_dash'
  | 'jarvaniv_spell1'
  | 'Spell2'
  | 'Spell3_Base'
  | 'Spell4_Base'
  | 'jarvaniv_spell4_60fps'
  | 'Taunt_Base'
  | 'jarvaniv_lubu_idle1'
  | 'jarvaniv_lubu_run'
  | 'jarvaniv_lubu_channel_windup'
  | 'jarvaniv_lubu_channel'
  | 'jarvaniv_lubu_idle2'
  | 'jarvaniv_lubu_idle3'
  | 'jarvaniv_lubu_laugh'
  | 'jarvaniv_lubu_idle4'
  | 'jarvaniv_lubu_attack1'
  | 'jarvaniv_lubu_attack2'
  | 'jarvaniv_lubu_attack3'
  | 'jarvaniv_lubu_joke'
  | 'jarvaniv_lubu_taunt'
  | 'Buffbones'
  | 'jarvaniv_lubu_dance'
  | 'jarvaniv_lubu_spell3'
  | 'jarvaniv_lubu_spell4'
  | 'jarvaniv_lubu_spell1_dash'
  | 'jarvaniv_lubu_spell1'
  | 'jarvaniv_lubu_crit'
  | 'jarvaniv_lubu_passive'
  | 'Run2'
  | 'Run'
  | 'jarvaniv_lubu_death'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_ZERO} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jarvan_Lubu_m}
        skeleton={nodes.mesh_0.skeleton}
        position={[-71.91, -0.31, -63.4]}
        scale={0.02}
      />
    </group>
  )
}
