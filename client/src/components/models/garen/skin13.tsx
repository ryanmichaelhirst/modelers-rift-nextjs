import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Throne: THREE.Bone
    Lion_Root: THREE.Bone
  }
  materials: {
    Garen_Sword_MAT: THREE.MeshBasicMaterial
    Throne_mat: THREE.MeshBasicMaterial
    Garen_Skin13_lion_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'garen_skin13_channel_loop'
  | 'Crit'
  | 'Dance_Base'
  | 'Death'
  | 'garen_skin13_idle_in'
  | 'Idle1_Base'
  | 'garen_skin13_joke_in'
  | 'garen_skin13_joke_loop'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell4'
  | 'Taunt'
  | 'garen_skin13_dance_loop'
  | 'Recall'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Run_Spell1'
  | 'Run_Fast'
  | 'garen_skin13_taunt'
  | 'Spell1_Idle'
  | 'Spell1_IdleIn'
  | 'Idle_Stand'
  | 'Idle_StandIn'
  | 'Spell3_To_Idle'
  | 'Spell3_To_Run'
  | 'RunIn'
  | 'TurnL'
  | 'TurnR'
  | 'Turn0'
  | 'garen_skin13_spell1_run_trans'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard'
  | 'garen_skin13_spell3_fast'
  | 'garen_skin13_spell3_med'
  | 'garen_skin13_channel_in'
  | 'Spell1_ToIdle'
  | 'IdleVariant1'
  | 'Spell4_ToIdle'
  | 'garen_skin13_lion_idle_standoff'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Throne} />
        <primitive object={nodes.Lion_Root} />
      </group>
      <group position={[-140.43, -2.29, -245.08]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Garen_Sword_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Throne_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Garen_Skin13_lion_mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
