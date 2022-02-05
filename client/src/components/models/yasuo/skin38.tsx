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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root_Upper: THREE.Bone
    Root_Lower: THREE.Bone
    Sword_World: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Tree_Root: THREE.Bone
    Flower_Root: THREE.Bone
  }
  materials: {
    Sheath: THREE.MeshBasicMaterial
    Waterbottle: THREE.MeshBasicMaterial
    Yasuo_Instrument_Mat: THREE.MeshBasicMaterial
    Tree: THREE.MeshBasicMaterial
    Flower: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'idle_in.pie_c_10_15'
  | 'idle1.pie_c_10_15'
  | 'Attack2'
  | 'sheath_run.pie_c_10_15'
  | 'run1.pie_c_10_15'
  | 'Attack3'
  | 'Attack4'
  | 'Attack_First'
  | 'Spell1_Dash'
  | 'Spell3'
  | 'Run2'
  | 'spell2.pie_c_10_15'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Death'
  | 'run_haste.pie_c_10_15'
  | 'Spell4'
  | 'Spell1A'
  | 'Spell1B'
  | 'Spell1C'
  | 'Spell1_Wind'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'Run_Fast_In'
  | 'Joke'
  | 'Taunt'
  | 'Laugh'
  | 'Spell2_0'
  | 'Run_Fast_Loop'
  | 'idle_in_sheathed.pie_c_10_15'
  | 'Run_Fast_IN_Sheathed'
  | 'Recall'
  | 'idle2.pie_c_10_15'
  | 'dance_loop.pie_c_10_15'
  | 'dance_in.pie_c_10_15'
  | 'Run_Haste'
  | 'Sheath_Run'
  | 'Idle_Out'
  | 'Run_Haste_Out'
  | 'Sheath_Run_Haste'
  | 'run_out.pie_c_10_15'
  | 'Run_Out_Loop'
  | 'Attack1'
  | 'Run_Homeguard'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Tree_Root} />
        <primitive object={nodes.Flower_Root} />
      </group>
      <group position={[-146.3, -3.6, -174.61]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Sheath}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Waterbottle}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Yasuo_Instrument_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Tree}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Flower}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
