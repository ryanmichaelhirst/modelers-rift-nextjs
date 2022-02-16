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
    mesh_0_3: THREE.SkinnedMesh
    R_Plane1: THREE.Bone
    L_Plane1: THREE.Bone
    Platform: THREE.Bone
    Root: THREE.Bone
    R_Hand_Snap: THREE.Bone
    L_Hand_Snap: THREE.Bone
    Microphone_Snap: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Plane: THREE.MeshBasicMaterial
    Platform: THREE.MeshBasicMaterial
    UltSpeaker: THREE.MeshBasicMaterial
    RecallBird: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death_Loop'
  | 'seraphin_skin04_idle2.pie_c_11_17'
  | 'Joke_Start'
  | 'Run1'
  | 'Spell1_0'
  | 'Spell2'
  | 'Spell3_90'
  | 'seraphin_spell4.ellipsismage'
  | 'Taunt'
  | 'Joke_Loop'
  | 'seraphin_death.ellipsismage'
  | 'Spell3_0'
  | 'Dance_Loop'
  | 'Run2'
  | 'Run5'
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
  | 'seraphin_spell3_to_run_180.ellipsismage'
  | 'seraphin_spell3_to_run_-180.ellipsismage'
  | 'seraphin_spell3_to_run.ellipsismage'
  | 'Spell1_To_Run'
  | 'Spell1_To_Idle'
  | 'seraphin_spell4_cast90.ellipsismage'
  | 'seraphin_spell4_cast179.ellipsismage'
  | 'seraphin_spell4_cast.ellipsismage'
  | 'seraphin_p_spell1.ellipsismage'
  | 'seraphin_passive_spell2.ellipsismage'
  | 'seraphin_passive_spell3.ellipsismage'
  | 'seraphin_passive_attack1.ellipsismage'
  | 'seraphin_p_spell1_-90.ellipsismage'
  | 'seraphin_p_spell1_90.ellipsismage'
  | 'seraphin_p_spell1_180.ellipsismage'
  | 'seraphin_attack1_to_idle.ellipsismage'
  | 'Attack_to_run'
  | 'seraphin_spell4_cast-90.ellipsismage'
  | 'seraphin_spell4_90.ellipsismage'
  | 'seraphin_spell4_-90.ellipsismage'
  | 'seraphin_spell4_-179.ellipsismage'
  | 'seraphin_spell4_179.ellipsismage'
  | 'Spell4_To_Run0'
  | 'seraphin_spell4_to_run90.ellipsismage'
  | 'seraphin_spell4_to_run-90.ellipsismage'
  | 'seraphin_spell4_to_run-179.ellipsismage'
  | 'seraphin_spell4_to_run179.ellipsismage'
  | 'seraphin_passive_spell3_90.ellipsismage'
  | 'seraphin_passive_spell3_-90.ellipsismage'
  | 'seraphin_passive_spell3_-179.ellipsismage'
  | 'seraphin_passive_spell3_179.ellipsismage'
  | 'Spell2_To_Idle'
  | 'Spell2_To_Run'
  | 'seraphin_passive_attack1_-90.ellipsismage'
  | 'seraphin_passive_attack1_90.ellipsismage'
  | 'seraphin_passive_attack1_-179.ellipsismage'
  | 'seraphin_passive_attack1_179.ellipsismage'
  | 'seraphin_passive_attack1_to_run.ellipsismage'
  | 'seraphin_passive_attack1_to_idle.ellipsismage'
  | 'seraphin_spell4_cast45.ellipsismage'
  | 'seraphin_spell4_cast-179.ellipsismage'
  | 'seraphin_spell4_cast-45.ellipsismage'
  | 'seraphin_spell4_cast135.ellipsismage'
  | 'seraphin_spell4_cast-135.ellipsismage'
  | 'seraphin_spell4_45.ellipsismage'
  | 'seraphin_spell4_-45.ellipsismage'
  | 'seraphin_spell4_135.ellipsismage'
  | 'seraphin_spell4_-135.ellipsismage'
  | 'Run3'
  | 'Recall'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Laugh'
  | 'Run_Homeguard'
  | 'Run4'
  | 'Dance_Start'
  | 'Idle_Var2'
  | 'Run1_Fast'
  | 'seraphin_run2.ellipsismage'
  | 'seraphin_run3.ellipsismage'
  | 'seraphin_run4.ellipsismage'
  | 'seraphin_run5.ellipsismage'
  | 'Run_Slow'
  | 'Run6'
  | 'seraphin_run6.ellipsismage'
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
        <primitive object={nodes.R_Plane1} />
        <primitive object={nodes.L_Plane1} />
        <primitive object={nodes.Platform} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.R_Hand_Snap} />
        <primitive object={nodes.L_Hand_Snap} />
        <primitive object={nodes.Microphone_Snap} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-126.51, -31.84, -83.85]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Plane} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Platform}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.UltSpeaker}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.RecallBird}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
