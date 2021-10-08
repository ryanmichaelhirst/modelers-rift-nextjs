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
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    Root: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    Buffbone_Cstm_Recall_Sword1: THREE.Bone
    Buffbone_Cstm_Recall_Sword2: THREE.Bone
    Buffbone_Cstm_Recall_Sword3: THREE.Bone
    Buffbone_Cstm_Recall_Sword4: THREE.Bone
    Buffbone_Cstm_Recall_Sword5: THREE.Bone
    Buffbone_Cstm_Recall_Sword6: THREE.Bone
    Buffbone_Cstm_Recall_Sword7: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Leg_Socket: THREE.Bone
    R_Leg_Socket: THREE.Bone
    L_Sleeve_Root_grnd: THREE.Bone
    R_Sleeve_Root_grnd: THREE.Bone
    Cape_Root_grnd: THREE.Bone
    Buffbone_Cstm_HealthBar: THREE.Bone
    RecallSkirtPelvis: THREE.Bone
  }
  materials: {
    Weapon_MAT: THREE.MeshBasicMaterial
    Fiora_Skin23_MAT: THREE.MeshBasicMaterial
    Skin23_Cape_MAT: THREE.MeshBasicMaterial
    Skirt_MAT: THREE.MeshBasicMaterial
    SkirtTop_MAT: THREE.MeshBasicMaterial
    SkirtFront_MAT: THREE.MeshBasicMaterial
    SkirtBottom_MAT: THREE.MeshBasicMaterial
    Recall_Weapon_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'fiora_skin23_idle1'
  | 'fiora_skin23_idle3'
  | 'Laugh'
  | 'RunFast'
  | 'Spell1'
  | 'Taunt'
  | 'Dance'
  | 'Joke'
  | 'Spell2_In'
  | 'Spell2'
  | 'Spell1_Attack'
  | 'IdleIn'
  | 'Spell1_To_Run'
  | 'Recall'
  | 'RunWalk'
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
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword1} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword2} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword3} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword4} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword5} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword6} />
        <primitive object={nodes.Buffbone_Cstm_Recall_Sword7} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Leg_Socket} />
        <primitive object={nodes.R_Leg_Socket} />
        <primitive object={nodes.L_Sleeve_Root_grnd} />
        <primitive object={nodes.R_Sleeve_Root_grnd} />
        <primitive object={nodes.Cape_Root_grnd} />
        <primitive object={nodes.Buffbone_Cstm_HealthBar} />
        <primitive object={nodes.RecallSkirtPelvis} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Weapon_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Fiora_Skin23_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Skin23_Cape_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Skirt_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.SkirtTop_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.SkirtFront_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.SkirtBottom_MAT}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Recall_Weapon_MAT}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
