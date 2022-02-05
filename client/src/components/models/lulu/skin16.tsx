import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon_Snap_To_World: THREE.Bone
    C_Buffbone_Cstm_Hair_Loc: THREE.Bone
  }
  materials: {
    Lulu_Skin14_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'lulu_idle2'
  | 'Channel'
  | 'Run_Haste'
  | 'Run'
  | 'lulu_spell3'
  | 'Attack1'
  | 'lulu_idle1'
  | 'Attack2'
  | 'Run3'
  | 'lulu_idle0'
  | 'lulu_idle4'
  | 'Crit'
  | 'Channel_Wndup'
  | 'Spell1'
  | 'Spell3'
  | 'Spell2'
  | 'Laugh'
  | 'Spell4'
  | 'lulu_idle3'
  | 'Taunt'
  | 'Death'
  | 'Joke'
  | 'Dance'
  | 'Recall'
  | 'Run_Fast'
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
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon_Snap_To_World} />
        <primitive object={nodes.C_Buffbone_Cstm_Hair_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Lulu_Skin14_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-83.38, -0.8, -121.56]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
