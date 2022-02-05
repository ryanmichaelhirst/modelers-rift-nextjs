import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Root: THREE.Bone
  }
  materials: {
    Baron_LunarRevel_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'sru_baron_spawn'
  | 'Idle1_Base'
  | 'Attack2'
  | 'sru_baron_lunarrevel_spell2'
  | 'Idle2_Base'
  | 'sru_baron_idle1_aggro'
  | 'Death'
  | 'sru_baron_idle1_aggrob'
  | 'Spell3_Base'
  | 'sru_baron_idle1_a2n'
  | 'sru_baron_idle1_n2a'
  | 'sru_baron_lunarrevel_spell2_channel'
  | 'sru_baron_lunarrevel_spell2_windup'
  | 'Spell3_Channel'
  | 'sru_baron_lunarrevel_spell3_windup'
  | 'Spell5'
  | 'Spell5_Channel'
  | 'sru_baron_spell5_windup'
  | 'sru_baron_attack1_melee'
  | 'sru_baron_attack1_melee_far_left'
  | 'sru_baron_attack1_melee_left'
  | 'sru_baron_attack1_melee_right'
  | 'sru_baron_attack1_melee_far_right'
  | 'sru_baron_lunarrevel_attack1'
  | 'sru_baron_lunarrevel_attack1_far_left'
  | 'sru_baron_lunarrevel_attack1_far_right'
  | 'sru_baron_lunarrevel_attack1_right'
  | 'sru_baron_lunarrevel_attack1_left'
  | 'Spell6_Windup'
  | 'Spell6'
  | 'sru_baron_idle1_aggroc'
  | 'sru_baron_idle1_aggrod'
  | 'sru_baron_idle1_aggroe'
  | 'sru_baron_idle1_aggrof'
  | 'sru_baron_idle1_aggrog'
  | 'sru_baron_lunarrevel_attack1b'
  | 'sru_baron_idle1_aggroh'
  | 'sru_baron_attack1'
  | 'sru_baron_hidden'
  | 'sru_baron_idle1_aggro_l45'
  | 'sru_baron_idle1_aggro_r45'
  | 'sru_baron_idle1_aggro_0'
  | 'sru_baron_lunarrevel_spell2_fl'
  | 'Spell2_FL_Channel'
  | 'sru_baron_lunarrevel_spell3_fl_windup'
  | 'sru_baron_lunarrevel_spell2_fr'
  | 'Spell2_FR_Channel'
  | 'sru_baron_lunarrevel_spell2_fr_windup'
  | 'sru_baron_lunarrevel_spell2_l'
  | 'Spell2_L_Channel'
  | 'sru_baron_lunarrevel_spell2_l_windup'
  | 'sru_baron_lunarrevel_spell2_r'
  | 'Spell2_R_Channel'
  | 'sru_baron_lunarrevel_spell2_r_windup'
  | 'Spell3_L'
  | 'Spell3_L_Channel'
  | 'sru_baron_lunarrevel_spell3_l_windup'
  | 'Spell3_R'
  | 'Spell3_R_Channel'
  | 'sru_baron_lunarrevel_spell3_r_windup'
  | 'sru_baron_spawnout'
  | 'Spell3_FL'
  | 'Spell3_FL_Channel'
  | 'Spell3_FR'
  | 'Spell3_FR_Channel'
  | 'sru_baron_lunarrevel_spell3_fr_windup'
  | 'sru_baron_spell2'
  | 'sru_baron_spell2_windup'
  | 'sru_baron_spell3_windup'
  | 'sru_baron_spell3'
  | 'sru_baron_spell3_channel'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Root} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Baron_LunarRevel_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-318.67, -199.75, -242.91]}
        scale={0.07}
      />
    </group>
  )
}, areEqual)

export default Model
