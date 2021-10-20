import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    BookPage1: THREE.Bone
    BookPage2: THREE.Bone
    BookPage3: THREE.Bone
    BookPage4: THREE.Bone
    BookPage5: THREE.Bone
    Snap_R_Book: THREE.Bone
    Snap_L_Book: THREE.Bone
    Snap_Book_Page1: THREE.Bone
    Snap_Book_Page2: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Book2World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Loop'
  | 'Death'
  | 'Idle1_Base'
  | 'karthus_laugh'
  | 'Run_Base'
  | 'karthus_spell2'
  | 'Spell4'
  | 'Spell4_Loop'
  | 'Taunt_Base'
  | 'karthus_idle_in'
  | 'Idle_Passive'
  | 'Attack2'
  | 'Spell1_A'
  | 'Spell1_B'
  | 'Spell1_C'
  | 'karthus_run'
  | 'Run_In'
  | 'Recall'
  | 'karthus_passive_spell4'
  | 'karthus_passive_spell1'
  | 'karthus_spell1a'
  | 'Dance_In'
  | 'karthus_spell1_b'
  | 'karthus_spell1_c'
  | 'karthus_joke'
  | 'Run_Haste'
  | 'Spell3'
  | 'Idle2_Base'
  | 'karthus_passive_spell2'
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
        <primitive object={nodes.BookPage1} />
        <primitive object={nodes.BookPage2} />
        <primitive object={nodes.BookPage3} />
        <primitive object={nodes.BookPage4} />
        <primitive object={nodes.BookPage5} />
        <primitive object={nodes.Snap_R_Book} />
        <primitive object={nodes.Snap_L_Book} />
        <primitive object={nodes.Snap_Book_Page1} />
        <primitive object={nodes.Snap_Book_Page2} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Book2World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-90.52, -5.2, -55.53]}
        scale={0.02}
      />
    </group>
  )
}
