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
    Root: THREE.Bone
    C_Buffbone_Spawn_Loc: THREE.Bone
    Cliff: THREE.Bone
    DragonTech_Root: THREE.Bone
    True_World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    EyeDefault: THREE.MeshBasicMaterial
    WingsRoot: THREE.MeshBasicMaterial
    Wings: THREE.MeshBasicMaterial
    Cliff: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'idle.littlelegends_10_23'
  | 'tauntintro.littlelegends_10_23'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Laugh_Loop'
  | 'Laugh_In'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'damaged.littlelegends_10_23'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'Idle_To_Run'
  | 'idle2.littlelegends_10_23'
  | 'idle3.littlelegends_10_23'
  | 'Taunt_loop'
  | 'idle_to_runfast.littlelegends_10_23'
  | 'jokea.littlelegends_10_23'
  | 'jokeb.littlelegends_10_23'
  | 'jokec.littlelegends_10_23'
  | 'Celebrate_to_Idle'
  | 'cast_to_idle.littlelegends_10_23'
  | 'greeting_to_idle.littlelegends_10_23'
  | 'diveout_to_idle.littlelegends_10_23'
  | 'Dance_Loop'
  | 'Dance_In'
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
        <primitive object={nodes.C_Buffbone_Spawn_Loc} />
        <primitive object={nodes.Cliff} />
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-182.6, -38.89, -110.07]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.EyeDefault}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.WingsRoot}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Wings} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Cliff} skeleton={nodes.mesh_0_3.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
