import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Shadow_Root_Ground: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Shadow_Arm5_Snap: THREE.Bone
    R_Shadow_Arm5_Snap: THREE.Bone
    VFXUlt_L_Hand1: THREE.Bone
    VFXUlt_Jaw: THREE.Bone
    VFXUlt_Head: THREE.Bone
    VFXUlt_R_Hand1: THREE.Bone
    VFXUlt_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Shadow: THREE.MeshBasicMaterial
    EyeDefault: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1_Start'
  | 'Idle_Loop'
  | 'Run_Base'
  | 'spell1.s_yordle'
  | 'spell2.s_yordle'
  | 'Spell3_0'
  | 'spell4_cast.s_yordle'
  | 'Death'
  | 'Attack2_Start'
  | 'homeguard.s_yordle'
  | 'run_start.s_yordle'
  | 'Idle_In'
  | 'Dance_Base'
  | 'Idle_Hold'
  | 'spell2_moving.s_yordle'
  | 'Spell1_Into_Run'
  | 'spell4_dash.s_yordle'
  | 'spell4_attack.s_yordle'
  | 'Crit_Start'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'run_haste.s_yordle'
  | 'Spell3_Into_IDLE'
  | 'Spawn'
  | 'Spell1_Into_Idle'
  | 'spell3_into_run.s_yordle'
  | 'Recall'
  | 'homeguard_start.s_yordle'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Stunned'
  | 'KnockUp_Loop'
  | 'Attack1_Into_Idle'
  | 'Attack2_Into_Idle'
  | 'Crit_INTO_Idle'
  | 'attack_1_hit.s_yordle'
  | 'attack_2_hit.s_yordle'
  | 'crit_hit.s_yordle'
  | 'Joke'
  | 'knockup_start.s_yordle'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell2_Into_Idle'
  | 'spell4_attack_into_idle.s_yordle'
  | 'attack_1_into_run.s_yordle'
  | 'attack_2_into_run.s_yordle'
  | 'spell4_dash_start.s_yordle'
  | 'spell4_cast_into_idle.s_yordle'
  | 'spell4_cast_into_run.s_yordle'
  | 'Spell1_Run'
  | 'spell3_left.s_yordle'
  | 'spell3_left180.s_yordle'
  | 'spell3_right.s_yordle'
  | 'spell3_right180.s_yordle'
  | 'spell4_cast_left.s_yordle'
  | 'spell4_cast_right.s_yordle'
  | 'spell4_cast_right180.s_yordle'
  | 'spell4_cast_left180.s_yordle'
  | 'attack_passive.s_yordle'
  | 'attack_passive_hit.s_yordle'
  | 'attack_passive_into_idle.s_yordle'
  | 'attack_passive_into_run.s_yordle'
  | 'Spell2_Into_Run'
  | 'homeguardslopeup.s_yordle'
  | 'homeguardslopedown.s_yordle'
  | 'Laugh'
  | 'attack_passive_near.s_yordle'
  | 'attack_passive_extrafar.s_yordle'
  | 'spell4_attack_into_run.s_yordle'
  | 'crit_into_run.s_yordle'
  | 'idle_variation.s_yordle'
  | 'idle_in_into_run.s_yordle'
  | 'run_haste_start.s_yordle'
  | 'Taunt_Start'
  | 'Taunt_loop'
  | 'Run_Slow'
  | 'idle_variation2.s_yordle'
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
        <primitive object={nodes.Shadow_Root_Ground} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Shadow_Arm5_Snap} />
        <primitive object={nodes.R_Shadow_Arm5_Snap} />
        <primitive object={nodes.VFXUlt_L_Hand1} />
        <primitive object={nodes.VFXUlt_Jaw} />
        <primitive object={nodes.VFXUlt_Head} />
        <primitive object={nodes.VFXUlt_R_Hand1} />
        <primitive object={nodes.VFXUlt_Root} />
      </group>
      <group position={[-172.37, -11.2, -157.3]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Shadow}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
