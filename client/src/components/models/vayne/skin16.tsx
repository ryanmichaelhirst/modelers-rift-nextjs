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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    Helmet_Snap_World: THREE.Bone
    WeaponB_Snap_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    cr_01_Root: THREE.Bone
    cr_02_Root: THREE.Bone
    cr_03_Root: THREE.Bone
    cr_04_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Recall_1: THREE.Bone
    Buffbone_Cstm_Recall_2: THREE.Bone
    Buffbone_Cstm_Recall_3: THREE.Bone
    Weapon2World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    FatCat01: THREE.MeshBasicMaterial
    Cat02: THREE.MeshBasicMaterial
    Cat03: THREE.MeshBasicMaterial
    Cat04: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack_Tumble'
  | 'Attack_Ult'
  | 'Attack_TumbleUlt'
  | 'Channel'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'tumble_idle1.pie_c_10_9'
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Run_Tumble'
  | 'Run_Ult'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.Helmet_Snap_World} />
        <primitive object={nodes.WeaponB_Snap_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.cr_01_Root} />
        <primitive object={nodes.cr_02_Root} />
        <primitive object={nodes.cr_03_Root} />
        <primitive object={nodes.cr_04_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Recall_1} />
        <primitive object={nodes.Buffbone_Cstm_Recall_2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_3} />
        <primitive object={nodes.Weapon2World} />
      </group>
      <group position={[-54.08, -1.68, -64.9]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.FatCat01}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Cat02} skeleton={nodes.mesh_0_2.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Cat03} skeleton={nodes.mesh_0_3.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Cat04} skeleton={nodes.mesh_0_4.skeleton} />
      </group>
    </group>
  )
}, areEqual)

export default Model
