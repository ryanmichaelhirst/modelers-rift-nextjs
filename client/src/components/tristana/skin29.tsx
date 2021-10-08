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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Devil_Root: THREE.Bone
    Devil_Weapon: THREE.Bone
    Angel_Root: THREE.Bone
    Angel_Weapon: THREE.Bone
  }
  materials: {
    Tristana_Skin24_Mat: THREE.MeshBasicMaterial
    Tristana_Skin24_Hair_Mat: THREE.MeshBasicMaterial
    lambert1: THREE.MeshBasicMaterial
    Tristana_Skin24_Recall_DevilFace_Mat: THREE.MeshBasicMaterial
    Tristana_Skin24_Recall_DevilBody_Mat: THREE.MeshBasicMaterial
    Tristana_Skin24_Recall_DevilDefaultFace_Mat: THREE.MeshBasicMaterial
    Tristana_Skin24_Recall_AngelBody_Mat: THREE.MeshBasicMaterial
    Tristana_Skin24_Recall_AngelFace_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tristana_idle01'
  | 'Idle2_Base'
  | 'Run'
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Death_Base'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2_LNG'
  | 'Spell3'
  | 'Taunt'
  | 'Crit'
  | 'tristana_dance_in'
  | 'tristana_dance_loop'
  | 'Idle_In'
  | 'Run_Fast'
  | 'Run_Haste'
  | 'Spell2_Mid'
  | 'Spell2_Shrt'
  | 'Channel_Wndup'
  | 'Stunned'
  | 'tristana_knockedup'
  | 'KnockedUp_In'
  | 'Run90'
  | 'Run-90'
  | 'Spell4'
  | 'tristana_attack1'
  | 'Run_Slow'
  | 'Run_Slow_IN_TRAN'
  | 'Run_Slow_OUT_TRAN'
  | 'Recall'
  | 'Respawn'
  | 'Spell2_In'
  | 'Recall_Winddown'
  | 'Joke'
  | 'Hair_Addative'
  | 'Death_Empty'
  | 'Death_GA_Respawn'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Devil_Root} />
        <primitive object={nodes.Devil_Weapon} />
        <primitive object={nodes.Angel_Root} />
        <primitive object={nodes.Angel_Weapon} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Tristana_Skin24_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Tristana_Skin24_Hair_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.lambert1}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Tristana_Skin24_Recall_DevilFace_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Tristana_Skin24_Recall_DevilBody_Mat}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Tristana_Skin24_Recall_DevilDefaultFace_Mat}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Tristana_Skin24_Recall_AngelBody_Mat}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Tristana_Skin24_Recall_AngelFace_Mat}
        skeleton={nodes.mesh_0_7.skeleton}
      />
    </group>
  )
}
