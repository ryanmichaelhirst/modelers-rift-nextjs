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
    Weapon1: THREE.Bone
    Root: THREE.Bone
    DragonTech_Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Bird_Root: THREE.Bone
  }
  materials: {
    Weapon: THREE.MeshBasicMaterial
    Lillia_Body_Mat: THREE.MeshBasicMaterial
    Head_Bud: THREE.MeshBasicMaterial
    Head_Bloom: THREE.MeshBasicMaterial
    Smear: THREE.MeshBasicMaterial
    Bird: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance_In'
  | 'Death'
  | 'Idle_In1'
  | 'Idle1_Base'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh_In'
  | 'Recall'
  | 'Spell2'
  | 'Spell4'
  | 'Run_In'
  | 'lillia_run2_0.lillia'
  | 'lillia_run2_-90.lillia'
  | 'lillia_run2_90.lillia'
  | 'Idle2_Base'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_R'
  | 'lillia_run_passive.lillia'
  | 'lillia_run_passive_full.lillia'
  | 'Spell1'
  | 'lillia_run_passive_torun.lillia'
  | 'lillia_run2_30.lillia'
  | 'lillia_run2_-30.lillia'
  | 'lillia_run_passive_90.lillia'
  | 'lillia_run_passive_-90.lillia'
  | 'Spell3_0'
  | 'Spell3_ToRun'
  | 'Spell3_ToIdle'
  | 'Spell4_ToIdle'
  | 'lillia_spell2_close.lillia'
  | 'lillia_spell3_close.lillia'
  | 'Spell1_ToRun'
  | 'lillia_attack1.lillia'
  | 'lillia_attack1_run.lillia'
  | 'lillia_attack1_run_90.lillia'
  | 'lillia_attack1_-180.lillia'
  | 'lillia_attack1_180.lillia'
  | 'lillia_attack1_run_-90.lillia'
  | 'lillia_attack1_short.lillia'
  | 'lillia_attack1_short_run.lillia'
  | 'lillia_attack1_short_180.lillia'
  | 'lillia_attack1_short_run_90.lillia'
  | 'lillia_attack1_short_run_-90.lillia'
  | 'lillia_attack1_short_-180.lillia'
  | 'lillia_spell3_close_-90.lillia'
  | 'lillia_spell3_close_90.lillia'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'lillia_run_passive_180.lillia'
  | 'lillia_run_passive_-180.lillia'
  | 'lillia_run_passive_out.lillia'
  | 'Respawn'
  | 'Recall_Winddown'
  | 'Dance_Loop'
  | 'Laugh_Loop'
  | 'Taunt'
  | 'Run_Homeguard'
  | 'Run_Homeguard_IN'
  | 'Idle_In2'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Weapon1} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.DragonTech_Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Bird_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Weapon} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Lillia_Body_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Head_Bud}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Head_Bloom}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_4.geometry} material={materials.Smear} skeleton={nodes.mesh_0_4.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Bird} skeleton={nodes.mesh_0_5.skeleton} />
    </group>
  )
}
