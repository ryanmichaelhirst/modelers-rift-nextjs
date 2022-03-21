import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Recall_Root: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Healthbar_Loc: THREE.Bone
  }
  materials: {
    Recall_Face: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death_Body'
  | 'Idle1'
  | 'Idle2'
  | 'syndra_skin06_idle3'
  | 'syndra_skin06_idle4'
  | 'syndra_skin06_joke'
  | 'syndra_skin06_laugh'
  | 'syndra_skin06_recall'
  | 'Run'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'syndra_skin06_taunt'
  | 'Orbs'
  | 'syndra_skin06_death'
  | 'Dance'
  | 'syndra_skin06_homeguard'
  | 'syndra_skin06_homeguard_variant'
  | 'Attack1'
  | 'Attack2'
  | 'Recall_Windup'
  | 'Spell1'
  | 'Spell2_Pull'
  | 'Spell3_Start'
  | 'Spell4_Start'
  | 'Spell2_Throw'
  | 'Recall_Winddown'
  | 'Spell3_Cast'
  | 'Spell4_Cast'
  | 'Respawn'
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
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Healthbar_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Recall_Face}
        skeleton={nodes.mesh_0.skeleton}
        position={[-108.17, -0.31, -71.57]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
