import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Bottle_Cap_Bot: THREE.Bone
    Bottle_Cap_Top: THREE.Bone
    Bottle_Cork: THREE.Bone
    Bottle: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Gramophone: THREE.Bone
    Gramophone_Arm: THREE.Bone
    Gramophone_Horn: THREE.Bone
    Gramophone_Reproducer: THREE.Bone
    Gramophone_Turntable: THREE.Bone
    Rocket_Launcher_World: THREE.Bone
  }
  materials: {
    Jinx_Skin01_Bottle_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'jinx_skin01_rlauncher_idle1'
  | 'Dance_Base'
  | 'Emote_Enter_Rocket'
  | 'Skin01_Minigun_Idle1'
  | 'Skin01_Rlauncher_Idle1'
  | 'Dance_In'
  | 'Recall'
  | 'Skin01_Emote_Enter_Rocket'
  | 'Death'
  | 'Idle2_Base'
  | 'jinx_skin01_minigun_idle3'
  | 'Run_Base'
  | 'Spell2'
  | 'jinx_skin01_rlauncher_run'
  | 'Spell3_Run'
  | 'Spell4'
  | 'Channel_Wndup'
  | 'Attack1'
  | 'Attack2'
  | 'jinx_skin01_rlauncher_idle2'
  | 'jinx_skin01_rlauncher_idle3'
  | 'jinx_skin01_rlauncher_run2'
  | 'jinx_skin01_rlauncher_attack1'
  | 'jinx_skin01_rlauncher_attack2'
  | 'jinx_skin01_minigun_death'
  | 'jinx_skin01_minigun_run_in'
  | 'IdleIn1'
  | 'Rlauncher_Idlein1'
  | 'jinx_skin01_rlauncher_spell4'
  | 'jinx_skin01_rlauncher_spell2'
  | 'Rlauncher_Spell3'
  | 'jinx_skin01_rlauncher_spell3'
  | 'jinx_skin01_minigun_spell1_weapon'
  | 'jinx_skin01_minigun_spell1_weapon2'
  | 'jinx_skin01_launcher_spell1_weapon'
  | 'jinx_skin01_launcher_spell1_weapon2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack5'
  | 'Attack6'
  | 'jinx_skin01_rlauncher_run_in'
  | 'Emote_Enter_Minigun'
  | 'Emote_Exit_Minigun'
  | 'Emote_Exit_Rocket'
  | 'Respawn'
  | 'Idlein2'
  | 'Run_Fast'
  | 'jinx_skin01_joke'
  | 'Laugh_In'
  | 'Laugh_Loop'
  | 'Channel'
  | 'jinx_skin01_taunt2'
  | 'Spell3'
  | 'Skin01_Launcher_Spell1_Weapon'
  | 'Skin01_Launcher_Spell1_Weapon2'
  | 'Skin01_Minigun_Death'
  | 'Skin01_Minigun_Idle2'
  | 'Skin01_Minigun_Idle3'
  | 'Skin01_Minigun_IdleIn1'
  | 'Skin01_Minigun_Spell1_Weapon'
  | 'Skin01_Minigun_Spell1_Weapon2'
  | 'Skin01_Minigun_Spell2'
  | 'Skin01_Minigun_Spell3'
  | 'Skin01_Rlauncher_Idle2'
  | 'Skin01_Rlauncher_Idle3'
  | 'Skin01_Rlauncher_IdleIn1'
  | 'Skin01_Minigun_Run'
  | 'Skin01_Minigun_Run2'
  | 'Skin01_Minigun_Run_In'
  | 'Skin01_Minigun_Attack1'
  | 'Skin01_Minigun_Attack2'
  | 'Skin01_Minigun_Attack3'
  | 'Skin01_Minigun_Attack4'
  | 'Skin01_Minigun_Attack5'
  | 'Skin01_Minigun_Attack6'
  | 'Skin01_Rlauncher_Attack2'
  | 'Skin01_Rlauncher_Spell2'
  | 'Skin01_Rlauncher_Spell3'
  | 'Skin01_Rlauncher_Spell4'
  | 'Skin01_Minigun_Spell4'
  | 'Skin01_Rlauncher_Run'
  | 'Skin01_Rlauncher_Run2'
  | 'Skin01_Channel_Windup'
  | 'Skin01_Channel'
  | 'Skin01_Rlauncher_Run_In'
  | 'Skin01_Rlauncher_Attack1'
  | 'Run_Haste'
  | 'jinx_skin01_rlauncher_runhaste'
  | 'Taunt_Base'
  | 'Skin01_Emote_Enter_Minigun'
  | 'Skin01_Emote_Exit_Minigun'
  | 'Skin01_Emote_Exit_Rocket'
  | 'Skin01_Taunt2'
  | 'Skin01_Laugh_In'
  | 'Skin01_Laugh_Loop'
  | 'Skin01_Laugh_Breath'
  | 'Laugh_Breath'
  | 'Skin01_Minigun_IdleIn2'
  | 'Skin01_Joke'
  | 'Skin01_Respawn'
  | 'jinx_skin01_buffbone_swap'
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
        <primitive object={nodes.Bottle_Cap_Bot} />
        <primitive object={nodes.Bottle_Cap_Top} />
        <primitive object={nodes.Bottle_Cork} />
        <primitive object={nodes.Bottle} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Gramophone} />
        <primitive object={nodes.Gramophone_Arm} />
        <primitive object={nodes.Gramophone_Horn} />
        <primitive object={nodes.Gramophone_Reproducer} />
        <primitive object={nodes.Gramophone_Turntable} />
        <primitive object={nodes.Rocket_Launcher_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Jinx_Skin01_Bottle_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-49.91, -0.31, -102.17]}
        scale={0.01}
      />
    </group>
  )
}
