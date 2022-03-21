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
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Pizza_Weight: THREE.Bone
    Recall_Macaroon_1: THREE.Bone
    Recall_Macaroon_2: THREE.Bone
    Recall_Macaroon_3: THREE.Bone
    Recall_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Cake: THREE.MeshBasicMaterial
    Bear: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Dance'
  | 'Idle1_Base'
  | 'sivir_idle1'
  | 'Run'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'sivir_idlein_run'
  | 'sivir_idlein_run2.pie_c_11_23'
  | 'Spell1_Catch'
  | 'sivir_respawn.pie_c_11_23'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Taunt_Base'
  | 'sivir_laugh.pie_c_11_23'
  | 'sivir_joke.pie_c_11_23'
  | 'sivir_idlein_attack'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Idle2_Base'
  | 'Spell1'
  | 'sivir_taunt.pie_c_11_23'
  | 'Recall'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Pizza_Weight} />
        <primitive object={nodes.Recall_Macaroon_1} />
        <primitive object={nodes.Recall_Macaroon_2} />
        <primitive object={nodes.Recall_Macaroon_3} />
        <primitive object={nodes.Recall_Root} />
      </group>
      <group position={[-84.89, 0.17, -81.46]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Cake} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Bear} skeleton={nodes.mesh_0_2.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
