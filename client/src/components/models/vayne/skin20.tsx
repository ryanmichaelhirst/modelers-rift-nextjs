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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    WeaponB_Snap_World: THREE.Bone
    Weapon2World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    TreeSprout_Root: THREE.Bone
    Tree_Root: THREE.Bone
    RecallOne_SpiritWisp_Root: THREE.Bone
    RecallTwo_SpiritWisp_Root: THREE.Bone
    RecallThree_SpiritWisp_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Cstm_Recall_1: THREE.Bone
    Buffbone_Cstm_Recall_2: THREE.Bone
    Buffbone_Cstm_Recall_3: THREE.Bone
  }
  materials: {
    body: THREE.MeshBasicMaterial
    tree: THREE.MeshBasicMaterial
    SpiritWisp: THREE.MeshBasicMaterial
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
  | 'Idle_Ult'
  | 'Idle_TumbleUlt'
  | 'Joke'
  | 'Laugh'
  | 'Run_Ult'
  | 'Spell1'
  | 'Spell3'
  | 'Taunt'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.WeaponB_Snap_World} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.TreeSprout_Root} />
        <primitive object={nodes.Tree_Root} />
        <primitive object={nodes.RecallOne_SpiritWisp_Root} />
        <primitive object={nodes.RecallTwo_SpiritWisp_Root} />
        <primitive object={nodes.RecallThree_SpiritWisp_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Cstm_Recall_1} />
        <primitive object={nodes.Buffbone_Cstm_Recall_2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_3} />
      </group>
      <group position={[-53.96, 0, -171.9]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.tree} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.SpiritWisp}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
