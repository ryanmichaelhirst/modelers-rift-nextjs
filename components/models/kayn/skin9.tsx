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
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Root: THREE.Bone
    C_Hair2_Ground: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    SlayerBody: THREE.MeshBasicMaterial
    AssassinBody: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Eye_Cycle'
  | 'Idle1_In'
  | 'Idle1_In2'
  | 'Idle1_In_Assassin'
  | 'Idle1_In_Slayer'
  | 'Idle1_Slayer'
  | 'Idle1_Base'
  | 'Idle2_Assassin'
  | 'Idle2_Base'
  | 'Idle3_Assassin'
  | 'kayn_idle1_assassin'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh'
  | 'Laugh_to_Idle'
  | 'Recall'
  | 'Recall_Leadout'
  | 'recall_leadout_assassin.pie_c_11_19'
  | 'recall_leadout_slayer.pie_c_11_19'
  | 'Run'
  | 'Run_Assassin'
  | 'Run_Slayer'
  | 'Spell1_Circle'
  | 'Spell1_Dash'
  | 'Spell1_Stop'
  | 'Spell1_Exit_To_Run'
  | 'Spell2'
  | 'Spell2_Assassin_Cast'
  | 'Spell2_Slayer'
  | 'Spell2_Slayer_Run'
  | 'Spell2_Slayer_Idle'
  | 'Spell2_Idle'
  | 'Spell2_Into_Run'
  | 'Spell3'
  | 'Spell3_Idle'
  | 'Spell3_Run'
  | 'Spell3_Run_In'
  | 'Spell4_Air'
  | 'Spell4_Hit'
  | 'Taunt_loop'
  | 'Taunt_Start'
  | 'Transform_Assassin'
  | 'Transform_Slayer'
  | 'kayn_spell4_air'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Hair2_Ground} />
        <primitive object={nodes.True_World} />
      </group>
      <group position={[-67.2, -6.02, -151.97]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.SlayerBody}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.AssassinBody}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
