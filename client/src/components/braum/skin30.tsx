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
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Origin: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
    Poro: THREE.Bone
    Poro4: THREE.Bone
    BraumSkin24_donus: THREE.Bone
    BraumSkin24_donus1: THREE.Bone
  }
  materials: {
    Braum_Skin24_Mat: THREE.MeshBasicMaterial
    Braum_Skin24_Poro_Mat: THREE.MeshBasicMaterial
    Braum_Skin24_PoroRecall_Mat: THREE.MeshBasicMaterial
    BraumSkin24_donus_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Attack3'
  | 'Crit'
  | 'Taunt'
  | 'Run'
  | 'Attack1'
  | 'braum_passive_attack_01'
  | 'braum_spell3_punch0-45'
  | 'braum_spell3_punch045'
  | 'braum_idle_in'
  | 'Spell3_Idle0'
  | 'Spell3_Idle-180'
  | 'Spell3_Idle90'
  | 'Spell3_Idle-90'
  | 'Spell3_Run0'
  | 'Spell3_Run179'
  | 'Spell3_Run-179'
  | 'Spell3_Run90'
  | 'Spell3_Run-90'
  | 'Spell2'
  | 'Spell3_Idle180'
  | 'braum_critical_attack_01'
  | 'Spell3_Punch135'
  | 'Spell3_Punch-135'
  | 'Spell3_Punch179'
  | 'Spell3_Punch-179'
  | 'Spell3_Punch45'
  | 'Spell3_Punch-45'
  | 'Spell3_Punch0'
  | 'Spell1'
  | 'Spell4'
  | 'Dance_Windup'
  | 'Dance_Loop'
  | 'Passive_Attack_01'
  | 'Recall'
  | 'Death'
  | 'Laugh'
  | 'Attack_Turret'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Idle_01_In'
  | 'Idle_01_Loop'
  | 'Recall_Winddown'
  | 'braum_channel_in'
  | 'braum_channel_loop'
  | 'Spell3_Punch045'
  | 'Spell3_Punch0-45'
  | 'Spell3_Leapright'
  | 'Spell3_Leapleft'
  | 'Spell3_Leapforward'
  | 'Spell3_Leapback'
  | 'Spell3_Leapback2'
  | 'Channel_Wndup'
  | 'Spell3_Punch0-179'
  | 'Spell3_Punch0179'
  | 'Joke2_Into'
  | 'Joke2_Loop'
  | 'Spell3_Punchleft-179'
  | 'Spell3_Punchleft-45'
  | 'Spell3_Punchright179'
  | 'Spell3_Punchright45'
  | 'Run_Slow'
  | 'Run_Haste'
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
        <primitive object={nodes.Origin} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Healthbar} />
        <primitive object={nodes.Poro} />
        <primitive object={nodes.Poro4} />
        <primitive object={nodes.BraumSkin24_donus} />
        <primitive object={nodes.BraumSkin24_donus1} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Braum_Skin24_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Braum_Skin24_Poro_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Braum_Skin24_PoroRecall_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.BraumSkin24_donus_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
    </group>
  )
}
