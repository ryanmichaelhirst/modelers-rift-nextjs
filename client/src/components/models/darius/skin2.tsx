import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
  }
  materials: {
    darius_zaun_knight_MD_v01_lambert2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'darius_channelwindup'
  | 'Crit'
  | 'Death'
  | 'darius_idle1'
  | 'darius_joke'
  | 'darius_laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'darius_recall'
  | 'Idle2'
  | 'Spell2_Idle'
  | 'darius_spell2_run'
  | 'Attack1'
  | 'Attack2'
  | 'Dance_Base'
  | 'Channel_Base'
  | 'darius_zaunknight'
  | 'darius_zaunknight_tubefull'
  | 'darius_zaunknight_tubedrained'
  | 'TubeDraining'
  | 'darius_zaunknight_spell2_run'
  | 'darius_zaunknight_idle1'
  | 'darius_zaunknight_dance'
  | 'darius_zaunknight_laugh'
  | 'darius_zaunknight_joke'
  | 'darius_zaunknight_recall'
  | 'darius_zaunknight_channel'
  | 'darius_zaunknight_channelwindup'
  | 'darius_spell1_in'
  | 'darius_zaunknight_run'
  | 'Run_Base'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.darius_zaun_knight_MD_v01_lambert2}
        skeleton={nodes.mesh_0.skeleton}
        position={[-85.24, -89.31, -92.76]}
        scale={0.02}
      />
    </group>
  )
}
