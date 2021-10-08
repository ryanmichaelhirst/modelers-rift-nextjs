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
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Pilot_Recall: THREE.Bone
  }
  materials: {
    Rumble_Robot_Mat: THREE.MeshBasicMaterial
    base_drill: THREE.MeshBasicMaterial
    overheat_drill: THREE.MeshBasicMaterial
    Rumble_Mat: THREE.MeshBasicMaterial
    Rumble_Cape: THREE.MeshBasicMaterial
    Rumble_Shield: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'rumble_skin03_attack1'
  | 'rumble_skin03_attack2'
  | 'rumble_skin03_attack3'
  | 'Channel_Wndup'
  | 'Crit'
  | 'rumble_skin03_joke'
  | 'Run_Base'
  | 'Spell2'
  | 'Spell3Base'
  | 'Spell4'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'rumble_skin03_idle3'
  | 'rumble_skin03_idle4'
  | 'rumble_skin03_run_homeguard'
  | 'Idle_In1'
  | 'Run_In'
  | 'Idle_In2'
  | 'rumble_skin03_idle5'
  | 'Idle_Ready_in'
  | 'Idle_Ready_loop'
  | 'Idle_Ready_out'
  | 'Attack3B'
  | 'Spell1'
  | 'Recall'
  | 'rumble_skin03_laugh'
  | 'Channel_Inloop'
  | 'Channel_Loop'
  | 'Taunt_Base'
  | 'Death'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'rumble_skin03_attack1alt'
  | 'Spell2ALT'
  | 'rumble_skin03_spell3alt'
  | 'Spell4ALT'
  | 'Overheat_In'
  | 'rumble_skin03_spell3recast'
  | 'rumble_skin03_spell3altrecast'
  | 'rumble_skin03_attack2alt'
  | 'rumble_skin03_attack3alt'
  | 'rumble_skin03_attack4alt'
  | 'rumble_skin03_idle1'
  | 'Overheat_Loop'
  | 'Overheat_Out'
  | 'rumble_skin03_respawn1'
  | 'Spell3Rocket'
  | 'Spell3RecastRocket'
  | 'rumble_skin03_spell3rocket'
  | 'rumble_skin03_spell3recastrocket'
  | 'Run_Haste_In'
  | 'Run2'
  | 'rumble_skin03_recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Pilot_Recall} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Rumble_Robot_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.base_drill}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.overheat_drill}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Rumble_Mat}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Rumble_Cape}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Rumble_Shield}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
