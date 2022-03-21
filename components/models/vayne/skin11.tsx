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
    Vehicle_Main: THREE.Bone
    Buffbone_Cstm_Vehicle: THREE.Bone
    Root: THREE.Bone
    C_Cape_Base_Grnd: THREE.Bone
    L_Cape1_Grnd: THREE.Bone
    R_Cape1_Grnd: THREE.Bone
    Drone: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Hair1_Grnd: THREE.Bone
    L_Knee_Scale: THREE.Bone
    R_Knee_Scale: THREE.Bone
    L_Foot_Scale: THREE.Bone
    R_Foot_Scale: THREE.Bone
    L_Toe_Scale: THREE.Bone
    R_Toe_Scale: THREE.Bone
    Crossbow_Handle: THREE.Bone
    Remote: THREE.Bone
  }
  materials: {
    Vehicle: THREE.MeshBasicMaterial
    Cape: THREE.MeshBasicMaterial
    Remote: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack_Ult'
  | 'Attack_TumbleUlt'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1'
  | 'vayne_skin11_idle_tumble1'
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Run_Base'
  | 'Run_Tumble'
  | 'Run_Ult'
  | 'vayne_skin11_run_tumble_ult'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Recall'
  | 'Attack3'
  | 'Dance_Intro'
  | 'Idle_Homeguard'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Spell3toIdle'
  | 'Spell3toRun'
  | 'vayne_skin11_trans_runult2idleult'
  | 'vayne_skin11_trans_tmblult2tmblidle'
  | 'Trans_Hg2hgidle'
  | 'vayne_skin11_trans_tmbl2tmblidle'
  | 'vayne_skin11_run2'
  | 'vayne_skin11_winddown2idlehg'
  | 'vayne_skin11_attack1_tumble'
  | 'Joke'
  | 'Laugh'
  | 'Idle2'
  | 'Idle3'
  | 'vayne_skin11_trans_run2idle'
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
        <primitive object={nodes.Vehicle_Main} />
        <primitive object={nodes.Buffbone_Cstm_Vehicle} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Cape_Base_Grnd} />
        <primitive object={nodes.L_Cape1_Grnd} />
        <primitive object={nodes.R_Cape1_Grnd} />
        <primitive object={nodes.Drone} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Hair1_Grnd} />
        <primitive object={nodes.L_Knee_Scale} />
        <primitive object={nodes.R_Knee_Scale} />
        <primitive object={nodes.L_Foot_Scale} />
        <primitive object={nodes.R_Foot_Scale} />
        <primitive object={nodes.L_Toe_Scale} />
        <primitive object={nodes.R_Toe_Scale} />
        <primitive object={nodes.Crossbow_Handle} />
        <primitive object={nodes.Remote} />
      </group>
      <group position={[-130.74, -1.23, -157.08]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Vehicle} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Cape} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Remote}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
