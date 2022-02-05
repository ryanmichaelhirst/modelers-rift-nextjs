import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Root_Lower: THREE.Bone
    Sword_World: THREE.Bone
    Sheath_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Cstm_Trail_3: THREE.Bone
    Buffbone_Cstm_Trail_2: THREE.Bone
    Buffbone_Cstm_Trail_1: THREE.Bone
    Fire_Root: THREE.Bone
    Fire_Root_2: THREE.Bone
    Fire_Root_3: THREE.Bone
    Fire_Root_4: THREE.Bone
    TestJoint: THREE.Bone
  }
  materials: {
    Big_Sword: THREE.MeshBasicMaterial
    Big_Spikes: THREE.MeshBasicMaterial
    FireBro: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_First'
  | 'Channel'
  | 'Channel_Wndup'
  | 'yasuo_skin09_dance_enter'
  | 'yasuo_skin09_dance_loop'
  | 'Death'
  | 'yasuo_skin09_idle1'
  | 'yasuo_skin09_idle2'
  | 'yasuo_skin09_idle3'
  | 'yasuo_skin09_idle_in'
  | 'Idle_Run_Trans'
  | 'yasuo_idle_in_sheathed'
  | 'Joke'
  | 'Laugh'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'yasuo_skin09_sheath_run1'
  | 'yasuo_skin09_run1'
  | 'Run2'
  | 'yasuo_skin09_run_haste'
  | 'Run_Fast_In'
  | 'Run_Fast_IN_Sheathed'
  | 'Run_Fast_Loop'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_Idle_Trans'
  | 'Sheath_Run'
  | 'Spell1A'
  | 'Spell1B'
  | 'yasuo_skin09_spell1c'
  | 'yasuo_skin09_spell1crun'
  | 'Spell1_Dash'
  | 'Spell1_Wind'
  | 'Spell2_-180'
  | 'Spell2_-90'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_90'
  | 'yasuo_skin09_spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Spell4_Trans'
  | 'Taunt'
  | 'Idle_Out'
  | 'Run_Haste_Out'
  | 'Run_Out_Loop'
  | 'yasuo_skin09_run1_out'
  | 'Sheath_Run_Haste'
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
        <primitive object={nodes.Root_Upper} />
        <primitive object={nodes.Root_Lower} />
        <primitive object={nodes.Sword_World} />
        <primitive object={nodes.Sheath_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Trail_3} />
        <primitive object={nodes.Buffbone_Cstm_Trail_2} />
        <primitive object={nodes.Buffbone_Cstm_Trail_1} />
        <primitive object={nodes.Fire_Root} />
        <primitive object={nodes.Fire_Root_2} />
        <primitive object={nodes.Fire_Root_3} />
        <primitive object={nodes.Fire_Root_4} />
        <primitive object={nodes.TestJoint} />
      </group>
      <group position={[-61.35, -1.39, -277.17]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Big_Sword}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Big_Spikes}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.FireBro}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
