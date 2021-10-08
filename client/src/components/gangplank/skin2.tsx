import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Orange1: THREE.Bone
    Orange2: THREE.Bone
    Orange3: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Crate: THREE.Bone
  }
  materials: {
    Gangplank_Skin02_MAT: THREE.MeshBasicMaterial
    Crate_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Run_Base'
  | 'gangplank_spell1'
  | 'gangplank_spell2'
  | 'Spell3_Upper'
  | 'gangplank_spell4'
  | 'Taunt'
  | 'IdleIn'
  | 'Crit2'
  | 'Passive_Attack'
  | 'Channel_In'
  | 'Recall'
  | 'RunIn'
  | 'RunIN2'
  | 'gangplank_spell1_alt1'
  | 'Spell1_Alt2'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'gangplank_spell3'
  | 'Recall_Winddown'
  | 'Spell2_Idle_TRA'
  | 'Run_Haste'
  | 'Respawn'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Orange1} />
        <primitive object={nodes.Orange2} />
        <primitive object={nodes.Orange3} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Crate} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Gangplank_Skin02_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Crate_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
