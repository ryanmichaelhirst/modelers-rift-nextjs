import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
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
    sword_hilt: THREE.MeshBasicMaterial
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

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
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
      <group position={[-119.5, -23.59, -82.34]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.wings_bot}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.sword_hilt}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
