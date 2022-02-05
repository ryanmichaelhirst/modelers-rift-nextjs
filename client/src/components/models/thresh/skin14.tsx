import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Cstm_Buffbone_Portal1: THREE.Bone
    Cstm_Buffbone_Portal2: THREE.Bone
    Cstm_Buffbone_Portal3: THREE.Bone
    Cstm_Buffbone_Portal4: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    NeckRings_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_skin14_run_haste'
  | 'thresh_skin14_spell2'
  | 'thresh_skin14_attack1_mid'
  | 'thresh_skin14_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_skin14_idle3'
  | 'thresh_skin14_joke'
  | 'thresh_skin14_laugh'
  | 'thresh_skin14_spell4'
  | 'Taunt_Base'
  | 'thresh_skin14_idle_in1'
  | 'thresh_skin14_idle_in2'
  | 'thresh_skin14_idle4'
  | 'Respawn'
  | 'thresh_skin14_attack1_long'
  | 'Spell3_P0'
  | 'thresh_skin14_spell3'
  | 'thresh_skin14_spell1_pull1'
  | 'thresh_skin14_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_skin14_spell1_pull2'
  | 'thresh_skin14_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_skin14_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_skin14_taunt2'
  | 'Dance_Loop'
  | 'thresh_skin14_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_skin14_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_skin14_attack2_mid'
  | 'thresh_skin14_attack2_short'
  | 'Recall'
  | 'thresh_skin14_lantern_spin'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Cstm_Buffbone_Portal1} />
        <primitive object={nodes.Cstm_Buffbone_Portal2} />
        <primitive object={nodes.Cstm_Buffbone_Portal3} />
        <primitive object={nodes.Cstm_Buffbone_Portal4} />
      </group>
      <group position={[-154.15, -46.83, -139.33]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.lambert1}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.NeckRings_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
