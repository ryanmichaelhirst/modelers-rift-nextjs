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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    SnapWeapon: THREE.Bone
    Buffbone_Healthbar: THREE.Bone
    Lion_Root: THREE.Bone
    Throne: THREE.Bone
    L_Throne: THREE.Bone
    R_Throne: THREE.Bone
    Gem: THREE.Bone
    Piece_1: THREE.Bone
    Piece_2: THREE.Bone
    Piece_3: THREE.Bone
  }
  materials: {
    Darius_Skin15_Mat: THREE.MeshBasicMaterial
    Wolf_Mat: THREE.MeshBasicMaterial
    Throne_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'Joke_Loop'
  | 'Laugh'
  | 'darius_skin15_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Taunt'
  | 'Recall'
  | 'Idle2_Base'
  | 'Spell2_Idle'
  | 'Spell2_Run'
  | 'Attack1'
  | 'Attack2'
  | 'Dance'
  | 'Channel'
  | 'darius_skin15_spell1_in'
  | 'BasePose'
  | 'Spell3_ToRun'
  | 'Spell3_ToIdle'
  | 'Spell1_ToIdle'
  | 'Spell2_ActivateIdle'
  | 'Spell2_ActivateRun'
  | 'darius_skin15_spell1_in_run'
  | 'Spell4'
  | 'Spell2_IdleIn'
  | 'Spell4_ToRun'
  | 'Idle_In'
  | 'Run_Homeguard'
  | 'Run_Fast'
  | 'Run_Homeguard_IdleIn'
  | 'TurnL'
  | 'TurnR'
  | 'Turn0'
  | 'Run_Homeguard_RunIn'
  | 'Respawn'
  | 'Dance_In'
  | 'darius_skin15_joke_intro'
  | 'Recall_Winddown'
  | 'Crit_ToIdle'
  | 'Attack2_ToIdle'
  | 'Attack1_ToIdle'
  | 'Spell2_IdleIn2'
  | 'Spell2_Deactivate'
  | 'darius_skin15_spell2_deactivate'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.SnapWeapon} />
        <primitive object={nodes.Buffbone_Healthbar} />
        <primitive object={nodes.Lion_Root} />
        <primitive object={nodes.Throne} />
        <primitive object={nodes.L_Throne} />
        <primitive object={nodes.R_Throne} />
        <primitive object={nodes.Gem} />
        <primitive object={nodes.Piece_1} />
        <primitive object={nodes.Piece_2} />
        <primitive object={nodes.Piece_3} />
      </group>
      <group position={[-140.43, -124.33, -261.24]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Darius_Skin15_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Wolf_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Throne_mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
