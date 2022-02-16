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
    C_Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
  }
  materials: {
    Glasses: THREE.MeshBasicMaterial
    Glasses_2: THREE.MeshBasicMaterial
    Eye: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'pet_squid_idle.littlelegends_darkstar'
  | 'Taunt_loop'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Joke'
  | 'Interact'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'pet_squid_damage.littlelegends_darkstar'
  | 'Death'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'pet_squid_idle2.littlelegends_darkstar'
  | 'Celebrate_to_Idle'
  | 'Idle_To_Run'
  | 'pet_squid_idle_to_runfast.littlelegends_darkstar'
  | 'pet_squid_taunt_intro.littlelegends_darkstar'
  | 'pet_squid_idle3.littlelegends_darkstar'
  | 'pet_squid_dance_loop.littlelegends_darkstar'
  | 'pet_squid_joke.littlelegends_darkstar'
  | 'kdaevelynn_dance_intro.littlelegends_10_23'
  | 'Laugh_Loop'
  | 'Dance'
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
        <primitive object={nodes.C_Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
      </group>
      <group position={[-61.07, -3.4, -67.38]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Glasses} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Glasses_2}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Eye} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Body} skeleton={nodes.mesh_0_3.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
