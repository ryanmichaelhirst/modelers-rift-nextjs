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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Weapon_Snap: THREE.Bone
    Flower_Root: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Arm_Socket: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    true_World: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    sword_MAT: THREE.MeshBasicMaterial
    flower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack1_Ult'
  | 'Attack2'
  | 'Attack2_Ult'
  | 'Attack3'
  | 'riven_skin20_attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit_Ult'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle1_Ult'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Spell1A'
  | 'riven_skin23_spell1a.pie_c_10_16'
  | 'Spell1B'
  | 'riven_skin23_spell1b.pie_c_10_16'
  | 'Spell1C'
  | 'riven_skin23_spell1c.pie_c_10_16'
  | 'Spell2'
  | 'riven_skin20_spell2'
  | 'Spell3'
  | 'Spell3_ULT'
  | 'Spell4A'
  | 'Spell4B'
  | 'Taunt'
  | 'Joke'
  | 'Run'
  | 'Run_Ult'
  | 'Recall'
  | 'Idle2_Ult'
  | 'Idle3_Ult'
  | 'riven_skin20_idle1_ult'
  | 'Dance_Ult'
  | 'Joke_Ult'
  | 'Laugh_ult'
  | 'Taunt_Ult'
  | 'Channel_Ult'
  | 'riven_skin20_channel_windup_ult'
  | 'riven_skin23_run_ult_toidle.pie_c_10_16'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Weapon_Snap} />
        <primitive object={nodes.Flower_Root} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.true_World} />
      </group>
      <group position={[-43.8, -11.27, -19.36]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_MAT} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.sword_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.flower}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
