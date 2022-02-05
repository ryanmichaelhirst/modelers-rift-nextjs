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
    Platform: THREE.Bone
    R_Hand_Snap: THREE.Bone
    L_Hand_Snap: THREE.Bone
    Microphone_Snap: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Main_Frill: THREE.Bone
    Main_Skirt: THREE.Bone
    Phone: THREE.Bone
    Headphones: THREE.Bone
    Table: THREE.Bone
    Guitar: THREE.Bone
    Bed_Root: THREE.Bone
    Flower: THREE.Bone
  }
  materials: {
    Body_Mat: THREE.MeshBasicMaterial
    Stage_Mat: THREE.MeshBasicMaterial
    Speakers_Mat: THREE.MeshBasicMaterial
    Phone_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death_In'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Run1'
  | 'Spell1_0'
  | 'Spell2_0'
  | 'Spell3_90'
  | 'spell4_start.ellipsismage'
  | 'Taunt'
  | 'Death_Loop'
  | 'Recall_Winddown'
  | 'Spell3_0'
  | 'Dance_In'
  | 'Run2'
  | 'Idle_In'
  | 'Run_In'
  | 'Spell1_90'
  | 'Spell1_-90'
  | 'Spell1_180'
  | 'Spell1_-180'
  | 'Spell3_-90'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_To_Idle'
  | 'Spell3_to_Run_90'
  | 'Spell3_to_Run_-90'
  | 'spell3_to_run_180.ellipsismage'
  | 'spell3_to_run_-180.ellipsismage'
  | 'spell3_to_run.ellipsismage'
  | 'Spell1_To_Run'
  | 'Spell1_To_Idle'
  | 'spell4_cast90.ellipsismage'
  | 'spell4_cast179.ellipsismage'
  | 'spell4_cast.ellipsismage'
  | 'spell1_passive_0.ellipsismage'
  | 'spell2_passive.ellipsismage'
  | 'passive_spell3.ellipsismage'
  | 'passive_attack_0.ellipsismage'
  | 'spell1_passive_-90.ellipsismage'
  | 'spell1_passive_90.ellipsismage'
  | 'spell1_passive_180.ellipsismage'
  | 'spell1_to_idle.ellipsismage'
  | 'Attack_to_run'
  | 'spell4_cast-90.ellipsismage'
  | 'spell4_90.ellipsismage'
  | 'spell4_-90.ellipsismage'
  | 'spell4_-179.ellipsismage'
  | 'spell4_179.ellipsismage'
  | 'Spell4_To_Run0'
  | 'spell4_to_run90.ellipsismage'
  | 'spell4_to_run-90.ellipsismage'
  | 'spell4_to_run-179.ellipsismage'
  | 'spell4_to_run179.ellipsismage'
  | 'passive_spell3_90.ellipsismage'
  | 'passive_spell3_-90.ellipsismage'
  | 'passive_spell3_-179.ellipsismage'
  | 'passive_spell3_179.ellipsismage'
  | 'passive_spell3_to_run.ellipsismage'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'passive_attack_-90.ellipsismage'
  | 'passive_attack_90.ellipsismage'
  | 'passive_attack_180.ellipsismage'
  | 'spell1_to_run.ellipsismage'
  | 'Spell2_-90'
  | 'Spell2_90'
  | 'spell2_-179.ellipsismage'
  | 'spell2_179.ellipsismage'
  | 'spell2_passive_90.ellipsismage'
  | 'spell2_passive_-90.ellipsismage'
  | 'spell2_passive_-179.ellipsismage'
  | 'spell2_passive_179.ellipsismage'
  | 'spell4_cast45.ellipsismage'
  | 'spell4_cast-179.ellipsismage'
  | 'spell4_cast-45.ellipsismage'
  | 'spell4_cast135.ellipsismage'
  | 'spell4_cast-135.ellipsismage'
  | 'spell4_45.ellipsismage'
  | 'spell4_-45.ellipsismage'
  | 'spell4_135.ellipsismage'
  | 'spell4_-135.ellipsismage'
  | 'Run3'
  | 'Recall'
  | 'Dance_Loop'
  | 'Run_Homeguard'
  | 'spell2_passive_to_idle.ellipsismage'
  | 'spell2_passive_to_run.ellipsismage'
  | 'Run1_Fast'
  | 'joke.ellipsismage'
  | 'joke_2.ellipsismage'
  | 'joke_3.ellipsismage'
  | 'joke_4.ellipsismage'
  | 'joke_to_idle.ellipsismage'
  | 'run_homeguard_to_idle.ellipsismage'
  | 'Run_Homeguard_IN'
  | 'Respawn'
  | 'Run_Homeguard_To_Run'
  | 'Idle2'
  | 'Idle3'
  | 'speakerpulse.ellipsismage'
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
        <primitive object={nodes.Platform} />
        <primitive object={nodes.R_Hand_Snap} />
        <primitive object={nodes.L_Hand_Snap} />
        <primitive object={nodes.Microphone_Snap} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Main_Frill} />
        <primitive object={nodes.Main_Skirt} />
        <primitive object={nodes.Phone} />
        <primitive object={nodes.Headphones} />
        <primitive object={nodes.Table} />
        <primitive object={nodes.Guitar} />
        <primitive object={nodes.Bed_Root} />
        <primitive object={nodes.Flower} />
      </group>
      <group position={[-113.11, -40.5, -116.66]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Stage_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Speakers_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Phone_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
