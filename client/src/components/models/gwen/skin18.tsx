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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    Needle: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    SnapJoint1: THREE.Bone
    SnapJoint2: THREE.Bone
    Scissors_A: THREE.Bone
    True_World: THREE.Bone
    Doll_Root: THREE.Bone
    Bloob_Cake_Root: THREE.Bone
    Bloob_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Doll: THREE.MeshBasicMaterial
    Needle: THREE.MeshBasicMaterial
    Scissors_A_Smear: THREE.MeshBasicMaterial
    Recall_Cake: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'idle.gwen'
  | 'run.gwen'
  | 'gwen_homeguard.gwen'
  | 'Attack2'
  | 'Laugh'
  | 'Dance'
  | 'Taunt'
  | 'Joke_Start'
  | 'Spell1_0'
  | 'Spell2'
  | 'Spell4_0'
  | 'passive_attack1.gwen'
  | 'Crit'
  | 'Spell3_Dash'
  | 'Death'
  | 'passive_run.gwen'
  | 'gwen_homeguard_passive.gwen'
  | 'Into_Run'
  | 'spell3_to_run.gwen'
  | 'Spell3_Into_IDLE'
  | 'IdleIn'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'Spell1_180'
  | 'Spell1_-180'
  | 'idle2.gwen'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Passive_Idle'
  | 'Spell4_-90'
  | 'Spell4_90'
  | 'Spell4_180'
  | 'Spell4_To_Idle'
  | 'passive_idlein.gwen'
  | 'Attack3'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Attack3_To_Idle'
  | 'into_run_90.gwen'
  | 'into_run_180.gwen'
  | 'into_run_-90.gwen'
  | 'passiveattack_to_passiveidle.gwen'
  | 'passive_to_run.gwen'
  | 'passiveidle_to_baseidle.gwen'
  | 'passiveattack_to_passiverun.gwen'
  | 'passiveattack_to_passiverun_90.gwen'
  | 'passiveattack_to_passiverun_-90.gwen'
  | 'passiveattack_to_passiverun_-179.gwen'
  | 'passiveattack_to_passiverun_179.gwen'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'spell2_to_passiveidle.gwen'
  | 'spell2_to_passiverun.gwen'
  | 'Spell1_B'
  | 'Idlein2'
  | 'spell1_c.gwen'
  | 'spell1_b_to_idle.gwen'
  | 'spell1_c-90.gwen'
  | 'spell1_c-179.gwen'
  | 'spell1_c90.gwen'
  | 'spell1_c179.gwen'
  | 'spell1_c_to_idle.gwen'
  | 'spell1_c_to_run.gwen'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'run2.gwen'
  | 'passive_attack1_90.gwen'
  | 'passive_attack1_-90.gwen'
  | 'passive_attack1_-179.gwen'
  | 'passive_attack1_179.gwen'
  | 'Spell4_To_Run'
  | 'spell4b_to_passiveidle.gwen'
  | 'spell4b_to_passiverun.gwen'
  | 'spell4.gwen'
  | 'spell4_to_idle.gwen'
  | 'passive_to_homeguard.gwen'
  | 'spell1_c_to_passiveidle.gwen'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke_Loop'
  | 'joke_start2.gwen'
  | 'joke_to_run.gwen'
  | 'spell4_-90.gwen'
  | 'spell4_90.gwen'
  | 'spell4_180.gwen'
  | 'Run_Slow'
  | 'KnockUp'
  | 'Stunned'
  | 'run3.gwen'
  | 'idle3.gwen'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.Needle} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.SnapJoint1} />
        <primitive object={nodes.SnapJoint2} />
        <primitive object={nodes.Scissors_A} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Doll_Root} />
        <primitive object={nodes.Bloob_Cake_Root} />
        <primitive object={nodes.Bloob_Root} />
      </group>
      <group position={[-48.63, -72.53, -143.06]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Doll}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Needle}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Scissors_A_Smear}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Cake}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
