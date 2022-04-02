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
    Ornn_Pillar_Main: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Cstm_Hammer_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Buffbone_Glb_Knee_Loc: THREE.Bone
    R_Buffbone_Glb_Knee_Loc: THREE.Bone
    C_Ring_pop_rider: THREE.Bone
    C_TongHolder_pop_rider: THREE.Bone
    C_HammerHolder_pop_rider: THREE.Bone
    Snap_Anvil2World: THREE.Bone
    Snap_Hammer2World: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Snap_Bucket2World: THREE.Bone
    Poro_Root: THREE.Bone
    Poro_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Skin01_Recall: THREE.MeshBasicMaterial
    Ornn_Skin01_mat: THREE.MeshBasicMaterial
    Ornn_Base_Poro_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'DanceLoop'
  | 'Death'
  | 'Idle1_Base'
  | 'ornn_idle1_look'
  | 'Idle2_Base'
  | 'Idle_In'
  | 'Joke'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Slow'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell1_ToIdle'
  | 'Spell1_ToRun'
  | 'Spell2'
  | 'Spell2_Attack'
  | 'Spell2_Hit_ToIdle'
  | 'Spell2_ToRun'
  | 'Spell3'
  | 'Spell4'
  | 'Spell4_Charge'
  | 'Spell4_Hit'
  | 'Spell4_Hit_ToIdle'
  | 'Spell4_Hit_ToRun'
  | 'Spell4_ToRun'
  | 'Spell4_Windup'
  | 'Taunt'
  | 'Attack3'
  | 'DanceIn'
  | 'Idlein_ToIdle'
  | 'Respawn'
  | 'ornn_spell3_2idle'
  | 'ornn_spell3_2run'
  | 'Spell3_Dash'
  | 'Spell3_Hit'
  | 'Spell3_hit_toIdle'
  | 'Spell4_ToIdle'
  | 'Laugh'
  | 'Forge'
  | 'Forge_ToIdle'
  | 'Forge_ToRun'
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
        <primitive object={nodes.Ornn_Pillar_Main} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Cstm_Hammer_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.R_Buffbone_Glb_Knee_Loc} />
        <primitive object={nodes.C_Ring_pop_rider} />
        <primitive object={nodes.C_TongHolder_pop_rider} />
        <primitive object={nodes.C_HammerHolder_pop_rider} />
        <primitive object={nodes.Snap_Anvil2World} />
        <primitive object={nodes.Snap_Hammer2World} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Bucket2World} />
        <primitive object={nodes.Poro_Root} />
        <primitive object={nodes.Poro_C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-252.28, -14.41, -96.79]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin01_Recall}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Ornn_Skin01_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Ornn_Base_Poro_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
