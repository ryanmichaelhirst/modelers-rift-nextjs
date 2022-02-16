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
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_BuffBone_Cstm_Healthbar: THREE.Bone
    Root_Ride: THREE.Bone
    Root_Recall: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    HelmetVisor: THREE.MeshBasicMaterial
    Bristle: THREE.MeshBasicMaterial
    CityRed: THREE.MeshBasicMaterial
    CityTeal: THREE.MeshBasicMaterial
    ScreenLargeRed: THREE.MeshBasicMaterial
    ScreenSmallRedA: THREE.MeshBasicMaterial
    ScreenSmallRedB: THREE.MeshBasicMaterial
    ScreenLargeTeal: THREE.MeshBasicMaterial
    ScreenSmallTealA: THREE.MeshBasicMaterial
    ScreenSmallTealB: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Crit'
  | 'sejuani_idle1'
  | 'idle1.pie_c_11_11'
  | 'Run3'
  | 'Spell3'
  | 'Channel_Wndup'
  | 'sejuani_bear_spell1'
  | 'Run2'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1'
  | 'Spell4'
  | 'Spell1_Hit'
  | 'Recall'
  | 'Channel'
  | 'Channel_Windup'
  | 'sejuani_skin08_taunt'
  | 'laugh.pie_c_11_11'
  | 'joke.pie_c_11_11'
  | 'Death'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Idle1'
  | 'sejuani_skin08_joke'
  | 'idle_enter.pie_c_11_11'
  | 'sejuani_2013_flail_loop'
  | 'Flail_Out'
  | 'sejuani_2013_flail_blank'
  | 'sejuani_2013_flail_in'
  | 'sejuani_2013_flail_loop2'
  | 'Run_Base'
  | 'Spell2_A_-180'
  | 'Spell2_A_-90'
  | 'Spell2_A_0'
  | 'Spell2_A_180'
  | 'Spell2_A_90'
  | 'Spell2_B_-180'
  | 'Spell2_B_-90'
  | 'Spell2_B_0'
  | 'Spell2_B_180'
  | 'Spell2_B_90'
  | 'Recall_Winddown'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_BuffBone_Cstm_Healthbar} />
        <primitive object={nodes.Root_Ride} />
        <primitive object={nodes.Root_Recall} />
      </group>
      <group position={[-81.02, -22.3, -106.31]} scale={0.04}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.HelmetVisor}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Bristle}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.CityRed}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.CityTeal}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.ScreenLargeRed}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.ScreenSmallRedA}
          skeleton={nodes.mesh_0_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_7.geometry}
          material={materials.ScreenSmallRedB}
          skeleton={nodes.mesh_0_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_8.geometry}
          material={materials.ScreenLargeTeal}
          skeleton={nodes.mesh_0_8.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_9.geometry}
          material={materials.ScreenSmallTealA}
          skeleton={nodes.mesh_0_9.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_10.geometry}
          material={materials.ScreenSmallTealB}
          skeleton={nodes.mesh_0_10.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
