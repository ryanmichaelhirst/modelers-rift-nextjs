import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Zombie_Shoulder: THREE.Bone
    Root: THREE.Bone
    Zombie_Hand2: THREE.Bone
    Rocket_Launcher_World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Zombie_Hand: THREE.MeshBasicMaterial
    Jinx_Skin03_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death'
  | 'Spell2'
  | 'jinx_skin03_rlauncher_run'
  | 'Channel_Wndup'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack5'
  | 'Attack6'
  | 'Emote_Enter_Minigun'
  | 'Emote_Enter_Rocket'
  | 'Emote_Exit_Minigun'
  | 'Emote_Exit_Rocket'
  | 'Recall'
  | 'jinx_skin03_minigunrattle'
  | 'Recall_Winddown'
  | 'jinx_skin03_minigun_idlehair'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'jinx_minigun_idle3'
  | 'Run_Base'
  | 'Spell3_Run'
  | 'Spell4'
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
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'jinx_rlauncher_run_in'
  | 'Taunt_Base'
  | 'Respawn'
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
  | 'Rlauncher_Death'
  | 'jinx_buffbone_swap'
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
        <primitive object={nodes.Zombie_Shoulder} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Zombie_Hand2} />
        <primitive object={nodes.Rocket_Launcher_World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <group position={[-49.41, -9.72, -110.3]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Zombie_Hand}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Jinx_Skin03_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
