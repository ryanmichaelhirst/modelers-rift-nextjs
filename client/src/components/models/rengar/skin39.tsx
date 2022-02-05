import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Smook01: THREE.Bone
    Smook02: THREE.Bone
    Smook03: THREE.Bone
    Snap_Weapon: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Laugh'
  | 'Run'
  | 'Run2'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4'
  | 'Spell4_Loop'
  | 'Spell4_Winddown'
  | 'Spell5'
  | 'Spell6'
  | 'Taunt'
  | 'rengar_recall'
  | 'rengar_recall_idle'
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Joke'
  | 'Run1_Fast'
  | 'Attack4'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rengar_skin02_hood_on'
  | 'rengar_spell1_tra'
  | 'Spell1_Run2_TRA'
  | 'Spell1_Run_TRA'
  | 'Spell2_Idle'
  | 'Spell2_Run'
  | 'Spell4_Idle'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Smook01} />
        <primitive object={nodes.Smook02} />
        <primitive object={nodes.Smook03} />
        <primitive object={nodes.Snap_Weapon} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-119.12, -0.58, -209.4]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
