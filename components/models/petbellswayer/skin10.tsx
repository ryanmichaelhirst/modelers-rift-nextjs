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
    Root: THREE.Bone
    Minion2_Root: THREE.Bone
    DragonTech_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Minion1_Root: THREE.Bone
    Minion3_Root: THREE.Bone
  }
  materials: {
    EyeDefault: THREE.MeshBasicMaterial
    Body_MAT: THREE.MeshBasicMaterial
    Minion1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'bellswayer_idle1.littlelegends_10_10'
  | 'Taunt'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'bellswayer_jokea.littlelegends_10_10'
  | 'Interact'
  | 'Recall'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'bellswayer_damaged.littlelegends_10_10'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'bellswayer_idle2.littlelegends_10_10'
  | 'bellswayer_idle3.littlelegends_10_10'
  | 'Celebrate_to_Idle'
  | 'bellswayer_greeting_to_idle.littlelegends_10_10'
  | 'bellswayer_taunt.littlelegends_10_10'
  | 'bellswayer_jokeb.littlelegends_10_10'
  | 'bellswayer_jokec.littlelegends_10_10'
  | 'bellswayer_cast_to_idle.littlelegends_10_10'
  | 'Idle_To_runHaste'
  | 'bellswayer_dive_out_to_idle.littlelegends_10_10'
  | 'bellswayer_danceintro.littlelegends_10_10'
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
        <primitive object={nodes.Minion2_Root} />
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Minion1_Root} />
        <primitive object={nodes.Minion3_Root} />
      </group>
      <group position={[-49.49, 0, -72.08]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Minion1}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
