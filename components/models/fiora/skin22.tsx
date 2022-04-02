import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    Buffbone_Cstm_Recall_Sword1: THREE.Bone
    Buffbone_Cstm_Recall_Sword2: THREE.Bone
    Buffbone_Cstm_Recall_Sword3: THREE.Bone
    Buffbone_Cstm_Recall_Sword4: THREE.Bone
    Buffbone_Cstm_Recall_Sword5: THREE.Bone
    Buffbone_Cstm_Recall_Sword6: THREE.Bone
    Buffbone_Cstm_Recall_Sword7: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Cape_Root_grnd: THREE.Bone
    Buffbone_Cstm_HealthBar: THREE.Bone
    R_Sleeve_Root_grnd: THREE.Bone
    L_Sleeve_Root_grnd: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Sword_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'IdleIn'
  | 'Joke'
  | 'Laugh'
  | 'fiora_skin22_idle3'
  | 'fiora_skin22_idle1'
  | 'Recall'
  | 'fiora_skin22_run'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Spell1'
  | 'Spell1_Attack'
  | 'Spell2'
  | 'Spell2_In'
  | 'Taunt'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword1} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword3} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword4} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword5} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword6} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword7} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Cape_Root_grnd} />
        <primitive object={nodes.Buffbone_Cstm_HealthBar} />
        <primitive object={nodes.R_Sleeve_Root_grnd} />
        <primitive object={nodes.L_Sleeve_Root_grnd} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Sword_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-51.41, -0.09, -63.71]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
