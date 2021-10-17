import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    root: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Suitcase: THREE.Bone
  }
  materials: {
    lambert8: THREE.MeshBasicMaterial
    Suitcase: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'xinzhao_run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Spell6'
  | 'Taunt'
  | 'Recall'
  | 'weapon'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Attack3'
  | 'Attack3_To_Idle'
  | 'IdleHaste_To_runHaste'
  | 'Idle_In'
  | 'Idle_In_Haste'
  | 'Idle_To_runHaste'
  | 'runHaste_to_Run'
  | 'Run_02'
  | 'Run_Haste'
  | 'Run_To_RunHaste'
  | 'Spell1_Attack1'
  | 'Spell1_Attack1_To_Idle'
  | 'xinzhao_spell1_attack2_to_run'
  | 'Spell1_Attack2'
  | 'Spell1_Attack2_To_Idle'
  | 'xinzhao_spell1_attack1_to_run'
  | 'Spell1_Attack3'
  | 'Spell1_Attack3_To_Run'
  | 'xinzhao_spell2_stabandslash'
  | 'xinzhao_spell2_stabandslash_to_idle'
  | 'Spell2_SlashStab_To_Run'
  | 'Spell3_DashToAlly'
  | 'Spell6_To_Idle'
  | 'Spell6_To_Run'
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
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Suitcase} />
      </group>
      <group position={[-63.54, -37.8, -150.56]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert8}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Suitcase}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
