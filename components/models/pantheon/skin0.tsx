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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    Shield: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Spear: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Helmet_Snap: THREE.Bone
    Base_Recall_Root: THREE.Bone
    Joke: THREE.Bone
  }
  materials: {
    L_Arm_Only: THREE.MeshBasicMaterial
    Cape: THREE.MeshBasicMaterial
    Comet: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
    Joke: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Laugh'
  | 'Run_Base'
  | 'Run_Passive'
  | 'pantheon_spell1'
  | 'Spell2'
  | 'Spell3_Cast'
  | 'Taunt_In'
  | 'Spell2_Hit'
  | 'Spell2_Hit_ToIdle'
  | 'Spell2_ToIdle'
  | 'Attack3'
  | 'Spell1_Hit'
  | 'Spell1_Hit_Toidle'
  | 'Spell1_Hit_Torun'
  | 'Spell1_Longhit'
  | 'pantheon_spell1_longhit_to_run'
  | 'pantheon_spell3_hit'
  | 'Spell3_hit_toIdle'
  | 'IdleIn'
  | 'Spell4'
  | 'Spell4_Hit'
  | 'Walk'
  | 'Spell4_Leap'
  | 'Spell3_Loop_Move_0'
  | 'pantheon_spell3_loop_move_-180'
  | 'pantheon_spell3_loop_move_-90'
  | 'Spell3_Loop_Move_90'
  | 'Spell3_Loop_Move_180'
  | 'Spell3_Loop_NoMove_0'
  | 'Spell3_Loop_NoMove_90'
  | 'Spell3_Loop_NoMove_-90'
  | 'Spell3_Loop_NoMove_180'
  | 'Spell3_Loop_NoMove_-180'
  | 'Spell1_Nomove'
  | 'Spell1_LongHit_Toidle'
  | 'Spell1_Hit_To_Passiverun'
  | 'Spell1_Hit_To_Walk'
  | 'Spell1_LongHit_To_Passiverun'
  | 'Spell1_LongHit_To_Walk'
  | 'Spell1_NoMove_ToIdle'
  | 'pantheon_spell1_move_towalk'
  | 'pantheon_spell1_move_torun'
  | 'Spell1_Move_To_PassiveRun'
  | 'Spell4_Hit_ToIdle'
  | 'Spell4_Hit_To_Passiverun'
  | 'Attack3_To_PassiveRun'
  | 'Attack1_To_PassiveRun'
  | 'Attack2_To_PassiveRun'
  | 'Turn_0'
  | 'Turn_90'
  | 'Turn_-90'
  | 'pantheon_spell3_hit_towalk'
  | 'Spell3_Hit_-90'
  | 'Spell3_Hit_90'
  | 'Spell3_Hit_-180'
  | 'Spell3_Hit_180'
  | 'Spell3_Hit_-90_ToWalk'
  | 'Spell3_Hit_90_ToWalk'
  | 'Spell3_hit_-180_toWalk'
  | 'Spell3_Hit_180_ToWalk'
  | 'Spell2_Mid'
  | 'Spell2_Short'
  | 'Spell2_Short_ToIdle'
  | 'Recall'
  | 'pantheon_respawn'
  | 'Respawn_Into_Walk'
  | 'Respawn_Into_Run_Base'
  | 'Respawn_Into_Run_Passive'
  | 'Respawn_End'
  | 'Run_Haste'
  | 'Spell2_To_Spell2_Hit'
  | 'pantheon_spell1_fast'
  | 'Joke_Intro'
  | 'Joke_Loop'
  | 'Taunt_loop'
  | 'Dance_Intro'
  | 'Run_Slow'
  | 'IdleIn_To_Idle'
  | 'pantheon_crit'
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
        <primitive object={nodes.Shield} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Spear} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Helmet_Snap} />
        <primitive object={nodes.Base_Recall_Root} />
        <primitive object={nodes.Joke} />
      </group>
      <group position={[-175.62, -78.5, -231.63]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.L_Arm_Only}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Cape} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Comet} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Joke} skeleton={nodes.mesh_0_4.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
