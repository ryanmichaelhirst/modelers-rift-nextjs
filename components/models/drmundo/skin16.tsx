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
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon1_Snap: THREE.Bone
    Weapon1_Ult_Snap: THREE.Bone
    Phone_Ult_Snap: THREE.Bone
    Phone_Snap: THREE.Bone
    Car_Root: THREE.Bone
    Tie4_1: THREE.Bone
    Tie3_1: THREE.Bone
    Tie2_1: THREE.Bone
    Board_Root: THREE.Bone
  }
  materials: {
    BodyNormal: THREE.MeshBasicMaterial
    BodyUlt: THREE.MeshBasicMaterial
    Car: THREE.MeshBasicMaterial
    Tie2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_In'
  | 'Death'
  | 'IdleVariant1'
  | 'Laugh'
  | 'spell2.dr_mundo_vgu'
  | 'Spell4_Run'
  | 'Taunt_Start'
  | 'KnockUp'
  | 'spell2activate.dr_mundo_vgu'
  | 'spell4_out.dr_mundo_vgu'
  | 'drmundo_run_passive.dr_mundo_vgu'
  | 'Idle_In'
  | 'idlein_passive.dr_mundo_vgu'
  | 'drmundo_run_-90.dr_mundo_vgu'
  | 'drmundo_run_90.dr_mundo_vgu'
  | 'Spell3'
  | 'drmundo_runpassive_90.dr_mundo_vgu'
  | 'drmundo_runpassive_-90.dr_mundo_vgu'
  | 'Run_Homeguard'
  | 'drmundo_idle02.dr_mundo_vgu'
  | 'attack_tower.dr_mundo_vgu'
  | 'attack1_toidle.dr_mundo_vgu'
  | 'attack1_0.dr_mundo_vgu'
  | 'attack1_90.dr_mundo_vgu'
  | 'attack1_-90.dr_mundo_vgu'
  | 'attack2_toidle.dr_mundo_vgu'
  | 'attack2_0.dr_mundo_vgu'
  | 'attack2_90.dr_mundo_vgu'
  | 'attack2_-90.dr_mundo_vgu'
  | 'crit_toidle.dr_mundo_vgu'
  | 'Spell4_Idle'
  | 'spell4_out_idle.dr_mundo_vgu'
  | 'spell1_0.dr_mundo_vgu'
  | 'spell1_90.dr_mundo_vgu'
  | 'Stunned'
  | 'spell1_-90.dr_mundo_vgu'
  | 'Spell1'
  | 'Spell1_ToIdle'
  | 'spell1_-180.dr_mundo_vgu'
  | 'spell1_180.dr_mundo_vgu'
  | 'Spell3_ToIdle'
  | 'Spell3_ToRun'
  | 'spell2activateidle.dr_mundo_vgu'
  | 'spell2idle.dr_mundo_vgu'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Joke_Start'
  | 'dance.dr_mundo_vgu'
  | 'drmundo_buffbone_snap.dr_mundo_vgu'
  | 'drmundo_buffbone_ult_snap.dr_mundo_vgu'
  | 'drmundo_idle01.dr_mundo_vgu'
  | 'Run01'
  | 'Run02'
  | 'drmundo_run_passive02.dr_mundo_vgu'
  | 'drmundo_idle03.dr_mundo_vgu'
  | 'Taunt_loop'
  | 'Joke_Loop'
  | 'Run_Homeguard_IN'
  | 'run_homeguard_to_idle.dr_mundo_vgu'
  | 'Run_Homeguard_To_Run'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon1_Snap} />
        <primitive object={nodes.Weapon1_Ult_Snap} />
        <primitive object={nodes.Phone_Ult_Snap} />
        <primitive object={nodes.Phone_Snap} />
        <primitive object={nodes.Car_Root} />
        <primitive object={nodes.Tie4_1} />
        <primitive object={nodes.Tie3_1} />
        <primitive object={nodes.Tie2_1} />
        <primitive object={nodes.Board_Root} />
      </group>
      <group position={[-466.42, -28.02, -86.12]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.BodyNormal}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.BodyUlt}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Car}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Tie2}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
