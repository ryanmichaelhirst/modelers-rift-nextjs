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
    BotSplitter_Skn: THREE.Bone
    TopSplitter_Follow_Skn: THREE.Bone
    C_Buffbone_Glb_Select_Loc: THREE.Bone
    R_Buffbone_Glb_Foot_Loc: THREE.Bone
    L_Buffbone_Glb_Foot_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    R_Buffbone_Glb_Hand_Loc: THREE.Bone
    L_Buffbone_Glb_Hand_Loc: THREE.Bone
    C_Buffbone_Glb_Head_Loc: THREE.Bone
    C_Buffbone_Glb_Chest_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Stretch1: THREE.Bone
    Stretch2: THREE.Bone
    Stretch3: THREE.Bone
    Stretch4: THREE.Bone
    Vertical: THREE.Bone
    Edge1: THREE.Bone
    Edge2: THREE.Bone
    Edge3: THREE.Bone
    Edge4: THREE.Bone
    Edge5: THREE.Bone
    Edge6: THREE.Bone
    Edge7: THREE.Bone
    Edge8: THREE.Bone
    Ult_Root: THREE.Bone
  }
  materials: {
    Zac_base_body_mat: THREE.MeshBasicMaterial
    Zac_base_puddle_mat: THREE.MeshBasicMaterial
    Zac_base_ult_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zac_attack1'
  | 'zac_attack2'
  | 'zac_channel_windup'
  | 'Crit'
  | 'Idle2_Base'
  | 'zac_idle3'
  | 'zac_idle4'
  | 'Spell3'
  | 'Idle1_Base'
  | 'Spell3_Flying'
  | 'zac_idle_in1'
  | 'zac_idle_in2'
  | 'zac_attack3'
  | 'zac_attack4'
  | 'zac_idle_in3'
  | 'Channel_Base'
  | 'zac_respawn'
  | 'zac_recall'
  | 'Recall_LeadIn'
  | 'zac_recall_back'
  | 'Recall_Leadout'
  | 'zac_laugh'
  | 'zac_joke'
  | 'Death_Passive'
  | 'Death'
  | 'Dance'
  | 'zac_channel_leadin'
  | 'Channel_WUp_LeadIn'
  | 'zac_laugh2'
  | 'Spell2'
  | 'Pickup'
  | 'Joke_Loop'
  | 'Joke_Windup'
  | 'Run_Fast'
  | 'Run'
  | 'Run_Haste'
  | 'Death_Unite'
  | 'zac_death_unite'
  | 'Spell3_Windup'
  | 'zac_spell4'
  | 'zac_idle_in4'
  | 'Spell1_B1'
  | 'Spell1_B2'
  | 'Spell1_B3'
  | 'Spell1_Max'
  | 'Spell1_Min'
  | 'Spell1_Regrow_Idle'
  | 'Spell1_Regrow_Run'
  | 'Spell1_Slam'
  | 'Spell3_BackRun'
  | 'zac_spell3_back'
  | 'Taunt_Base'
  | 'Spell4'
  | 'zac_revert_spell4_2'
  | 'zac_spell4_3'
  | 'Spell4_Windup'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
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
        <primitive object={nodes.BotSplitter_Skn} />
        <primitive object={nodes.TopSplitter_Follow_Skn} />
        <primitive object={nodes.C_Buffbone_Glb_Select_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Foot_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Hand_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Head_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Chest_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Stretch1} />
        <primitive object={nodes.Stretch2} />
        <primitive object={nodes.Stretch3} />
        <primitive object={nodes.Stretch4} />
        <primitive object={nodes.Vertical} />
        <primitive object={nodes.Edge1} />
        <primitive object={nodes.Edge2} />
        <primitive object={nodes.Edge3} />
        <primitive object={nodes.Edge4} />
        <primitive object={nodes.Edge5} />
        <primitive object={nodes.Edge6} />
        <primitive object={nodes.Edge7} />
        <primitive object={nodes.Edge8} />
        <primitive object={nodes.Ult_Root} />
      </group>
      <group position={[-144.17, -128.03, -122.96]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Zac_base_body_mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Zac_base_puddle_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Zac_base_ult_mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
