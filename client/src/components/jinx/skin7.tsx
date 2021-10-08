import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Rocket_Launcher_World: THREE.Bone
    Gramophone_Horn: THREE.Bone
    Gramophone_Arm: THREE.Bone
    Gramophone_Reproducer: THREE.Bone
    Gramophone_Turntable: THREE.Bone
    Gramophone: THREE.Bone
    Bottle: THREE.Bone
    Bottle_Cork: THREE.Bone
    Bottle_Cap_Top: THREE.Bone
    Bottle_Cap_Bot: THREE.Bone
  }
  materials: {
    lambert4: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'jinx_minigun_idle3'
  | 'Run_Base'
  | 'Spell2'
  | 'jinx_rlauncher_run'
  | 'Spell3_Run'
  | 'Spell4'
  | 'Channel_Wndup'
  | 'Attack1'
  | 'Attack2'
  | 'jinx_rlauncher_idle1'
  | 'jinx_rlauncher_idle2'
  | 'jinx_rlauncher_idle3'
  | 'jinx_rlauncher_run2'
  | 'jinx_rlauncher_attack1'
  | 'jinx_rlauncher_attack2'
  | 'jinx_rlauncher_death'
  | 'jinx_minigun_run_in'
  | 'IdleIn1'
  | 'Rlauncher_Idlein1'
  | 'jinx_rlauncher_spell4'
  | 'jinx_rlauncher_spell2'
  | 'Rlauncher_Spell3'
  | 'jinx_rlauncher_spell3'
  | 'minigun_spell1_weapon_gunonly'
  | 'minigun_spell1_weapon2'
  | 'launcher_spell1_weapon'
  | 'launcher_spell1_weapon2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack5'
  | 'Attack6'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'jinx_rlauncher_run_in'
  | 'jinx_skin02_recall'
  | 'Emote_Enter_Minigun'
  | 'Emote_Enter_Rocket'
  | 'Emote_Exit_Minigun'
  | 'Emote_Exit_Rocket'
  | 'Taunt_Base'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Idlein2'
  | 'Run_Fast'
  | 'jinx_joke3'
  | 'Laugh_In'
  | 'Laugh_Loop'
  | 'Channel'
  | 'jinx_taunt2'
  | 'Spell3'
  | 'Stunned'
  | 'Laugh_Breath'
  | 'Run_Haste'
  | 'jinx_rlauncher_runhaste'
  | 'jinx_rlauncher_drecall'
  | 'jinx_rlauncher_drecall_in'
  | 'jinx_rlauncher_drecall_out'
  | 'Rlauncher_Death'
  | 'jinx_buffbone_swap'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
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
        <primitive object={nodes.Rocket_Launcher_World} />
        <primitive object={nodes.Gramophone_Horn} />
        <primitive object={nodes.Gramophone_Arm} />
        <primitive object={nodes.Gramophone_Reproducer} />
        <primitive object={nodes.Gramophone_Turntable} />
        <primitive object={nodes.Gramophone} />
        <primitive object={nodes.Bottle} />
        <primitive object={nodes.Bottle_Cork} />
        <primitive object={nodes.Bottle_Cap_Top} />
        <primitive object={nodes.Bottle_Cap_Bot} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert4} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
