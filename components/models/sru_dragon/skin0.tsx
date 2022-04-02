import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Select_Loc: THREE.Bone
    Buffbone_Cstm_FireEnd: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    MAT_Dragon: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle1_Base'
  | 'Attack1'
  | 'sru_dragon_spawn'
  | 'Spell1'
  | 'Run'
  | 'sru_dragon_idle_aggro1'
  | 'sru_dragon_idle_normal'
  | 'Death'
  | 'Spell2'
  | 'sru_dragon_idle_normal2'
  | 'sru_dragon_idle_alert1'
  | 'sru_dragon_idle_al2ag'
  | 'sru_dragon_idle_ag2al'
  | 'sru_dragon_idle_n2al'
  | 'sru_dragon_idle_al2n'
  | 'sru_dragon_idle_alert2'
  | 'sru_dragon_idle_alert3'
  | 'Landing'
  | 'sru_dragon_idle_aggro4'
  | 'sru_dragon_idle_aggro3'
  | 'sru_dragon_idle_aggro5'
  | 'sru_dragon_idle_aggro6'
  | 'sru_dragon_idle_aggro7'
  | 'sru_dragon_idle_lookat_0'
  | 'sru_dragon_idle_lookat_l45'
  | 'sru_dragon_idle_lookat_r45'
  | 'sru_dragon_idle_ag2n'
  | 'sru_dragon_flying_run'
  | 'sru_dragon_flying_spell1'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Select_Loc} />
        <primitive object={nodes.Buffbone_Cstm_FireEnd} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MAT_Dragon}
        skeleton={nodes.mesh_0.skeleton}
        position={[-256.72, -150.81, -170.49]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
