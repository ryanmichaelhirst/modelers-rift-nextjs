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
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    R_Weapon_World: THREE.Bone
    L_Weapon_World: THREE.Bone
    Chair_Root: THREE.Bone
    Sun_Reflector_Root: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    draven_chair_mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'draven_idle2'
  | 'draven_idle3'
  | 'draven_idle4'
  | 'Joke'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'draven_spell1_spin_left_right'
  | 'draven_idle5'
  | 'draven_beam_windup'
  | 'draven_beam_channel'
  | 'draven_run_arms_out'
  | 'Spell1_Rwpn_Off'
  | 'draven_idle1_botharms'
  | 'Idle1_BothArms'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Left'
  | 'Spell2'
  | 'draven_spell1_arm_catches'
  | 'draven_run'
  | 'Idle1'
  | 'Beam_Winddown'
  | 'draven_idle1'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.R_Weapon_World} />
        <primitive object={nodes.L_Weapon_World} />
        <primitive object={nodes.Chair_Root} />
        <primitive object={nodes.Sun_Reflector_Root} />
      </group>
      <group position={[-158.69, -1.13, -81.87]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.draven_chair_mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
