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
    slide: THREE.Bone
    Poro1: THREE.Bone
    Poro2: THREE.Bone
    Poro3: THREE.Bone
    Rope_Root: THREE.Bone
    Rope3: THREE.Bone
    Rope5: THREE.Bone
    L_Bell1: THREE.Bone
    R_Bell1: THREE.Bone
    R_Bell2: THREE.Bone
    L_Bell2: THREE.Bone
    L_Bell3: THREE.Bone
    R_Bell3: THREE.Bone
    Root: THREE.Bone
    Origin: THREE.Bone
    Poro: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Recall: THREE.MeshBasicMaterial
    Recall_poro: THREE.MeshBasicMaterial
    lambert1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Recall'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Taunt'
  | 'braum_channel_in'
  | 'braum_channel_loop'
  | 'Channel_Wndup'
  | 'Death'
  | 'braum_skin04_idle_in'
  | 'Joke2_Into'
  | 'Joke2_Loop'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'braum_passive_attack_01'
  | 'Attack_Turret'
  | 'Crit'
  | 'braum_idle_01_loop'
  | 'Recall_Winddown'
  | 'Run'
  | 'Run_Homeguard_OUT'
  | 'braum_critical_attack_01'
  | 'Idle_01_In'
  | 'Idle_01_Loop'
  | 'Laugh'
  | 'Passive_Attack_01'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Spell1'
  | 'Spell2'
  | 'braum_spell3_punch045'
  | 'braum_spell3_punch0-45'
  | 'Spell3_Idle-180'
  | 'Spell3_Idle-90'
  | 'Spell3_Idle0'
  | 'Spell3_Idle180'
  | 'Spell3_Idle90'
  | 'Spell3_Leapback'
  | 'Spell3_Leapback2'
  | 'Spell3_Leapforward'
  | 'Spell3_Leapleft'
  | 'Spell3_Leapright'
  | 'Spell3_Punch-135'
  | 'Spell3_Punch-179'
  | 'Spell3_Punch-45'
  | 'Spell3_Punch0'
  | 'Spell3_Punch0-179'
  | 'Spell3_Punch0-45'
  | 'Spell3_Punch0179'
  | 'Spell3_Punch045'
  | 'Spell3_Punch135'
  | 'Spell3_Punch179'
  | 'Spell3_Punch45'
  | 'Spell3_Punchleft-179'
  | 'Spell3_Punchleft-45'
  | 'Spell3_Punchright179'
  | 'Spell3_Punchright45'
  | 'Spell3_Run-179'
  | 'Spell3_Run-90'
  | 'Spell3_Run0'
  | 'Spell3_Run179'
  | 'Spell3_Run90'
  | 'Spell4'
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
        <primitive object={nodes.slide} />
        <primitive object={nodes.Poro1} />
        <primitive object={nodes.Poro2} />
        <primitive object={nodes.Poro3} />
        <primitive object={nodes.Rope_Root} />
        <primitive object={nodes.Rope3} />
        <primitive object={nodes.Rope5} />
        <primitive object={nodes.L_Bell1} />
        <primitive object={nodes.R_Bell1} />
        <primitive object={nodes.R_Bell2} />
        <primitive object={nodes.L_Bell2} />
        <primitive object={nodes.L_Bell3} />
        <primitive object={nodes.R_Bell3} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Origin} />
        <primitive object={nodes.Poro} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-87.11, -0.64, -50.97]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_poro}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.lambert1}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
