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
    F_L_Cloth6: THREE.Bone
    F_R_Cloth6: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_ShoulderPad_Soft: THREE.Bone
    L_ShoulderPad_Soft: THREE.Bone
    Head_Ring_Soft: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    L_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    R_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_CSTM_RECTICLE_LOC: THREE.Bone
    F_L_Cloth5: THREE.Bone
    F_R_Cloth5: THREE.Bone
    Weapon: THREE.Bone
    Recall_Recall_Root: THREE.Bone
  }
  materials: {
    Body_Mat: THREE.MeshBasicMaterial
    Weapon_Base: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_To_Idle'
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
        <primitive object={nodes.F_L_Cloth6} />
        <primitive object={nodes.F_R_Cloth6} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_ShoulderPad_Soft} />
        <primitive object={nodes.L_ShoulderPad_Soft} />
        <primitive object={nodes.Head_Ring_Soft} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.L_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_CSTM_RECTICLE_LOC} />
        <primitive object={nodes.F_L_Cloth5} />
        <primitive object={nodes.F_R_Cloth5} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Recall_Recall_Root} />
      </group>
      <group position={[-69.51, -5.97, -105.98]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_Mat} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Weapon_Base}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
