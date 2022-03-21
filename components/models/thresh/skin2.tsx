import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
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
    Skin02_Platform: THREE.Bone
  }
  materials: {
    Thresh_Skin02_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_run_haste'
  | 'thresh_spell2'
  | 'thresh_attack1_mid'
  | 'thresh_attack1_short'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_idle3'
  | 'thresh_joke'
  | 'thresh_laugh'
  | 'thresh_spell4'
  | 'Taunt_Base'
  | 'thresh_idle_in1'
  | 'thresh_idle_in2'
  | 'thresh_idle4'
  | 'Respawn'
  | 'thresh_attack1_long'
  | 'Spell3_P0'
  | 'thresh_spell3'
  | 'thresh_spell1_pull1'
  | 'thresh_spell1_in'
  | 'Spell1_Grab'
  | 'thresh_spell1_pull2'
  | 'thresh_spell1_out'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_run_fast'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'thresh_taunt2'
  | 'Dance_Loop'
  | 'thresh_spell3_p-90'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_spell3_p-180'
  | 'Lantern_Null'
  | 'thresh_attack2_mid'
  | 'thresh_attack2_short'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Skin02_Platform} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Thresh_Skin02_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-142.22, -50, -123.88]}
        scale={0.03}
      />
    </group>
  )
}, areEqual)

export default Model
