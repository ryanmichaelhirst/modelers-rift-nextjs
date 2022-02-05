import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Thresh_Skin06_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_skin06_run_haste'
  | 'thresh_skin06_spell2'
  | 'thresh_skin06_attack1_mid'
  | 'thresh_skin06_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_idle3'
  | 'thresh_skin06_joke'
  | 'thresh_skin06_laugh'
  | 'thresh_skin06_spell4'
  | 'Taunt_Base'
  | 'thresh_skin06_idle_in1'
  | 'thresh_skin06_idle_in2'
  | 'thresh_skin06_idle4'
  | 'Respawn'
  | 'thresh_skin06_attack1_long'
  | 'Spell3_P0'
  | 'thresh_skin06_spell3'
  | 'thresh_spell1_pull1'
  | 'thresh_skin06_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_spell1_pull2'
  | 'thresh_skin06_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_skin06_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_skin06_taunt'
  | 'Dance_Loop'
  | 'thresh_skin06_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_skin06_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_skin06_attack2_mid'
  | 'thresh_skin06_attack2_short'
  | 'Recall'
  | 'thresh_skin06_additive_lasso'
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
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Thresh_Skin06_Recall_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-141.56, -41.35, -104.31]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
