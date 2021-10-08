import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
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
    Gun_Root: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Hat_Loc: THREE.Bone
    Saucer: THREE.Bone
    Teacup: THREE.Bone
  }
  materials: {
    R_Sub: THREE.MeshBasicMaterial
    Q_Sub: THREE.MeshBasicMaterial
    Lvl6_Sub: THREE.MeshBasicMaterial
    Caitlyn_Body_MAT: THREE.MeshBasicMaterial
    HeadCount: THREE.MeshBasicMaterial
    Lvl1_Sub: THREE.MeshBasicMaterial
    Base_Gun: THREE.MeshBasicMaterial
    Teacup_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'caitlyn_skin11_attack1'
  | 'caitlyn_skin11_attack2'
  | 'caitlyn_skin11_attack3'
  | 'caitlyn_skin11_attackfast1'
  | 'caitlyn_skin11_attackfast2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'caitlyn_skin11_attackfastcrit'
  | 'caitlyn_skin11_attack4'
  | 'caitlyn_skin11_danceintro'
  | 'caitlyn_skin11_danceloop'
  | 'Death_Base'
  | 'caitlyn_skin11_death'
  | 'Gun_1to6'
  | 'Gun_Active'
  | 'Gun_Active_IN'
  | 'Gun_Overload'
  | 'Gun_Overload_In'
  | 'caitlyn_skin11_gun_active_from_overload'
  | 'caitlyn_skin11_gun_rest_from_overload'
  | 'Gun_QtoActive'
  | 'Gun_Rest'
  | 'Gun_Rest_IN'
  | 'Idle1'
  | 'Idle2'
  | 'caitlyn_skin11_idle3'
  | 'IdleIn'
  | 'IdleIn_Alert'
  | 'caitlyn_skin11_joke'
  | 'Laugh'
  | 'caitlyn_skin11_idle'
  | 'caitlyn_skin11_recall'
  | 'caitlyn_skin11_recall_winddown'
  | 'caitlyn_skin11_run'
  | 'Run_Fast'
  | 'caitlyn_skin11_homeguard'
  | 'caitlyn_skin11_homeguard_in'
  | 'caitlyn_skin11_homeguard_out'
  | 'caitlyn_skin11_spell1'
  | 'Spell2'
  | 'Spell2_Out'
  | 'Spell3'
  | 'Spell3B'
  | 'caitlyn_skin11_spell3_fallback_out'
  | 'Spell4_Base'
  | 'caitlyn_skin11_spell4'
  | 'Taunt_Base'
  | 'caitlyn_skin11_taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Gun_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Hat_Loc} />
        <primitive object={nodes.Saucer} />
        <primitive object={nodes.Teacup} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.R_Sub} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Q_Sub} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Lvl6_Sub}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Caitlyn_Body_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.HeadCount}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Lvl1_Sub}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Base_Gun}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Teacup_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
