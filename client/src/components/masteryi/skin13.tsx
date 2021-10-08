import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_SwordFX1: THREE.Bone
    Buffbone_Cstm_SwordFX2: THREE.Bone
    Buffbone_Cstm_SwordFX3: THREE.Bone
    Buffbone_Cstm_SwordFX4: THREE.Bone
    Buffbone_Cstm_SwordFX5: THREE.Bone
    Buffbone_Cstm_SwordFX6: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Facemask: THREE.Bone
    R_Robe_Base_grnd: THREE.Bone
    L_Robe_Base_grnd: THREE.Bone
    Buffbone_Cstm_HealthBar: THREE.Bone
  }
  materials: {
    MasterYi_Immortal_Heroes_MAT: THREE.MeshBasicMaterial
    Sword_Hilt: THREE.MeshBasicMaterial
    Mask: THREE.MeshBasicMaterial
    Sword_Blade: THREE.MeshBasicMaterial
    Tassels: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | '2013_Run_Haste'
  | 'masteryi_skin11_attack1'
  | 'masteryi_skin11_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'masteryi_skin11_crit'
  | 'Dance'
  | 'Death'
  | 'masteryi_skin11_idle1'
  | 'masteryi_skin11_idle2'
  | 'IdleIn'
  | 'masteryi_skin11_joke'
  | 'masteryi_skin11_laugh'
  | 'masteryi_skin11_passive'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Run_Homeguard'
  | 'Run_HomeguardIn'
  | 'Run_HomeguardOut'
  | 'Run_Ult'
  | 'Spell1'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'masteryi_skin11_spell2'
  | 'Spell3'
  | 'Stun'
  | 'masteryi_skin11_taunt'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX1} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX2} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX3} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX4} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX5} />
        <primitive object={nodes.Buffbone_Cstm_SwordFX6} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Facemask} />
        <primitive object={nodes.R_Robe_Base_grnd} />
        <primitive object={nodes.L_Robe_Base_grnd} />
        <primitive object={nodes.Buffbone_Cstm_HealthBar} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.MasterYi_Immortal_Heroes_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Sword_Hilt}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Mask}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Sword_Blade}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Tassels}
        skeleton={nodes.mesh_0_4.skeleton}
      />
    </group>
  )
}
