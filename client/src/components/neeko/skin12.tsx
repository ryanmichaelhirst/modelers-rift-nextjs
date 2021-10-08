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
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Butterfly_Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_Scroll01: THREE.Bone
    Recall_Root: THREE.Bone
    Recall_Rabbit_World: THREE.Bone
    Recall_Bird_World: THREE.Bone
    Recall_Fish_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Transparent: THREE.MeshBasicMaterial
    Sun: THREE.MeshBasicMaterial
    Cloud: THREE.MeshBasicMaterial
    Butterfly: THREE.MeshBasicMaterial
    Recall_Scroll: THREE.MeshBasicMaterial
    Recall_Flat_Bird: THREE.MeshBasicMaterial
    Recall_Flat_Fish: THREE.MeshBasicMaterial
    Recall_Flat_Rabbit: THREE.MeshBasicMaterial
    Recall_Rabbit: THREE.MeshBasicMaterial
    Recall_Bird: THREE.MeshBasicMaterial
    Recall_Fish: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2_Run'
  | 'Spell4'
  | 'Idlein_Animal'
  | 'Idle1_Base'
  | 'Run_Variation'
  | 'Passive_Attack'
  | 'Spell1_ToIdle'
  | 'neeko_idlein_toidle1'
  | 'Spell3_ToIdle'
  | 'Spell4_ToIdle'
  | 'Spell4_ToRun'
  | 'JG_Run_0'
  | 'JG_Run_90'
  | 'JG_Run_-90'
  | 'neeko_jg_run_0'
  | 'Spell2_ToRun'
  | 'neeko_jg_run_180'
  | 'neeko_jg_run_-180'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Laugh'
  | 'Taunt'
  | 'Idle2_Base'
  | 'neeko_idle3'
  | 'Recall'
  | 'Run_Slow'
  | 'Spell3_0'
  | 'Spell3_90'
  | 'Spell3_180'
  | 'Spell3_-90'
  | 'Spell3_-180'
  | 'Spell1_ToRun'
  | 'Run_Haste'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Butterfly_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_Scroll01} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall_Rabbit_World} />
        <primitive object={nodes.Recall_Bird_World} />
        <primitive object={nodes.Recall_Fish_World} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Transparent}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Sun} skeleton={nodes.mesh_0_2.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_3.geometry} material={materials.Cloud} skeleton={nodes.mesh_0_3.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Butterfly}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Recall_Scroll}
        skeleton={nodes.mesh_0_5.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.Recall_Flat_Bird}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.Recall_Flat_Fish}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.Recall_Flat_Rabbit}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_9.geometry}
        material={materials.Recall_Rabbit}
        skeleton={nodes.mesh_0_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Recall_Bird}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Recall_Fish}
        skeleton={nodes.mesh_0_11.skeleton}
      />
    </group>
  )
}
