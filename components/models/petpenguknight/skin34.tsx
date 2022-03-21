import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Prop_Root: THREE.Bone
    Sword_World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Eye: THREE.MeshBasicMaterial
    Hair: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Joke'
  | 'pengu_idle1.littlelegends_11_9'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_Intro'
  | 'Idle_To_Run'
  | 'Death'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'Interact'
  | 'Cast_Cycle'
  | 'Cast_Animation'
  | 'pengu_damage.littlelegends_11_9'
  | 'pengu_idle2.littlelegends_11_9'
  | 'Idle_To_runHaste'
  | 'pengu_idle3.littlelegends_11_9'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'pengu_joke.littlelegends_11_9'
  | 'pengu_taunt.littlelegends_11_9'
  | 'Laugh'
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
        <primitive object={nodes.Prop_Root} />
        <primitive object={nodes.Sword_World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.True_World} />
      </group>
      <group position={[-54.17, -0.44, -40.41]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Eye} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Hair} skeleton={nodes.mesh_0_1.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
