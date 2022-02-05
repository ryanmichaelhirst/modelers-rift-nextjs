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
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    True_World: THREE.Bone
    Energy_Ball: THREE.Bone
    Book_Root: THREE.Bone
    Furball: THREE.Bone
    Bread: THREE.Bone
    Fish_Root: THREE.Bone
    Recall01_Pumpkin1: THREE.Bone
    Recall01_Pumpkin2: THREE.Bone
    Recall01_Root: THREE.Bone
    Recall02_Pumpkin1: THREE.Bone
    Recall02_Pumpkin2: THREE.Bone
    Recall02_Root: THREE.Bone
    Recall03_Pumpkin1: THREE.Bone
    Recall03_Pumpkin2: THREE.Bone
    Recall03_Root: THREE.Bone
  }
  materials: {
    Spiky_Body: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Fire: THREE.MeshBasicMaterial
    Book_Cover: THREE.MeshBasicMaterial
    Porps: THREE.MeshBasicMaterial
    Fish: THREE.MeshBasicMaterial
    Recall_Pumpkin: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel_Loop'
  | 'Channel_In'
  | 'Crit'
  | 'Death'
  | 'Idle02'
  | 'Idle02_Var01'
  | 'yuumi_joke_01'
  | 'Joke_In'
  | 'Laugh_In'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Slow'
  | 'Spell4'
  | 'yuumi_spell3_attached_small'
  | 'Spell2_Attach_In'
  | 'Taunt_In'
  | 'Dance_Loop'
  | 'Dance_Start'
  | 'yuumi_spell2_detach'
  | 'Spell2_Attach_Loop'
  | 'Spell2_Attach_Out'
  | 'Idle01'
  | 'Run01'
  | 'Run01_Var01'
  | 'Idle01_Var01'
  | 'Spell3_Detached'
  | 'Idle01_Var02'
  | 'Spell2_Detach_In'
  | 'Spell2_Detach_Loop'
  | 'Spell2_Detach_Out'
  | 'yuumi_spell1_in'
  | 'Spawn'
  | 'Run_Homeguard_IN'
  | 'Run_Homeguard_OUT'
  | 'Idle02_Var02'
  | 'Spell1_0'
  | 'Spell1_Out'
  | 'Run01_ToIdle01'
  | 'Idle01_ToRun01'
  | 'HealthBar_Attached'
  | 'HealthBar_Detached'
  | 'Spell4_In'
  | 'Spell4_Loop01'
  | 'Spell4_Out'
  | 'Spell1_L'
  | 'Spell1_R'
  | 'Idle01_Var03'
  | 'Idle01_Var04'
  | 'Spell1_Attached_Out'
  | 'Idle02_Var03'
  | 'Run01_Reaction01'
  | 'Run01_Var02'
  | 'Joke_Out'
  | 'FALL'
  | 'Spell1_Detached'
  | 'yuumi_spell3_attached_big'
  | 'Spell3_Out'
  | 'Spell4_Loop02'
  | 'Spell4_Loop03'
  | 'Spell1_In_0'
  | 'Spell1_In_L'
  | 'Spell1_In_R'
  | 'Spell4_Attached_Out'
  | 'Idle01_Var05'
  | 'Run01_Var03'
  | 'Taunt_Out'
  | 'yuumi_taunt01_attached_out'
  | 'Joke_Attached_Out'
  | 'Laugh_Out'
  | 'yuumi_laugh01_attached_out'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.Energy_Ball} />
        <primitive object={nodes.Book_Root} />
        <primitive object={nodes.Furball} />
        <primitive object={nodes.Bread} />
        <primitive object={nodes.Fish_Root} />
        <primitive object={nodes.Recall01_Pumpkin1} />
        <primitive object={nodes.Recall01_Pumpkin2} />
        <primitive object={nodes.Recall01_Root} />
        <primitive object={nodes.Recall02_Pumpkin1} />
        <primitive object={nodes.Recall02_Pumpkin2} />
        <primitive object={nodes.Recall02_Root} />
        <primitive object={nodes.Recall03_Pumpkin1} />
        <primitive object={nodes.Recall03_Pumpkin2} />
        <primitive object={nodes.Recall03_Root} />
      </group>
      <group position={[-84.05, -59.79, -157.23]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Spiky_Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Fire}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Book_Cover}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Porps}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Fish}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Recall_Pumpkin}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
