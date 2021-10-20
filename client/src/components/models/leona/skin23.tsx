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
    Root: THREE.Bone
    Shield: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Weapon_World: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Book_jnt: THREE.Bone
    Recall_Smear_jnt1: THREE.Bone
    Recall_Facial_jnt: THREE.Bone
    Recall_Stage: THREE.Bone
    Recall_Destroyed_01: THREE.Bone
    Recall_Destroyed_02: THREE.Bone
    Recall_Destroyed_03: THREE.Bone
    Recall_Destroyed_04: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_VFX: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    ShieldEffect: THREE.MeshBasicMaterial
    RecallBook: THREE.MeshBasicMaterial
    Tailing: THREE.MeshBasicMaterial
    Facial: THREE.MeshBasicMaterial
    TargetShield1: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell2_Idle'
  | 'Spell2_Attack'
  | 'Spell2_Run'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Spell2_open'
  | 'leona_skin12_spell2_close'
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
        <primitive object={nodes.Shield} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Book_jnt} />
        <primitive object={nodes.Recall_Smear_jnt1} />
        <primitive object={nodes.Recall_Facial_jnt} />
        <primitive object={nodes.Recall_Stage} />
        <primitive object={nodes.Recall_Destroyed_01} />
        <primitive object={nodes.Recall_Destroyed_02} />
        <primitive object={nodes.Recall_Destroyed_03} />
        <primitive object={nodes.Recall_Destroyed_04} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_VFX} />
      </group>
      <group position={[-178.86, -0.09, -111.92]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.ShieldEffect}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.RecallBook}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Tailing}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Facial}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.TargetShield1}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}
