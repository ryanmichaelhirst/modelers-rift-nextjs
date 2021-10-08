import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    Root: THREE.Bone
    Sword: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    RecallChain1: THREE.Bone
    RecallChain2: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    wings_bot: THREE.MeshBasicMaterial
    level11: THREE.MeshBasicMaterial
    level1: THREE.MeshBasicMaterial
    wings_up: THREE.MeshBasicMaterial
    wings_up_glow: THREE.MeshBasicMaterial
    wings_mid: THREE.MeshBasicMaterial
    wings_mid_glow: THREE.MeshBasicMaterial
    sword_hilt: THREE.MeshBasicMaterial
    sword_blade: THREE.MeshBasicMaterial
    sword_hilt_combined: THREE.MeshBasicMaterial
    sword_blade_combined: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'kayle_attack1'
  | 'kayle_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Run1'
  | 'Spell2_0'
  | 'Spell3_R'
  | 'Spell4'
  | 'kayle_attack3'
  | 'kayle_attack4'
  | 'Evolve1'
  | 'Evolve2'
  | 'Evolve3'
  | 'Run_In'
  | 'Idle_In'
  | 'Recall'
  | 'kayle_attackpassive'
  | 'IdlePassive'
  | 'kayle_runpassive'
  | 'kayle_attackranged2'
  | 'kayle_attackranged1'
  | 'kayle_runpassivetransition'
  | 'kayle_idlepassivetransition'
  | 'Attack1Fast'
  | 'Attack2Fast'
  | 'Attack3Fast'
  | 'Attack4Fast'
  | 'AttackPassiveFast'
  | 'kayle_attackrangedfast2'
  | 'kayle_attackrangedfast1'
  | 'kayle_spell1trans_idle'
  | 'Spell3Trans'
  | 'Spell3melee'
  | 'Spell3_L'
  | 'kayle_spell3runtransitionleft'
  | 'kayle_spell2_transidle'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Run2'
  | 'Idle2_Base'
  | 'Turn_L'
  | 'Turn_L180'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_R180'
  | 'Spell1_0'
  | 'Spell1_-90'
  | 'Spell1_90'
  | 'Spell4Trans'
  | 'Evolve1_ToIdle'
  | 'Evolve1_ToRun'
  | 'Evolve2_ToIdle'
  | 'Evolve2_ToRun'
  | 'Evolve3_ToIdle'
  | 'Evolve3_ToRun'
  | 'Evolve4'
  | 'kayle_spell3enraged'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Homeguard'
  | 'kayle_homeguard'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_OUT'
  | 'kayle_homeguard_in'
  | 'kayle_homeguard_torun'
  | 'kayle_run_to_homeguard'
  | 'kayle_idleinpassive'
  | 'kayle_runinpassive'
  | 'kayle_spell2'
  | 'kayle_spell2_180'
  | 'kayle_spell2_-180'
  | 'kayle_spell2_90'
  | 'kayle_spell2_-90'
  | 'kayle_spell1_90'
  | 'kayle_spell1'
  | 'kayle_spell1_-90'
  | 'kayle_spell3runtransition'
  | 'Laugh_In'
  | 'Laugh_Out'
  | 'Taunt'
  | 'Taunt_Out'
  | 'kayle_joke'
  | 'Joke_Asleep'
  | 'Joke_Cycle'
  | 'Joke_FallingAsleep'
  | 'Joke_KindaAsleep'
  | 'kayle_spell_toidle'
  | 'Spell4TransEnraged'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Spell4Trans_ToIdleEnraged'
  | 'Idle_to_Passive'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Sword} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.RecallChain1} />
        <primitive object={nodes.RecallChain2} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.wings_bot}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.level11} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.level1} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.wings_up}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.wings_up_glow}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.wings_mid}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.wings_mid_glow}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.sword_hilt}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.sword_blade}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.sword_hilt_combined}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.sword_blade_combined}
        skeleton={nodes.mesh_0_11.skeleton}
      />
    </group>
  )
}
