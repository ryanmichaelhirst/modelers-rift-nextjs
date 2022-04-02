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
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Book_Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Fish_Root: THREE.Bone
    Furball: THREE.Bone
    Bread: THREE.Bone
    NoteRoot: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Spiky_Body: THREE.MeshBasicMaterial
    Book_brackets: THREE.MeshBasicMaterial
    Props: THREE.MeshBasicMaterial
    Note_MAT: THREE.MeshBasicMaterial
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
  | 'yuumi_skin11_wings_ambient'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Book_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Fish_Root} />
        <primitive object={nodes.Furball} />
        <primitive object={nodes.Bread} />
        <primitive object={nodes.NoteRoot} />
      </group>
      <group position={[-66.39, -67.65, -149.16]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Spiky_Body}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Book_brackets}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Props}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Note_MAT}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
