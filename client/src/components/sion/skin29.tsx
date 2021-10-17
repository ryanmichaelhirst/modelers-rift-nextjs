import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Stone1: THREE.Bone
    Stone2: THREE.Bone
    Stone3: THREE.Bone
    Stone4: THREE.Bone
    Stone5: THREE.Bone
    Stone6: THREE.Bone
    Stone7: THREE.Bone
    Stone8: THREE.Bone
    Stone9: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Stone: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'Death'
  | 'Joke'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Attack2'
  | 'sion_spell4_run'
  | 'Run'
  | 'Attack1'
  | 'Idle1_Base'
  | 'Spell1_Chrg'
  | 'Passive_Attack1'
  | 'Passive_Attack2'
  | 'Passive_Idle1'
  | 'sion_passive_run'
  | 'Spell1_Hit1'
  | 'Spell1_Hit2'
  | 'Idle_In'
  | 'Attack3'
  | 'Run_Fast'
  | 'Attack_Tower'
  | 'Run_Haste'
  | 'Passive_Death'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Stunned'
  | 'sion_passive_run_in'
  | 'Laugh'
  | 'sion_knockedup'
  | 'Passive_Dash'
  | 'Recall'
  | 'Spell4'
  | 'Spell4_Hit'
  | 'Attack_Tower2'
  | 'Spell2_B'
  | 'Spell4_RunIn'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Idle2_Base'
  | 'Dance_Spin'
  | 'Spell4_Stop'
  | 'Run_Slow'
  | 'KnockedUp_In'
  | 'Passive_Dance_IN'
  | 'sion_dance_spin'
  | 'Passive_Dance_LOOP'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Stone1} />
        <primitive object={nodes.Stone2} />
        <primitive object={nodes.Stone3} />
        <primitive object={nodes.Stone4} />
        <primitive object={nodes.Stone5} />
        <primitive object={nodes.Stone6} />
        <primitive object={nodes.Stone7} />
        <primitive object={nodes.Stone8} />
        <primitive object={nodes.Stone9} />
      </group>
      <group position={[-132.21, -13.79, -78.05]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Stone}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
