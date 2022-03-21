import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Face_World_Snap: THREE.Bone
  }
  materials: {
    MasterYi_Skin10_MD_MasterYi_CosmicReaver_MAT1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | '2013_Run_Haste'
  | 'masteryi_2013_attack1'
  | 'masteryi_2013_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'masteryi_2013_crit'
  | 'Dance'
  | 'Death'
  | 'masteryi_2013_idle1'
  | 'masteryi_2013_idle2'
  | 'masteryi_2013_idle_enter'
  | 'masteryi_skin10_joke'
  | 'masteryi_2013_laugh'
  | 'masteryi_2013_passive'
  | 'Recall'
  | 'Run'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Spell1'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'masteryi_2013_spell2'
  | 'Spell3'
  | 'Stun'
  | 'masteryi_2013_taunt'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Face_World_Snap} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MasterYi_Skin10_MD_MasterYi_CosmicReaver_MAT1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-69.04, -1.46, -30.45]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
