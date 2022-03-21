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
    Snap_Weapon_Orb: THREE.Bone
    Snap_Weapon: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_plate04: THREE.Bone
    Recall_Cake_Root: THREE.Bone
    Recall_Cake2_Bottom: THREE.Bone
    Recall_plateA01: THREE.Bone
    Recall_Plate1_Dessert02: THREE.Bone
    Recall_C_Buffbone_Glb_A_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_B_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_C_Loc: THREE.Bone
    Recall_C_Buffbone_Glb_D_Loc: THREE.Bone
    Recall_Cup: THREE.Bone
    Recall_PlateB01: THREE.Bone
    Recall_teacup01: THREE.Bone
    Recall_Table_Leg1: THREE.Bone
    Recall_Table_Leg2: THREE.Bone
    Recall_Table_Leg3: THREE.Bone
    Recall_Block_cake: THREE.Bone
    Recall_Plate1_Dessert01: THREE.Bone
    Recall_Plate1_Dessert03: THREE.Bone
    Follower_Root: THREE.Bone
  }
  materials: {
    Ball: THREE.MeshBasicMaterial
    Recall_Cake: THREE.MeshBasicMaterial
    Recall_Cup: THREE.MeshBasicMaterial
    Recall_Skill: THREE.MeshBasicMaterial
    Recall_Table: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke'
  | 'Laugh'
  | 'Dance_Base'
  | 'Run_Base'
  | 'RunIn'
  | 'Idle1_Base'
  | 'Attack3'
  | 'bard_attack02'
  | 'bard_attack01'
  | 'Spell1'
  | 'Taunt'
  | 'Spell3'
  | 'Dance_Loop'
  | 'Death'
  | 'Spell2'
  | 'Idle_In'
  | 'Channel_Transition'
  | 'Idle2_Base'
  | 'Float_Run01'
  | 'bard_run_haste'
  | 'Run_Slow'
  | 'Stun'
  | 'Crit'
  | 'KnockUp'
  | 'Float_Run01_Into'
  | 'Float_Run01_Out'
  | 'Float_Run01_Boost'
  | 'Float_Idle01'
  | 'Float_IdleIn'
  | 'Float_Spell3'
  | 'Float_Spell2'
  | 'TURN'
  | 'Spell4'
  | 'bard_turntech_left'
  | 'bard_turntech_right'
  | 'bard_float_right'
  | 'bard_float_left'
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
        <primitive object={nodes.Snap_Weapon_Orb} />
        <primitive object={nodes.Snap_Weapon} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_plate04} />
        <primitive object={nodes.Recall_Cake_Root} />
        <primitive object={nodes.Recall_Cake2_Bottom} />
        <primitive object={nodes.Recall_plateA01} />
        <primitive object={nodes.Recall_Plate1_Dessert02} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_A_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_B_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_C_Loc} />
        <primitive object={nodes.Recall_C_Buffbone_Glb_D_Loc} />
        <primitive object={nodes.Recall_Cup} />
        <primitive object={nodes.Recall_PlateB01} />
        <primitive object={nodes.Recall_teacup01} />
        <primitive object={nodes.Recall_Table_Leg1} />
        <primitive object={nodes.Recall_Table_Leg2} />
        <primitive object={nodes.Recall_Table_Leg3} />
        <primitive object={nodes.Recall_Block_cake} />
        <primitive object={nodes.Recall_Plate1_Dessert01} />
        <primitive object={nodes.Recall_Plate1_Dessert03} />
        <primitive object={nodes.Follower_Root} />
      </group>
      <group position={[-132.14, -13.97, -59.87]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Ball} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Cake}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Cup}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Skill}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Table}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
