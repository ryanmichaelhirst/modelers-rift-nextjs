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
    Snap_Sword2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_Apple: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Grass_Root: THREE.Bone
    Sqr_Root: THREE.Bone
    Recall_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    IvernApple_Mat: THREE.MeshBasicMaterial
    Ivern_Wall_Of_Grass_Mat: THREE.MeshBasicMaterial
    IvernSquirrel_mat: THREE.MeshBasicMaterial
    Recall_Ground: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Idle1_Base'
  | 'Run_Base'
  | 'Spell4'
  | 'Taunt'
  | 'ivern_ranged_attack01'
  | 'Attack3'
  | 'Attack1'
  | 'Attack2'
  | 'Run_Fast'
  | 'Laugh'
  | 'Dance_Loop'
  | 'Run_Slow'
  | 'Joke'
  | 'Idle_In'
  | 'Death'
  | 'Recall'
  | 'Run_Haste'
  | 'Spell1'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'ivern_passive_channel'
  | 'Passive_Channel2'
  | 'Passive_Harvest'
  | 'Spell3_Run_Fwd'
  | 'Spell3_Run_Lft'
  | 'Spell3_Run_Rgt'
  | 'Spell3_Run_Bk_Rgt'
  | 'Spell3_Run_Bk_Lft'
  | 'Spell1_Dash_Hit'
  | 'Spell3_Idle_Bk_Lft'
  | 'Spell3_Idle_Bk_Rgt'
  | 'Spell3_Idle_Lft'
  | 'Spell3_Idle_Rgt'
  | 'Spell3_Idle_Fwd'
  | 'Spell2'
  | 'Attack4'
  | 'ivern_ranged_attack02'
  | 'Spell1_Dash_In'
  | 'Spell1_Dash_Loop'
  | 'Spell3_Run_Self'
  | 'Spell3_Idle_Self'
  | 'Spell1_ToIdle'
  | 'Spell1_ToRun'
  | 'Spell2_ToIdle'
  | 'Spell2_ToRun'
  | 'Spell1_Dash_Hit_ToRun'
  | 'Passive_Channel_toIdle'
  | 'Passive_Channel2_ToIdle'
  | 'Passive_Harvest_toIdle'
  | 'Idle2_Base'
  | 'ivern_idle1_a'
  | 'Dance_Base'
  | 'Idle_ToRun'
  | 'Spell1_Dash_ToIdle'
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
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_Apple} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Grass_Root} />
        <primitive object={nodes.Sqr_Root} />
        <primitive object={nodes.Recall_World} />
      </group>
      <group position={[-233.61, -3.42, -173.54]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.IvernApple_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Ivern_Wall_Of_Grass_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.IvernSquirrel_mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Ground}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
