import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    FK_R_Shoulder: THREE.Bone
    World_Ball: THREE.Bone
  }
  materials: {
    Darius_TX1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spell2'
  | 'darius_skin04_recall'
  | 'darius_skin04_run'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'Attack1'
  | 'Attack2'
  | 'darius_skin04_spell4_a'
  | 'darius_skin04_spell4_b'
  | 'darius_skin04_spell4_c'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Base'
  | 'Death'
  | 'darius_skin04_joke'
  | 'darius_skin04_laugh'
  | 'Spell1'
  | 'Spell2_Idle'
  | 'Spell2_Run'
  | 'Spell3'
  | 'Taunt_Base'
  | 'Dance_In'
  | 'darius_skin04_idle3'
  | 'Run_In2'
  | 'Idle_In1'
  | 'Idle_In2'
  | 'Idle_In3'
  | 'Run_In3'
  | 'darius_skin04_idle4'
  | 'darius_skin04_respawn'
  | 'darius_skin04_run2'
  | 'darius_skin04_runb'
  | 'darius_skin04_recall_leadout'
  | 'Recall2_Leadout'
  | 'darius_skin04_spell1_in'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.FK_R_Shoulder} />
        <primitive object={nodes.World_Ball} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Darius_TX1} skeleton={nodes.mesh_0.skeleton} />
    </group>
  )
}
